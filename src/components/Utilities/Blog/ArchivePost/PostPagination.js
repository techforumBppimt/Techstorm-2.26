import { Link } from "react-router-dom";

const PostPagination = () => {
    return (
        <div className="pagination-wrap">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <Link to={'#'}>
                            <i className="fas fa-angle-double-left"></i>
                        </Link>
                    </li>
                    <li className="page-item active">
                        <a to={'#'}>{'1'}</a>
                    </li>
                    <li className="page-item">
                        <a to={'#'}>{'2'}</a>
                    </li>
                    <li className="page-item">
                        <a to={'#'}>{'3'}</a>
                    </li>
                    <li className="page-item">
                        <a to={'#'}>{'...'}</a>
                    </li>
                    <li className="page-item">
                        <a to={'#'}>{'10'}</a>
                    </li>
                    <li className="page-item">
                        <a to={'#'}>
                            <i className="fas fa-angle-double-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PostPagination;