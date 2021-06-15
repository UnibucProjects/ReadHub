import React from 'react';
import renderer from 'react-test-renderer';
import ShelfList from './ShelfList';
it('renders shelf list ok', () => {
  const shelf_list = renderer.create(<ShelfList/>).toJSON();
  expect(shelf_list).toMatchSnapshot();
});
