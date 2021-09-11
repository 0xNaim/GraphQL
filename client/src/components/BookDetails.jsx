import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ data }) => {
  const { book } = data;

  let displayBookDetails;
  if (book) {
    displayBookDetails = (
      <div>
        <h3>{book.name}</h3>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className='other-books'>
          {book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    displayBookDetails = <div>No book selected!</div>;
  }

  return <div id='book-details'>{displayBookDetails}</div>;
};

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
