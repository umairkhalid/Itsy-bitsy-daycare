import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
  user {
    firstName
    lastName
    }
  }
`;

export const BRANCHES = gql`
query AllBranches {
  allBranches {
    _id
    branchName
    addressLine1
    addressLine2
    suburb
    state
    postCode
    email1
    email2
    phone1
    phone2
    branchRoom {
      _id
      roomName
      roomCapacity
      roomSupervisor
    }
  }
}
`;