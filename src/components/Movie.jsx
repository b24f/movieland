import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moviesApi } from '../data/moviesSlice'

import Modal from './Modal'
import YoutubePlayer from './YoutubePlayer'
import Button from './Button'

import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'

const Movie = ({ movie }) => {
    const [isOpened, setIsOpened] = useState(false);
    const dispatch = useDispatch();
    // TODO: Handle errors and loading state
    const [trigger, { data: trailerKey, error, isLoading, isError }] = moviesApi.endpoints.getTrailerKeyByMovieId.useLazyQuery();

    const { id: movieId, overview, release_date, poster_path, title } = movie;
    const releaseDate = release_date?.substring(0, 4);
    
    const payload = {
        id: movieId, 
        overview, 
        release_date: releaseDate,
        poster_path,
        title,
    };
    
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const isStarred = useSelector(state => state.starred.starredMovies.findIndex(({ id }) => id === movieId) > -1);
    const isWatchLater = useSelector(state => state.watchLater.watchLaterMovies.findIndex(({ id }) => id === movieId) > -1);
    
    const onModalOpen = () => trigger(movieId);

    const onCardClick = () => setIsOpened(!isOpened);

    const onCardCloseClick = e => {
        e.stopPropagation();
        setIsOpened(false);
    };
    
    const onStarredClick = e => {
        e.stopPropagation();

        if (isStarred) {
            dispatch(unstarMovie(movieId));
        } else {
            dispatch(starMovie(payload));
        }
    };

    const onWatchLaterClick = e => {
        e.stopPropagation();

        if (isWatchLater) {
            dispatch(removeFromWatchLater(movieId));
        } else {
            dispatch(addToWatchLater(payload));
        }
    };

    return (
        <div className={"card" + " " + (isOpened ? "opened" : "")} onClick={onCardClick} >
            <div className="card-body text-center">
                <div className="overlay" />
                <div className="info_panel">
                    <div className="overview">{overview}</div>
                    <div className="year">{releaseDate}</div>

                    <Button
                        classNames="btn-star"
                        testId={isStarred ? "unstar-link" : "starred-link"}
                        onClick={onStarredClick}
                    >
                        <i
                            className={"bi" + ' ' + (isStarred ? 'bi-star-fill' : 'bi-star')}
                            data-testid={isStarred ? "star-fill" : null}
                        />
                    </Button>

                    <Button
                        classNames={"btn btn-light btn-watch-later" + " " + (isWatchLater ? 'blue' : '')}
                        testId={isWatchLater ? "remove-watch-later" : 'watch-later'}
                        onClick={onWatchLaterClick}
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
                <img className="center-block" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : placeholder} alt="Movie poster" />
            </div>
            <h6 className="title mobile-card">{title}</h6>
            <h6 className="title">{title}</h6>
            <button type="button" className="close" onClick={onCardCloseClick} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>    
    )
}

export default Movie