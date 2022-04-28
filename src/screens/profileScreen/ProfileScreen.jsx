import { useEffect } from "react";
import "./ProfileScreen.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBug,
  listBugs,
  deleteBug,
} from "../../redux/actions/bug.actions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { BUG_CREATE_RESET } from "../../redux/constants/bug.constants";

const BugListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    window.scrollTo(0, 0);
    dispatch({ type: BUG_CREATE_RESET });
    if (!userInfo) {
      history.push("/login");
    }
    if (createSuccess) {
      history.push(`/bug/${createdBug._id}/edit`);
    } else {
      dispatch(listBugs())
    }
  }, [createSuccess, history, deleteSuccess, createdBug, userInfo, dispatch]);

  function priorityBadgeColor(priority) {
    switch (priority) {
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "primary";
      case 4:
      case 5:
        return "success";
      default:
        return "primary";
    }
  }

  function createBugHandler() {
    dispatch(createBug());
  }

  const deleteBugHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteBug(id));
    }
  };

  function renderBugRows() {
    return bugs.map((bug) => (
      <tr key={bug._id}>
        <th
          scope="row"
          className="bug-id-label"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={bug._id}
        >
          {bug._id}
        </th>
        <td>{bug.title}</td>
        <td>{bug.status}</td>
        <td>{bug.project}</td>
        <td>
          <span
            className={`badge rounded-pill bg-${priorityBadgeColor(
              bug.priority
            )}`}
          >
            {bug.priority}
          </span>
        </td>
        <td>{bug.type}</td>
        <td>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(bug.createdAt.toString()))}
        </td>
        <td>
          <div className="btn-group dropstart">
            <button
              type="button"
              className="btn btn-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa-solid fa-ellipsis text-secondary"
                style={{ fontSize: "25px" }}
              />
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={`/bug/${bug._id}`}>
                  View Details
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={`/bug/${bug._id}/edit`}>
                  Edit Bug
                </Link>
              </li>
              <li>
                <div className="dropdown-item" onClick={deleteBugHandler}>
                  Remove Bug
                </div>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    ));
  }

  if (loading) return <Loader />;

  return (
    <div className="dkProfileScreen py-5 bg-light" id="bug-list-table">
      <div className="container-fluid">
        {(createLoading || deleteLoading) && <Loader />}
        {createError && <Message variant="danger">{createError}</Message>}
        {deleteError && <Message variant="danger">{deleteError}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-success"
              onClick={() => createBugHandler()}
            >
              Add Task +
            </button>
          </div>
          <div className="col-12 table-responsive-lg">
            <table
              className="table table-striped text-dark"
              style={{ minWidth: "900px" }}
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Project</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Type</th>
                  <th scope="col">Created</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>{bugs && renderBugRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugListScreen;
