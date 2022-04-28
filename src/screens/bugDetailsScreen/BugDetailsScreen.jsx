import { useEffect, useState } from "react";
import "./BugDetailsScreen.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listBugDetails,
  createBugNotes,
  removeBugNoteById,
} from "../../redux/actions/bug.actions";
import { BUG_NOTES_RESET } from "../../redux/constants/bug.constants";
import parse from "html-react-parser";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const BugDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const bugDetails = useSelector((state) => state.bugDetails);
  const { loading, error, bug } = bugDetails;

  const bugNotesCreate = useSelector((state) => state.bugNotesCreate);
  const {
    loading: notesLoading,
    error: notesError,
    success: notesSuccess,
  } = bugNotesCreate;

  const bugNotesDelete = useSelector((state) => state.bugNotesDelete);
  const {
    loading: deleteNoteLoading,
    error: deleteNoteError,
    success: deleteNoteSuccess,
  } = bugNotesDelete;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (notesSuccess) {
      setComment("");
      dispatch({ type: BUG_NOTES_RESET });
    }
    dispatch(listBugDetails(id));
  }, [dispatch, id, notesSuccess, deleteNoteSuccess]);

  const notesSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBugNotes(id, {
        comment,
      })
    );
  };

  const removeItemHandler = (itemId, noteId) => {
    if (window.confirm("Are you sure you wanna delete?")) {
      dispatch(removeBugNoteById(itemId, noteId));
    }
  };

  function renderReproSteps() {
    return bug.reproSteps
      .split(",")
      .map((step, idx) => <li key={idx}>{step}</li>);
  }

  return (
    <div className="dkBugDetailsScreen py-5 text-light" id="bug-details">
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <div className="container">
        <div className="row pb-5">
          <div className="col-md-8">
            <div className="bug-title-wrap">
              <h1 className="me-3">{bug.title}</h1>
              <span
                className={`badge bg-${
                  bug.status === "New"
                    ? "warning"
                    : bug.status === "Active"
                    ? "info"
                    : bug.status === "Closed"
                    ? "success"
                    : bug.status === "Resolved"
                    ? "secondary"
                    : "primary"
                }`}
              >
                {bug.status}
              </span>
            </div>
            <div className="info-wrapper mb-3">
              <Link className="btn btn-primary me-2" to={`/bug/${id}/edit`}>
                Edit
              </Link>
              <Link to="/profile" className="btn btn-secondary">
                Back
              </Link>
            </div>
            <div className="bug-info-wrap">
              <h6 className=" text-truncate me-3">
                <span className="badge bg-secondary me-2">Assigned to:</span>
                {bug.assignmentTo}
              </h6>
              <h6 className=" text-truncate me-3">
                <span className="badge bg-secondary me-2">Type:</span>
                {bug.type}
              </h6>
              <h6 className=" text-truncate">
                <span className="badge bg-secondary me-2">Project:</span>
                {bug.project}
              </h6>
            </div>
            {bug.desc && (
              <div className="pt-2 ">
                <h6>
                  <u>Description:</u>
                </h6>
                <div className="fs-5">{parse(bug.desc)}</div>
              </div>
            )}
            {bug.reproSteps && (
              <div className="pt-3 ">
                <h6>
                  <u>Repro Steps:</u>
                </h6>
                <ol>{renderReproSteps()}</ol>
              </div>
            )}
            <div className="notes-wrapper pt-3">
              <h6>
                <u>Notes</u>
              </h6>
              {bug.notes.length === 0 && (
                <Message>There are no notes...</Message>
              )}
              <ul className="list-group list-group-flush">
                {bug.notes.map((note) => (
                  <li
                    className="list-group-item bg-dark text-light"
                    key={note._id}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <i>
                        <b>
                          {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(note.createdAt.toString()))}
                        </b>
                      </i>
                      <button
                        className="btn btn-link"
                        onClick={() => removeItemHandler(bug._id, note._id)}
                      >
                        <i
                          className="far fa-trash-alt"
                          style={{ color: "#B13736" }}
                        ></i>
                      </button>
                    </div>
                    <p className="fs-5">{note.comment}</p>
                  </li>
                ))}
              </ul>
              {(deleteNoteLoading || notesLoading) && <Loader />}
              {deleteNoteError && (
                <Message variant="danger">{deleteNoteError}</Message>
              )}
              {notesSuccess && <Message variant="success">Note Added!</Message>}
              {notesError && <Message variant="danger">{notesError}</Message>}
            </div>
            <button
              className="btn btn-primary btn-sm my-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#notes-form"
              aria-expanded="false"
              aria-controls="notes-form"
            >
              Add Note
            </button>
            <div className="notes-form-wrapper collapse" id="notes-form">
              <form onSubmit={notesSubmitHandler}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="itemNotesTextAreaInput"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button className="btn btn-sm btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <ul>
              <li className="pt-2">
                <h6>Priority: {bug.priority}</h6>
              </li>
              <li className="pt-2">
                <h6>
                  Severity:{" "}
                  <span
                    className={`badge bg-${
                      bug.severity === "1 - Critical"
                        ? "danger"
                        : bug.severity === "2 - High" ||
                          bug.severity === "3 - Medium"
                        ? "warning"
                        : bug.severity === "4 - Low"
                        ? "success"
                        : "dark"
                    } pl-2`}
                  >
                    {bug.severity}
                  </span>
                </h6>
              </li>
              <li className="pt-2">
                <h6 className="">Original Estimate: {bug.originalEstimate}</h6>
              </li>
              <li className="pt-2">
                <h6 className="">Hours Spent: {bug.hoursSpent}</h6>
              </li>
              <li className="pt-2">
                <h6 className="">Level of Effort: {bug.levelOfEffort}</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugDetailsScreen;
