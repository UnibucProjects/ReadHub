import React from 'react';
import renderer from 'react-test-renderer';
import MyStats from './MyStats';
it('renders my stats ok', () => {
  const book_list = renderer.create(<MyStats/>).toJSON();
  expect(book_list).toMatchSnapshot();
});
