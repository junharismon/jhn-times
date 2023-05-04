const { News, Tag, sequelize, Category, User } = require('../models')
const Redis = require("ioredis");

const redis = new Redis({
    port: 13733, // Redis port
    host: process.env.HOST_REDIS, // Redis host
    username: process.env.USERNAME, // needs Redis >= 6
    password: process.env.PASSWORD_REDIS,
});

class ControllerNews {
    static async fetchNews(req, res, next) {
        try {
            const cache = await redis.get("app:news")
            if (cache) {
                const result = JSON.parse(cache)
                res.status(200).json(result)
            } else {
                const news = await News.findAll({
                    include: [Category, Tag]
                })
                await redis.set("app:news", JSON.stringify(news))
                res.status(200).json(news)
            }
        } catch (error) {
            next(error)
        }
    }
    static async fetchNewsSlug(req, res, next) {
        try {
            const { slug } = req.params
            const news = await News.findOne({ where: { slug } })
            const findNews = await News.findByPk(news.id, {
                include: [Category, Tag]
            })
            res.status(200).json(findNews)
        } catch (error) {
            next(error)
        }
    }

    static async createNews(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { title, content, imgUrl, CategoryId, tags, UserId } = req.body
            const news = await News.create({ title, content, imgUrl, CategoryId, UserId }, { transaction: t })
            let tag
            if (typeof tags == 'string') {
                tag = await Tag.create({
                    NewsId: news.id,
                    name: tags
                }, { transaction: t }
                )
            } else {
                tag = await Tag.bulkCreate(
                    tags.map((el) => {
                        return {
                            NewsId: news.id,
                            name: el
                        }
                    }), { transaction: t }
                )
            }

            await t.commit();
            const newRes = await News.findOne({
                where: {
                    id: news.id
                }
            })

            await redis.del("app:news", (err, result) => {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("s", result === 1);
                }
            });

            res.status(201).json(newRes)
        } catch (error) {
            await t.rollback();
            console.log(error);
        }
    }

    static async deleteNews(req, res, next) {
        try {
            const { id } = req.params
            const findNews = await News.findByPk(id)
            if (!findNews) {
                throw { name: "DataNotFound" }
            }
            const NewsId = await Tag.findOne({ where: { NewsId: findNews.id } })
            await Tag.destroy({ where: { id: NewsId.id } })
            await News.destroy({ where: { id: findNews.id } })
            await redis.del("app:news", (err, result) => {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("s", result === 1);
                }
            });
            res.status(201).json({ message: "Success delete news" })
        } catch (error) {
            next(error)
        }
    }

    static async updateNews(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { title, content, imgUrl, CategoryId, tags, UserId } = req.body
            const { id } = req.params
            const findNews = await News.findByPk(id)
            if (!findNews) {
                throw { name: "DataNotFound" }
            }
            const news = await News.update({ title, content, imgUrl, CategoryId }, {
                where: {
                    id, UserId
                }
            }, { transaction: t })

            if (typeof tags == 'string') {
                await Tag.update({
                    name: tags
                }, { where: { NewsId: findNews.id } }, { transaction: t }
                )
            } else {
                await Tag.update(
                    tags.map((el) => {
                        return {
                            name: el
                        }
                    }), { where: { NewsId: findNews.id } }, { transaction: t }
                )
            }

            await t.commit();

            await redis.del("app:news", (err, result) => {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("s", result === 1);
                }
            });
            res.status(201).json({ message: "update data success" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerNews