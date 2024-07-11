import { useState, useEffect } from 'react';

import Movies from '../components/Movies';

import { useMovies, useInfiniteScroll } from '../hooks';

function Home() {
    const [ref, isIntersecting, pageNumber] = useInfiniteScroll();
    const { result, isLoading, isError, isFetching } = useMovies({ page: pageNumber });

    // TODO: Handle errors, loading state and last page
    
    return (
        <div>
            {/* TODO: change response to remove result.results */}
            {isLoading ? <p>Loading...</p> :  <Movies movies={result.results} />}
            <div ref={ref} style={{ height: 100 }}>
                {isIntersecting ? <p>Loading...</p> : null}
            </div>
        </div>
    )
}

export default Home