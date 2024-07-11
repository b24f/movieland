import { useSearchParams } from 'react-router-dom'

import { useGetMoviesQuery, useSearchMoviesByTextQuery } from '../data/moviesSlice'

export const useMovies = ({ page }) => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const {
        data: dataAll,
        isLoading: isLoadingAll,
        isError: isErrorAll,
        isFetching: isFetchingAll,
        error: errorAll,
    } = useGetMoviesQuery({ page });

    const {
        data: dataSearch,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
        isFetching: isFetchingSearch,
        error: errorSearch,
    } = useSearchMoviesByTextQuery({ text: searchQuery }, { skip: !searchQuery });

    const data = searchQuery ? dataSearch : dataAll;
    const isLoading = isLoadingAll || isLoadingSearch;
    const isError = isErrorAll || isErrorSearch;
    const isFetching = isFetchingAll || isFetchingSearch;
    const error = errorAll || errorSearch;

    return {
        data,
        isLoading,
        isError,
        isFetching,
        error,
    };
};
