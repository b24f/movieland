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
            {isLoading ? <p>Loading...</p> :  <Movies movies={result} />}
            <div ref={ref} style={{ height: 100 }}>
                {entry?.isIntersecting ? <p>...Loading</p> : null}
            </div>
        </div>
    )
}

export default Home