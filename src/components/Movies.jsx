import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, closeCard }) => {
    return (
        <div data-testid="movies" className="movie-cards-container">
            {movies.results?.map((movie) => {
                return (
                    <Movie 
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
