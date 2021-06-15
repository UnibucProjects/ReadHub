import React from 'react';
import renderer from 'react-test-renderer';
import LibraryList from './LibraryList';
it('renders library list ok', () => {
  const library_list = renderer.create(<LibraryList/>).toJSON();
  expect(library_list).toMatchSnapshot();
});
