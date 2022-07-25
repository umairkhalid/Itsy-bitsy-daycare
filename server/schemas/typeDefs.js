const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type UserMain {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: ID
    user: UserMain
  }

  type Query {
    allUsers : UserMain
    user: UserMain
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    
    updateUser(firstName: String, lastName: String, email: String, password: String): UserMain
    
    loginmain(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
