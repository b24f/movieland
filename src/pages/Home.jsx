import { useState, useEffect } from 'react';

import Movies from '../components/Movies';

import { useMovies, useIntersectionObserver } from '../hooks';

function Home() {
    const [page, setPage] = useState(1);
    const [ref, entry] = useIntersectionObserver();
    const { result, isLoading, isError } = useMovies({ page });

    useEffect(() => {
        if (entry?.isIntersecting) {
            setPage(prevPage => prevPage + 1) 
        }
    }, [entry?.isIntersecting]);

    // TODO: Handle errors, loading state and last page
    
    return (
        <div>
            {/* TODO: change response to remove result.results */}
            {isLoading ? <p>Loading...</p> :  <Movies movies={result.results} />}
            <div ref={ref} style={{ height: 100 }}>
                {entry?.isIntersecting ? <p>...Loading</p> : null}
            </div>
        </div>
    )
}

export default Home