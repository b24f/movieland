import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: builder => ({
        getMovies: builder.query({
            query: ({ page = 1 }) => `/discover/movie?sort_by=vote_count.desc&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`,
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (cache, response) => {
                const { page } = response;
                // Replacing existing cache with response if the current page number is 1
                if (page === 1) return response;
                
                return {
                    ...response,
                    results: [...(cache.results || []), ...(response.results || [])],
                }
            },
            forceRefetch: ({ currentArg, previousArg })  => {
                return currentArg.page !== previousArg?.page
            },
        }),
        searchMoviesByText: builder.query({
            query: ({ text }) => `/search/movie?query=${text}&api_key=${process.env.REACT_APP_API_KEY}`,
        }),
        getMovieById: builder.query({
            query: id => `/movie/${id}?append_to_response=videos&api_key=${process.env.REACT_APP_API_KEY}`,
        }),
        getTrailerKeyByMovieId: builder.query({
            query: id => `/movie/${id}?append_to_response=videos&api_key=${process.env.REACT_APP_API_KEY}`,
            transformResponse: response => {
                const { key } =
                    response.videos.results.find(video => video.type === 'Trailer') ||
                    response.videos.results[0];
                
                return key;
            },
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useSearchMoviesByTextQuery,
    useGetMovieByIdQuery,
    useGetTrailerKeyByMovieIdQuery,
} = moviesApi;
