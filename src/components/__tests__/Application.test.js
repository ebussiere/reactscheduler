import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByTestId,
} from '@testing-library/react';

import Application from 'components/application';

afterEach(cleanup);

// it('renders without crashing', () => {
//   render(<Application />);
// });

//Promises
// it('defaults to Monday and changes the schedule when a new day is selected', () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText('Monday')).then(() => {
//     fireEvent.click(getByText('Tuesday'));
//     expect(getByText('Leopold Silvers')).toBeInTheDocument();
//   });
// });

//Async Await
it('changes the schedule when a new day is selected', async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText('Monday'));

  fireEvent.click(getByText('Tuesday'));

  expect(getByText('Leopold Silvers')).toBeInTheDocument();
});

it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
  const { container, getByText } = render(<Application />);
  await waitForElement(() => getByText('Monday'));
  await waitForElement(() => getByText('Archie Cohen'));
  fireEvent.click(getByText('Tuesday'));
  const appointments = getAllByTestId(container, 'appointment');
  console.log(prettyDOM(appointments));

  const appointment = getAllByTestId(container, 'appointment')[0];
  console.log(prettyDOM(appointment));

  // console.log(prettyDOM(container));

  // fireEvent.click(getByTestId('add-appointment'));

  // expect(getByText('Leopold Silvers')).toBeInTheDocument();
});
