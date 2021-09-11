import { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = ({ data }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  let displayBooks;
  if (data.loading) {
    displayBooks = <div>Loading...</div>;
  } else {
    displayBooks = data.books.map((book) => (
      <li key={book.id} title={book.name} onClick={() => setSelectedBook(book.id)}>
        {book.name}
      </li>
    ));
  }

  return (
    <div>
      <ul id='book-list'>{displayBooks}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
