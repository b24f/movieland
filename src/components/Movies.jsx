import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, closeCard, videoKey }) => {
    return (
        <div data-testid="movies" className="movie-cards-container">
            {movies.results?.map((movie) => {
                return (
                    <Movie 
                        videoKey={videoKey}
                        movie={movie} 
                        key={movie.id}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    )
}

export default Movies
