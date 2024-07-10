import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetMoviesQuery, useSearchMoviesByTextQuery } from '../data/moviesSlice'

export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [value, delay]);

    return debouncedValue;
};

export const useMovies = ({ page }) => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const {
        data: moviesAll,
        isLoading: isLoadingAll,
        isError: isErrorAll,
    } = useGetMoviesQuery({ page });

    const {
        data: searchResults,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
    } = useSearchMoviesByTextQuery({ text: searchQuery }, { skip: !searchQuery });

    const result = searchQuery ? searchResults : moviesAll;
    const isLoading = isLoadingAll || isLoadingSearch;
    const isError = isErrorAll || isErrorSearch;

    return {
        result,
        isLoading,
        isError,
    };
};
