import { useState, useEffect, useRef } from 'react';

import Movies from '../components/Movies';

import { useMovies } from '../hooks';

function Home() {
    const [page, setPage] = useState(1);
    const { result, isLoading, isError } = useMovies({ page });

    const loaderRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];

            if (target.isIntersecting) {
                setPage(prevPage => prevPage + 1) 
            }
        });
    
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
    
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, []);

    // TODO: Handle errors, loading state and last page
    
    return (
        <div>
            {isLoading ? <p>Loading...</p> :  <Movies movies={result} />}
            <div ref={loaderRef} style={{ height: 100 }}>Loading...</div>
        </div>
    )
}

export default Home