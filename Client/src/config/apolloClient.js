import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://3.27.84.13/',
    cache: new InMemoryCache(),
});


export default client