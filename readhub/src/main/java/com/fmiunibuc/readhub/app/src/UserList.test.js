import React from 'react';
import renderer from 'react-test-renderer';
import UserList from './UserList';
it('renders user list ok', () => {
  const user_list = renderer.create(<UserList/>).toJSON();
  expect(user_list).toMatchSnapshot();
});
