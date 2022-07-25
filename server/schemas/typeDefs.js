const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userType: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    allUsers : [User]
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
    
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    
    loginmain(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;