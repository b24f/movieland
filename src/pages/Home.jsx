import Movies from '../components/Movies';
import Error from '../components/Error';
import Loader from '../components/Loader';

import { useMovies, useInfiniteScroll } from '../hooks';

function Home() {
    const { ref, pageNumber } = useInfiniteScroll();
    const { data, isLoading, isError, error } = useMovies({ page: pageNumber });

    if (isLoading) return <Loader />;

    if (isError) return <Error code={error?.status} message={error?.data?.status_message} />
    
    return (
        <div>
            <Movies movies={data?.results} />
            <div ref={ref} style={{ height: 100 }}></div> 
        </div>
    )
}

export default Home;
