import gql from 'graphql-tag';

export const me = gql`
  query {
    me {
      _id
      username
      bookCount
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;