import gql from 'graphql-tag';

export const GET_ME = gql`
   {
    me {
      _id
      email
      username
      bookCount
      savedBooks {
        # _id
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