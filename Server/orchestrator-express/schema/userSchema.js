const axios = require('axios')
const mongoDbUrl = process.env.URL_MONGODB

const typeDefs = `#graphql
  type User {
    _id: ID,
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  }

  type Query {
    findUsers: [User],
    findUsersById(id: String): User
  }


  type Message {
    message: String
  }

  type Mutation {
    createUser(username: String, email: String, password: String, phoneNumber: String, address: String ): User,
    deleteUser(_id: ID!): Message
  }
`;

const resolvers = {
    Query: {
        findUsers: async () => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${mongoDbUrl}/users`
                })
                return data
            } catch (err) {
                console.log(err)
            }
        },
        findUsersById: async (parent, args) => {
            try {
                const { id } = args
                const { data } = await axios({
                    method: 'GET',
                    url: `${mongoDbUrl}/users/${id}`
                })
                return data
            } catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        createUser: async (parent, args) => {
            try {
                const { username, email, password, phoneNumber, address } = args
                const { data } = await axios({
                    method: 'POST',
                    url: `${mongoDbUrl}/users`,
                    data: { username, email, password, phoneNumber, address },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                return data
            } catch (err) {
                console.log(err)
            }
        },
        deleteUser: async (parent, args) => {
            try {
                const successDelete = 'Delete Success'
                const { data } = await axios({
                    method: "DELETE",
                    url: `${mongoDbUrl}/users/${args._id}`
                })
                return data
            } catch (error) {
                console.log(error);
            }
        }
    }
};

module.exports = [typeDefs, resolvers]

// type Item {
//   id: ID,
//   name: String,
//   description: String,
//   price: Int,
//   imgUrl: String,
//   authorId: Int,
//   categoryId: Int
// }