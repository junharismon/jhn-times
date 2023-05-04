const { Category, News } = require('../models')

class ControllerCategory {
    static async fetchCategory(req, res, next) {
        try {
            const category = await Category.findAll({
                include: [News]
            })
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const { name } = req.body
            const category = await Category.create({ name })
            res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params
            const findCategory = await Category.findByPk(id)
            if (!findCategory) {
                throw { name: "DataNotFound" }
            }
            await Category.destroy({
                where: {
                    id
                }
            })
            res.status(201).json({
                message: "Success deleted category"
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { name } = req.body
            const { id } = req.params
            const findCategory = await Category.findByPk(id)
            if (!findCategory) {
                throw { name: "DataNotFound" }
            }
            await Category.update({ name }, {
                where: {
                    id
                }
            })
            res.status(201).json({ message: "Update category success" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerCategory