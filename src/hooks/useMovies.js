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
    } = useGetMoviesQuery({ page });

    const {
        data: dataSearch,
        isLoading: isLoadingSearch,
        isError: isErrorSearch,
        isFetching: isFetchingSearch,
    } = useSearchMoviesByTextQuery({ text: searchQuery }, { skip: !searchQuery });

    const result = searchQuery ? dataSearch : dataAll;
    const isLoading = isLoadingAll || isLoadingSearch;
    const isError = isErrorAll || isErrorSearch;
    const isFetching = isFetchingAll || isFetchingSearch;

    return {
        result,
        isLoading,
        isError,
        isFetching,
    };
};
