import React from 'react';
import renderer from 'react-test-renderer';
import BookCopyList from './BookCopyList';
it('renders book copy list ok', () => {
  const bcr_list = renderer.create(<BookCopyList/>).toJSON();
  expect(bcr_list).toMatchSnapshot();
});
