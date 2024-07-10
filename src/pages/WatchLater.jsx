import { useSelector, useDispatch } from 'react-redux'
import watchLaterSlice from '../data/watchLaterSlice'

import PageLayout from '../layouts/PageLayout'

const WatchLater = () => {
    const dispatch = useDispatch()

    const state = useSelector((state) => state)
    const { watchLater: { watchLaterMovies } } = state

    const { remveAllWatchLater } = watchLaterSlice.actions

    const clearList = () => dispatch(remveAllWatchLater());

    return (
      <PageLayout
        title="Watch Later List"
        containerTestId="watch-later-div"
        contentTestId="watch-later-movies"
        movies={watchLaterMovies}
        onRemoveButtonClick={clearList}
        removeButtonLabel="Empty list"
        emptyListText="You have no movies saved to watch later."
      />
    );
}

export default WatchLater;
