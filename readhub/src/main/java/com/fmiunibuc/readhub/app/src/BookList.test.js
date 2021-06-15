import React from 'react';
import renderer from 'react-test-renderer';
import BookList from './BookList';
it('renders book list ok', () => {
  const book_list = renderer.create(<BookList/>).toJSON();
  expect(book_list).toMatchSnapshot();
});
