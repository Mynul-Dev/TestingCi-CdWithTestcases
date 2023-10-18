/* eslint-disable prettier/prettier */
import React from 'react';
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';
import ListWithFetch from '../App';
// import {server} from '../mocks/server';
// import {rest} from 'msw';

afterEach(cleanup);

// In this test suite, we are testing the component that fetches data from the server
// We are using msw to mock the server response

test('displays images from the server', async () => {
  // Render the component
  render(<ListWithFetch />);

  // Loader is initially visible
  expect(screen.getByLabelText(/loader/i)).toBeTruthy();
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loader/i), {
    timeout: 1500,
  });
  // Verify that users are fetched and rendered
  expect(await screen.findAllByLabelText(/user-container/i)).toHaveLength(10);
  expect(await screen.findByText(/Terry/i)).toBeTruthy();

  // Verifying that the loader is no longer visible
  // There are 2 ways to verify that a component is not in the UI tree
  // 1. Use waitForElementToBeRemoved to wait for the element to be removed from the DOM
  // 2. Use getBy* methods and expect them to throw an error with a corresponding message
  // 3. Use queryBy* methods and expect them to return null (See the next expect statement)
  expect(() => screen.getByLabelText(/loader/i)).toThrow(
    'Unable to find an element with accessibility label: /loader/i',
  );

  // Verifying that there are no errors
  expect(screen.queryByLabelText(/alert/i)).toBeNull();
});
