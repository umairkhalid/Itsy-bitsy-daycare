const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userType: String
  }

  type Enquiry {
    _id: ID!
    firstName: String
    lastName: String
    addressLine1: String
    addressLine2: String
    suburb: String
    state: String,
    postCode: String
    email: String
    phone: String
    childFirstName: String
    childLastName: String
    childDateOfBirth: String
    createdAt: String
    requestedDays: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allUsers: [User]
    user: User
    enquiries: [Enquiry]!
    enquiry(enquiryId: ID!): Enquiry
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
        
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
