import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBug,
  listBugs,
  deleteBug,
} from "../../redux/actions/bug.actions";
import { Route } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import SearchBox from "../../components/SearchBox";
import { BUG_CREATE_RESET } from "../../redux/constants/bug.constants";

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
          <div className="row row-cols-3">
            <div className="col">
              <h3 className="text-white">User Dashboard</h3>
            </div>
            <div className="col">
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </div>
            <div className="col">
              <button
                className="btn btn-primary btn-sm"
                onClick={createBugHandler}
              >
                <i className="fas fa-plus mr-2"></i>Add Bug
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Bug List Table */}
      <section className="p-3" id="bug-list-table">
        <div className="container-fluid">
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
                  <div
                    className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                    key={idx}
                  >
                    <div className="mr-5 card">
                      <div className="card-header">
                        <h4 className="text-white text-center">{bug.title}</h4>
                      </div>
                      <div className="card-body text-white">
                        <div className="row">
                          <div className="col-12">
                            <div className="row row-cols-sm-6 d-flex justify-content-between">
                              <div className="col-6 col-sm-6 col-md-4">
                                <p className="mr-3">
                                  ID:{" "}
                                  <span className="badge badge-dark">
                                    {bug._id.substring(0, 8)}
                                  </span>
                                </p>
                              </div>
                              <div className="col-6 col-sm-6 col-md-4">
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
                              </div>
                              <div className="col-12 col-sm-6 col-md-4">
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
                            </div>
                            <div className="row d-flex justify-content-around">
                              <div className="col-6">
                                <p>
                                  Created:{" "}
                                  <span className="badge badge-dark">
                                    {bug.createdAt}
                                  </span>
                                </p>
                              </div>
                              <div className="col-6">
                                <p>
                                  Project:{" "}
                                  <span className="badge badge-dark">
                                    {bug.project}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="row d-flex justify-content-around">
                              <div className="col-6">
                                <p>
                                  Updated:{" "}
                                  <span className="badge badge-dark">
                                    {bug.updatedAt}
                                  </span>
                                </p>
                              </div>
                              <div className="col-6">
                                <p>
                                  Assigned:{" "}
                                  <span className="badge badge-dark">
                                    {bug.assignmentTo}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <Link
                              className="btn btn-light btn-block"
                              to={`/bug/${bug._id}`}
                            >
                              View
                            </Link>
                          </div>
                          <div className="col">
                            <Link
                              className="btn btn-info btn-block"
                              to={`/bug/${bug._id}/edit`}
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="col mt-sm-1 mt-lg-0">
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
