import { Link } from 'react-router-dom';

const Logo = ({ logo }) => {
    return <Link to='/'>
        <img src={logo} alt="" className="img-fluid" />
    </Link>
}

export default Logo;