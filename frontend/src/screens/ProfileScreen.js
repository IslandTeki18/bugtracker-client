import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBug, listBugs, deleteBug } from "../actions/bugActions";
import { Route } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import moment from "moment";
import { BUG_CREATE_RESET } from "../constants/bugConstants";

const ProfileScreen = ({ match, history }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const bugCreate = useSelector((state) => state.bugCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
    bug: createdBug,
  } = bugCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bugList = useSelector((state) => state.bugList);
  const { loading, error, bugs, page, pages } = bugList;

  const bugDelete = useSelector((state) => state.bugDelete);
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = bugDelete;

  useEffect(() => {
    dispatch({ type: BUG_CREATE_RESET });
    // if user is not logged in
    if (!userInfo) {
      history.push("/login");
    }
    // auto scroll to top of page onload
    window.scrollTo(0, 0);
    // if create success, go to the new bug edit page
    if (createSuccess) {
      history.push(`/bug/${createdBug._id}/edit`);
    } else {
      dispatch(listBugs(keyword, pageNumber));
    }
  }, [
    createSuccess,
    history,
    deleteSuccess,
    createdBug,
    userInfo,
    dispatch,
    keyword,
    pageNumber,
  ]);

  const createBugHandler = () => {
    dispatch(createBug());
  };

  const deleteBugHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteBug(id));
    }
  };
  return (
    <>
      {/* Profile Controls */}
      <section className="pt-3" id="profile-controls">
        <div className="container">
          <div className="row">
            <div className="col-md-8 d-flex">
              <h3 className="text-white pr-4">User Dashboard</h3>
              <Link to="/profile/settings" className="btn btn-light mr-4">Settings</Link>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <div className="col-md-4 text-right">
              <button
                className="btn btn-primary btn-sm"
                onClick={createBugHandler}
              >
                Add Bug
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Bug List Table */}
      <section className="p-3" id="bug-list-table">
        <div className="container">
          {createLoading && <Loader />}
          {createError && <Message variant="danger">{createError}</Message>}
          {deleteLoading && <Loader />}
          {deleteError && <Message variant="danger">{deleteError}</Message>}
          {!keyword ? null : (
            <Link to="/profile" className="btn btn-light my-2">
              Go Back
            </Link>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="row">
                {bugs.map((bug, idx) => (
                  <div className="col-sm-12 col-md-6 mb-3" key={idx}>
                    <div className="mr-5 bug-card">
                      <div className="card-body text-white">
                        <div className="row">
                          <div className="col-md-8">
                            <h4 className="text-white">{bug.title}</h4>
                            <div className="d-flex">
                              <p className="mr-3">
                                ID:{" "}
                                <span className="badge badge-dark">
                                  {bug._id.substring(0, 5)}
                                </span>
                              </p>
                              <p>
                                Assigned To:{" "}
                                <span className="badge badge-dark">
                                  {bug.assignmentTo}
                                </span>
                              </p>
                            </div>
                            <div className="d-flex">
                              <p className="mr-2">
                                Status:{" "}
                                <span
                                  className={`badge badge-${
                                    bug.status === "Closed" ||
                                    bug.status === "Resolved"
                                      ? "success"
                                      : bug.status === "Active"
                                      ? "info"
                                      : "dark"
                                  }`}
                                >
                                  {bug.status}
                                </span>
                              </p>
                              <p>
                                Type:{" "}
                                <span
                                  className={`badge badge-${
                                    bug.type === "Bug"
                                      ? "success"
                                      : bug.type === "Issue" ||
                                        bug.type === "Task"
                                      ? "warning"
                                      : bug.type === "Design"
                                      ? "info"
                                      : bug.type === "Test Case"
                                      ? "light"
                                      : "primary"
                                  }`}
                                >
                                  {bug.type}
                                </span>
                              </p>
                            </div>
                            <div className="d-flex">
                              <p>
                                Project:{" "}
                                <span className="badge badge-dark">
                                  {bug.project}
                                </span>
                              </p>
                              <p>
                                Created:{" "}
                                <span className="badge badge-dark">
                                  {moment(bug.createdAt).calendar()}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <Link
                              className="btn btn-light btn-block"
                              to={`/bug/${bug._id}`}
                            >
                              View
                            </Link>
                            <Link
                              className="btn btn-info btn-block"
                              to={`/bug/${bug._id}/edit`}
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-danger btn-block"
                              onClick={() => deleteBugHandler(bug._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
