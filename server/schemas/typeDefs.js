const { gql } = require('apollo-server-express');
const { typeDefs } = require('.');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    cityCount: Int
    savedCities: [City]
}

type City {
    cityId: ID!
    cityName: String!
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username : String!, email: String!, password: String!): Auth
    savedCity(cityData: CityInput!): User
    removeCity(cityId: ID!): User
}
`;

module.exports - typeDefs