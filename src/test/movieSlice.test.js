import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'
// import fetchMock from 'jest-fetch-mock';

import store from '../data/store';

import { useGetMoviesQuery } from '../data/moviesSlice'

import { API_KEY } from '../constants';

function wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
};

// beforeEach(() => {
//     fetchMock.resetMocks();
// });

describe('useGetMoviesQuery', () => {
    const data = {};
    const page = 1;

    // beforeEach(() => {
    //     fetchMock.mockOnceIf(`https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&page=${page}&api_key=${API_KEY}`, () =>
    //         Promise.resolve({
    //             status: 200,
    //             body: JSON.stringify({ data }),
    //         })
    //     );
    // });

    it('renders hook', async () => {
        const { result } = renderHook(() => useGetMoviesQuery({ page }), { wrapper });

        expect(result.current).toMatchObject({
            status: 'pending',
            isLoading: true,
            isSuccess: false,
            isError: false,
            isFetching: true,
        });
      
        //   await waitFor(() => expect(result.current.isSuccess).toBe(true));
        //   expect(fetchMock).toBeCalledTimes(1);
      
        // expect(result.current).toMatchObject({
        //     status: 'fulfilled',
        //     data,
        //     isLoading: false,
        //     isSuccess: true,
        //     isError: false,
        //     currentData: data,
        //     isFetching: false,
        // });
    });
});
