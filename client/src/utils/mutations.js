import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userType
      }
    }
  }
`;

export const ENQUIRY = gql`
mutation Mutation($firstName: String!, $lastName: String!, $addressLine1: String!, $suburb: String!, $state: String!, $postCode: Int!, $email: String!, $phone: String!, $childFirstName: String!, $childLastName: String!, $childDateOfBirth: Date!, $requestedDays: [String]!, $branch: ID!, $branchRoom: ID!) {
  addEnquiry(firstName: $firstName, lastName: $lastName, addressLine1: $addressLine1, suburb: $suburb, state: $state, postCode: $postCode, email: $email, phone: $phone, childFirstName: $childFirstName, childLastName: $childLastName, childDateOfBirth: $childDateOfBirth, requestedDays: $requestedDays, branch: $branch, branchRoom: $branchRoom) {
    _id
    firstName
    lastName
    addressLine1
    addressLine2
    suburb
    state
    postCode
    email
    phone
    childFirstName
    childLastName
    childDateOfBirth
    requestedDays
    branch {
      _id
    }
    branchRoom {
      _id
    }
  }
}`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
