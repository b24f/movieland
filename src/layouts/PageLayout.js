import { Link } from 'react-router-dom'

import Movies from '../components/Movies'

import '../styles/starred.scss'

function PageLayout({
    title,
    movies,
    removeButtonLabel,
    onRemoveButtonClick,
    emptyListText,
    containerTestId,
    contentTestId,
}) {
    const isEmpty = movies.length === 0;
    return (
        <div className="starred" data-testid={containerTestId}>
            {!isEmpty && (
                <div data-testid={contentTestId} className="starred-movies">
                    <h6 className="header">{title}</h6>
                    
                    <Movies movies={movies} />

                    <footer className="text-center">
                        <button className="btn btn-primary" onClick={onRemoveButtonClick}>{removeButtonLabel}</button>
                    </footer>
                </div>
            )}

            {isEmpty && (
                <div className="text-center empty-cart">
                    <i className="bi bi-star" />
                    <p>{emptyListText}</p>
                    <p>Go to <Link to='/'>Home</Link></p>
                </div>
            )}
        </div>
    )
};

export default PageLayout;
