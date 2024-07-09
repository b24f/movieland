import { useGetMoviesQuery } from '../data/moviesSlice'

import Movies from '../components/Movies';

function Home() {
    const { data, isLoading, error } = useGetMoviesQuery();

    // TODO: React Suspense and error handling
    if (isLoading) return <p>Loading...</p>;
    
    return (
        <Movies movies={data} />
    )
}

export default Home