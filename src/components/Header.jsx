import { useState, useEffect } from 'react'
import {
  Link,
  NavLink,
  createSearchParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDebounce } from '../hooks'

import '../styles/header.scss'

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred);

  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [searchText, setSearchText] = useState(searchQuery);
  const debouncedSearchText = useDebounce(searchText);

  const onChange = ({ target: { value }}) => {
    setSearchText(value)

    if (location.pathname !== '/') {
      navigate(`/?search=${encodeURIComponent(value)}`);
    }
  };

  useEffect(() => {
    if (debouncedSearchText) {
      setSearchParams(createSearchParams({ search: debouncedSearchText }));
    } else {
      setSearchParams();
    }
  }, [debouncedSearchText]);

  return (
    <header>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          Watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
          <input
            type="search"
            data-testid="search-movies"
            onChange={onChange}
            value={searchText}
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
          />
      </div>      
    </header>
  )
}

export default Header
