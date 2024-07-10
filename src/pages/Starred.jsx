import { useSelector, useDispatch } from 'react-redux'
import starredSlice from '../data/starredSlice'

import PageLayout from '../layouts/PageLayout'

const Starred = () => {
    const dispatch = useDispatch();

    const state = useSelector((state) => state);
    const { starred: { starredMovies } } = state;
    const { clearAllStarred } = starredSlice.actions;

    const clearList = () => dispatch(clearAllStarred());

    return (
      <PageLayout
        title="Starred movies"
        containerTestId="starred"
        contentTestId="starred-movies"
        movies={starredMovies}
        onRemoveButtonClick={clearList}
        removeButtonLabel="Remove all starred"
        emptyListText="There are no starred movies."
      />
    )
}

export default Starred
