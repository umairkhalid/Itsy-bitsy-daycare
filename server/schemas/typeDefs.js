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
    token: ID!
    user: User
  }

  type Branch {
    _id: ID
    branchName: String
    addressLine1: String
    addressLine2: String
    suburb: String
    state: String
    postCode: Int
    email1: String
    email2: String
    phone1: String
    phone2: String
    branchRoom: [BranchRoom]
  }

  type BranchRoom {
    _id: ID
    roomName: String
    roomCapacity: Int
    roomSupervisor: String
  }

  type Query {
    allUsers: [User]
    user: User
    allBranches: [Branch]
    allBranchRooms: [BranchRoom]
  }


  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    
    login(email: String!, password: String!): Auth

    addBranchRoom(roomName: String!, roomCapacity: Int!, roomSupervisor: String!, branchId: ID!): BranchRoom
    singleBranchRoom(_id: ID!): BranchRoom
  }
`;

module.exports = typeDefs;
