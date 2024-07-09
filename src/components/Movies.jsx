import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, closeCard, videoKey }) => {

    return (
        <div data-testid="movies" className="movie-cards-container">
            {movies.movies.results?.map((movie) => {
                return (
                    <Movie 
                        videoKey={videoKey}
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
