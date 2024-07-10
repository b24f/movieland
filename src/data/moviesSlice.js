import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_KEY } from '../constants'

// TODO: Normalize result (createEntityAdapter)
export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: builder => ({
        getMovies: builder.query({
            query: ({ page = 1 }) => `/discover/movie?sort_by=vote_count.desc&page=${page}&api_key=${API_KEY}`,
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (cache, response) => ({
                ...response,
                results: [...(cache.results || []), ...(response.results || [])],
            }),
            forceRefetch: ({ currentArg, previousArg })  => currentArg !== previousArg,
        }),
        searchMoviesByText: builder.query({
            query: ({ text }) => `/search/movie?query=${text}&api_key=${API_KEY}`,
        }),
        getMovieById: builder.query({
            query: id => `/movie/${id}?append_to_response=videos&api_key=${API_KEY}`,
        }),
        getTrailerKeyByMovieId: builder.query({
            query: id => `/movie/${id}?append_to_response=videos&api_key=${API_KEY}`,
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

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
