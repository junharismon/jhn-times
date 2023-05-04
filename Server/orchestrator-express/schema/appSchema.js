const axios = require('axios')
const mongoDbUrl = process.env.URL_MONGODB
const postgresUrl = process.env.URL_POSTGRES

const appTypeDefs = `#graphql
  type News {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    CategoryId: Int,
    UserMongoId: String,
    createdAt: String,
    Category: Category,
    User: User,
    Tags: [Tag]
  }

  type Category {
    id:ID,
    name: String
  }

  type Query {
        findNews: [News],
        findNewsBySlug(slug: String): News,
        findCategory: [Category]
    }

  type Category {
    id: ID,
    name: String
  }

  type Tag {
    id: Int,
    NewsId: Int,
    name: String
  }

  type User {
    _id: ID,
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  }

  type Message {
    message: String
  }

  type Mutation {
    createNews(input: newNewsInput!): News
    editNews(id: Int, input: newNewsInput!): Message
    deleteNews(id: ID): Message
  }

  

  input newNewsInput {
        title: String!
        content: String!
        imgUrl: String
        CategoryId: Int!
        UserId: Int!
        tags: [String!]
      }  
`;

const appResolvers = {
    Query: {
        findNews: async () => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${postgresUrl}/news`
                })

                return data
            } catch (err) {
                console.log(err)
            }
        },
        findNewsBySlug: async (parent, args) => {
            try {

                const { data } = await axios({
                    method: 'GET',
                    url: `${postgresUrl}/news/${args.slug}`
                })

                const dataUser = await axios({
                    method: 'GET',
                    url: `${mongoDbUrl}/users/${data.UserMongoId}`
                })
                console.log(dataUser.data, "<<<<<");
                data.User = dataUser.data

                return data
            } catch (err) {
                console.log(err)
            }
        },
        findCategory: async (parent, args) => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${postgresUrl}/category`
                })
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        createNews: async (parent, args) => {
            try {
                const { data } = await axios.post(`${postgresUrl}/news`, args.input)
                console.log(data);
                return data
            } catch (error) {
                console.log(error);
            }
        },
        editNews: async (parent, args) => {
            try {
                const { data } = await axios.put(`${postgresUrl}/news/${args.id}`, args.input)
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        deleteNews: async (parent, args) => {
            try {
                const { data } = await axios.delete(`${postgresUrl}/news/${args.id}`)
                return data
            } catch (error) {
                console.log(error);
            }
        }
    }

};

module.exports = [appTypeDefs, appResolvers]