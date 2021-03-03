import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBug, listBugs, deleteBug } from "../actions/bugActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { BUG_CREATE_RESET } from "../constants/bugConstants";

const ProfileScreen = ({ history }) => {
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
  const { loading, error, bugs } = bugList;

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
      dispatch(listBugs());
    }
  }, [createSuccess, history, deleteSuccess, createdBug, userInfo, dispatch]);

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
            <div className="col-md-6 d-flex">
              <h3 className="text-white pr-4">User Dashboard</h3>
              <button className="btn btn-light btn-sm">Settings</button>
            </div>
            <div className="col-md-6 text-right">
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
          <div className="row">
            <div className="col-md-12">
              {createLoading && <Loader />}
              {createError && <Message variant="danger">{createError}</Message>}
              {deleteLoading && <Loader />}
              {deleteError && <Message variant="danger">{deleteError}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-borderless table-dark table-sm">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ width: "80px" }}>
                          ID #
                        </th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Project</th>
                        <th scope="col">Type</th>
                        <th scope="col">Assigned</th>
                        <th scope="col">Created</th>
                        <th scope="col">Finished</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bugs.map((bug, idx) => (
                        <tr key={idx}>
                          <th scope="row" className="text-truncate">
                            {bug._id}
                          </th>
                          <td className="text-truncate">{bug.title}</td>
                          <td className="text-truncate">{bug.status}</td>
                          <td className="text-truncate">StackTrace</td>
                          <td className="text-truncate">
                            <span
                              className={`badge badge-${
                                bug.type === "Bug"
                                  ? "success"
                                  : bug.type === "Issue"
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
                          </td>
                          <td className="text-truncate">{bug.assignedTo}</td>
                          <td className="text-truncate">{bug.createdAt}</td>
                          <td className="text-truncate"></td>
                          <td className="text-truncate">
                            <Link
                              className="btn btn-link"
                              to={`/bug/${bug._id}`}
                            >
                              <i className="fas fa-eye profile-icon"></i>
                            </Link>
                          </td>
                          <td className="text-truncate">
                            <Link
                              className="btn btn-link"
                              to={`/bug/${bug._id}/edit`}
                            >
                              <i className="far fa-edit profile-icon-edit"></i>
                            </Link>
                          </td>
                          <td className="text-truncate">
                            <button
                              className="btn btn-link"
                              onClick={() => deleteBugHandler(bug._id)}
                            >
                              <i className="fas fa-trash profile-icon-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
