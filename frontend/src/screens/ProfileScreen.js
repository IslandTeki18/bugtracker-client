import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBug } from "../actions/bugActions";
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
    bug,
  } = bugCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
      history.push(`/profile/bug/${bug._id}/edit`);
    }
  }, [createSuccess, history, bug, userInfo, dispatch]);

  const createBugHandler = (e) => {
    e.preventDefault();
    dispatch(createBug());
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
                    <tr>
                      <th scope="row" className="text-truncate">
                        1
                      </th>
                      <td className="text-truncate">Login Function</td>
                      <td className="text-truncate">Active</td>
                      <td className="text-truncate">StackTrace</td>
                      <td className="text-truncate">
                        <span className="badge badge-success">BUG</span>
                      </td>
                      <td className="text-truncate">Landon</td>
                      <td className="text-truncate">02/24/2021</td>
                      <td className="text-truncate"></td>
                      <td className="text-truncate">
                        <button className="btn btn-info btn-sm">Edit</button>
                      </td>
                      <td className="text-truncate">
                        <button className="btn btn-light btn-light btn-sm">
                          View
                        </button>
                      </td>
                      <td className="text-truncate">
                        <button className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileScreen;
