const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    userType: String
  }
  
  type Reset {
    _id: ID
    firstName: String
    lastName: String
    email: String
    resetCode: String
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

  type Enquiry {
    _id: ID
    firstName: String
    lastName: String
    addressLine1: String
    addressLine2: String
    suburb: String
    state: String
    postCode: String
    email: String
    phone: String
    childFirstName: String
    childLastName: String
    childDateOfBirth: Date
    requestedDays: [String]
    createdAt: String
    branch: [Branch]
    branchRoom: [BranchRoom]
    enrollmentCode: String
  }

  type Query {
    allUsers: [User]
    user: User
    enquiries: [Enquiry]
    enquiry(enquiryId: ID!): Enquiry
    allBranches: [Branch]
    allBranchRooms: [BranchRoom]
    searchEnrollmentLink(enrollmentCode: String!): Enquiry
  }


  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, userType: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addBranchRoom(roomName: String!, roomCapacity: Int!, roomSupervisor: String!, branchId: ID!): BranchRoom
    singleBranchRoom(_id: ID!): BranchRoom
    resetPassword(email: String!): Reset
    updatePassword(email: String!, resetCode: String!, password: String!): User
    addEnquiry(firstName: String!, lastName: String!, addressLine1: String!, addressLine2: String, suburb: String!, state: String!, postCode: String!, email: String!, phone: String!, childFirstName: String!, childLastName: String!, childDateOfBirth: Date!, requestedDays: [String]!, branch: ID!, branchRoom: ID!): Enquiry
    removeEnquiry(enquiryId: ID!): Enquiry
    sendEnrollmentLink(enquiryId: ID!) : Enquiry
    
  }
`;

module.exports = typeDefs;
//addEnquiry(firstName: String, lastName: String): Enquiry