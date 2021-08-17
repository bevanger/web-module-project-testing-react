import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
    name: 'showName',
    summary: 'showSummary',
    seasons: [
        {id: 1, name: 'season 1', episodes: []},
        {id: 2, name: 'season 2', episodes: []}
    ]
}

test('Display component renders with no props passed in without error', () => { 
    render(<Display/>);
});

test('render component when fetch button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display/>);

    const fetchButton = screen.queryByRole('button');
    userEvent.click(fetchButton);

    await waitFor(() => { 
        const show = screen.queryByTestId('show-container');
        expect(show).toBeInTheDocument();
    })
});

test('select options after fetch button press equals the amount of seasons in data', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display/>)

    const fetchButton = screen.getByRole('button');
    userEvent.click(fetchButton);

    await waitFor(() => {
        const selectSeason = screen.getByLabelText('Select A Season');
        userEvent.click(selectSeason);

        const seasons = screen.queryAllByTestId('season-option');
        expect(seasons).toHaveLength(2);
    })
});

test('when the fetch button is pressed, this function is called', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    const optionalFunction = jest.fn();

    render(<Display displayFunc={optionalFunction}/>)

    const fetchButton = screen.getByRole('button');
    userEvent.click(fetchButton);

    await waitFor(() => {
        const mockLength = optionalFunction.mock.calls.length;
        expect(mockLength).toBe(1);
    })
})

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.