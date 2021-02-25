import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        Bug Tracker
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          {userInfo ? (
            <>
              <li class="nav-item active">
                <Link class="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li class="nav-item active">
                <Link class="nav-link" onClick={logoutHandler} to="/">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li class="nav-item active">
              <Link class="nav-link" to="/register">
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
