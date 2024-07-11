import { Link } from 'react-router-dom'

const Error = ({ code, message }) => {
    return (
        <div>
            <p>{code}</p>
            <p>{message}</p>
            <Link to="/">Return Home</Link>
        </div>
    )
}

export default Error;
