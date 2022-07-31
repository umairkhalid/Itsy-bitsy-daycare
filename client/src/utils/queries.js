import { gql } from '@apollo/client';


export const QUERY_USER = gql`
  {
  user {
    firstName
    lastName
    }
  }
`;

export const QUERY_ENQUIRIES = gql`
  query getEnquiries {
    enquiries {
      _id
      firstName
      lastName
      addressLine1
      addressLine2
      suburb
      state,
      postCode
      email
      phone
      childFirstName
      childLastName
      childDateOfBirth
      createdAt
      requestedDays
    }
  }
`
