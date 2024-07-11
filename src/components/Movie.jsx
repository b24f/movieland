import { useDispatch, useSelector } from 'react-redux'

import { moviesApi } from '../data/moviesSlice'

import Modal from './Modal'
import YoutubePlayer from './YoutubePlayer'
import Button from './Button'

import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

const Movie = ({ movie, closeCard }) => {
    const dispatch = useDispatch();
    // TODO: Handle errors and loading state
    const [trigger, { data: trailerKey, error, isLoading, isError }] = moviesApi.endpoints.getTrailerKeyByMovieId.useLazyQuery();

    const state = useSelector((state) => state)
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions
    
    const { id: movieId } = movie;

    // TODO: toggle class with local state value
    const myClickHandler = (e) => {
        if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
        e.target.parentElement.parentElement.classList.remove('opened')
    }

    const onModalOpen = () => trigger(movie.id);

    // TODO: move to selector
    const isStarred = starred.starredMovies.findIndex(({ id }) => id === movieId) > -1;
    const isWatchLater = watchLater.watchLaterMovies.findIndex(({ id }) => id === movieId) > -1;
    
    const toggleStarred = () => {
        if (isStarred) {
            dispatch(unstarMovie(movie));
        } else {
            // TODO: remove repeating code
            dispatch(starMovie({
                id: movie.id, 
                overview: movie.overview, 
                release_date: movie.release_date?.substring(0, 4),
                poster_path: movie.poster_path,
                title: movie.title
            }));
        }
    }

    const toggleWatchLater = () => {
        if (isWatchLater) {
            dispatch(removeFromWatchLater(movie));
        } else {
            dispatch(addToWatchLater({
                id: movie.id, 
                overview: movie.overview, 
                release_date: movie.release_date?.substring(0, 4),
                poster_path: movie.poster_path,
                title: movie.title
            }));
        }
    }

    return (
        <div className="card" onClick={(e) => e.currentTarget.classList.add('opened')} >
            <div className="card-body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    <div className="overview">{movie.overview}</div>
                    <div className="year">{movie.release_date?.substring(0, 4)}</div>

                    <Button
                        classNames="btn-star"
                        testId={isStarred ? "unstar-link" : "starred-link"}
                        onClick={toggleStarred}
                    >
                        <i
                            className={"bi" + ' ' + (isStarred ? 'bi-star-fill' : 'bi-star')}
                            data-testid={isStarred ? "star-fill" : null}
                        />
                    </Button>

                    <Button
                        classNames={"btn btn-light btn-watch-later" + " " + (isWatchLater ? 'blue' : '')}
                        testId={isWatchLater ? "remove-watch-later" : 'watch-later'}
                        onClick={toggleWatchLater}
                    >
                        {isWatchLater ? <i className="bi bi-check"></i> : <span>Watch Later</span>}
                    </Button>

                    <Modal
                        onOpen={onModalOpen}
                        TriggerComponent={<button type="button" className="btn btn-dark">View Trailer</button>}
                    >
                        <YoutubePlayer videoKey={trailerKey} />
                    </Modal>
                </div>
                <img className="center-block" src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
            </div>
            <h6 className="title mobile-card">{movie.title}</h6>
            <h6 className="title">{movie.title}</h6>
            <button type="button" className="close" onClick={(e) => myClickHandler(e)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>    
    )
}

export default Movie