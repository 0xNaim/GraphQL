import { flowRight as compose } from 'lodash';
import { useState } from 'react';
import { graphql } from 'react-apollo';
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from '../queries/queries';

const AddBook = ({ getAuthorsQuery: data, addBookMutation }) => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addBookMutation({
      variables: {
        name: formData.name,
        genre: formData.genre,
        authorId: formData.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  let displayAuthors;
  if (data.loading) {
    displayAuthors = <option disabled>Loading...</option>;
  } else {
    displayAuthors = data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book Name</label>
        <input
          type='text'
          name='name'
          placeholder='Book name'
          onChange={handleChange}
        />
      </div>

      <div className='field'>
        <label>Genre</label>
        <input
          type='text'
          name='genre'
          placeholder='Genre name'
          onChange={handleChange}
        />
      </div>

      <div className='field'>
        <label>Author</label>
        <select name='authorId' onChange={handleChange}>
          <option>Select author</option>
          {displayAuthors}
        </select>
      </div>
      <button type='button' onClick={handleSubmit}>
        +
      </button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
