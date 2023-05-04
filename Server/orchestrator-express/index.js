const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const [typeDefs, resolvers] = require('./schema/userSchema')
const [appTypeDefs, appResolvers] = require('./schema/appSchema')

const server = new ApolloServer({
    typeDefs: [typeDefs, appTypeDefs],
    resolvers: [resolvers, appResolvers],
});

startStandaloneServer(server, {
    listen: { port: 80 },
})
    .then(({ url }) => {
        console.log(`🚀  Server ready at: ${url}`);
    })
    .catch((err) => {
        console.log(err);
    })


