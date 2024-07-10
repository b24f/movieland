import Movies from '../components/Movies';

import { useMovies } from '../hooks';

function Home() {
    const { result, isLoading, isError } = useMovies();

    // TODO: React Suspense and error handling
    if (isLoading) return <p>Loading...</p>;
    
    return (
        <Movies movies={result} />
    )
}

export default Home