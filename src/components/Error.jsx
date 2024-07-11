import { Link } from 'react-router-dom'

const Error = ({
    code = 404,
    message = 'Something went wrong',
    customStyles,
    ActionComponent
}) => (
    <div style={customStyles}>
        <p>{code}</p>
        <p>{message}</p>
        {ActionComponent != null ? <ActionComponent /> : <Link to="/">Return Home</Link>}
    </div>
)

export default Error;
