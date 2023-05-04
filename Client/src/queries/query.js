const { gql } = require("@apollo/client");

export const GET_NEWS = gql`
    query GET_NEWS {
        findNews {
            id
            slug
            title
            createdAt
            imgUrl
            content
            Category {
                name
            }
        }
    }
`
export const GET_CATEGORY = gql`
    query GET_CATEGORY {
        findCategory {
            id
            name
        }
}
`

export const GET_NewsBySlug = gql`
    query GET_NewsBySlug($slug: String) {
        findNewsBySlug(slug: $slug) {
            id
            title
            slug
            content
            imgUrl
            CategoryId
            UserMongoId
            createdAt
            User {
            _id
            username
            email
            role
            phoneNumber
            address
            }
        }
    }
`