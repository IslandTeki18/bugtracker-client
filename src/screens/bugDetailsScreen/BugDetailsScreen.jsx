import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listBugDetails,
  createBugNotes,
  removeBugNoteById,
} from "../../redux/actions/bug.actions";
import { BUG_NOTES_RESET } from "../../redux/constants/bug.constants";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const BugDetailsScreen = ({ match }) => {
  const dispatch = useDispatch();
  const bugId = match.params.id;
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
    dispatch(listBugDetails(bugId));
  }, [dispatch, bugId, notesSuccess, deleteNoteSuccess]);

  const notesSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBugNotes(bugId, {
        comment,
      })
    );
  };

  const removeItemHandler = (itemId, noteId) => {
    if (window.confirm("Are you sure you wanna delete?")) {
      dispatch(removeBugNoteById(itemId, noteId));
    }
  };

  return (
    <>
      <section className="py-5" id="bug-details">
        {loading && <Loader /> ? (
          error && <Message>{error}</Message>
        ) : (
          <div className="container">
            <Link to="/profile" className="btn-gray btn-sm mb-4">
              Back
            </Link>
            <div className="row">
              <div className="col-md-8">
                <div className="bug-title-wrap d-flex">
                  <h3 className="text-white">
                    {bug.title}{" "}
                    <span
                      className={`badge badge-${
                        bug.status === "New"
                          ? "warning"
                          : bug.status === "Active"
                          ? "Info"
                          : bug.status === "Closed"
                          ? "success"
                          : bug.status === "Resolved"
                          ? "light"
                          : "primary"
                      } mx-2`}
                    >
                      {bug.status}
                    </span>
                  </h3>
                  <Link className="btn btn-link" to={`/bug/${bugId}/edit`}>
                    <i className="far fa-edit bug-icon"></i>
                  </Link>
                </div>
                <div className="bug-info-wrap d-flex">
                  <h6 className="text-white text-truncate mr-3">
                    <span className="badge badge-light mr-2">Assigned to:</span>
                    {bug.assignmentTo}
                  </h6>
                  <h6 className="text-white text-truncate mr-3">
                    <span className="badge badge-light mr-2">Type:</span>
                    {bug.type}
                  </h6>
                  <h6 className="text-white text-truncate">
                    <span className="badge badge-light mr-2">Project:</span>
                    {bug.project}
                  </h6>
                </div>
                <div className="pt-2 text-white">
                  <h6 className="text-white">
                    <u>Description:</u>
                  </h6>{" "}
                  <br />
                  {bug.desc}
                </div>
                {bug.reproSteps === "" ? null : (
                  <div className="pt-3 text-white">
                    <h6 className="text-white">
                      <u>Repro Steps:</u>
                    </h6>{" "}
                    <br />
                    {bug.reproSteps}
                  </div>
                )}
                {/* Notes Section */}
                <div className="notes-wrapper pt-3">
                  <h6 className="text-white">
                    <u>Notes</u>
                  </h6>
                  {bug.notes.length === 0 && (
                    <Message>There are no notes...</Message>
                  )}
                  <ul className="list-group list-group-flush">
                    {bug.notes.map((note) => (
                      <li
                        className="list-group-item bg-dark text-white"
                        key={note._id}
                      >
                        <div className="d-flex justify-content-between">
                          <p>
                            <i>
                              <b>{note.createdAt}</b>
                            </i>
                          </p>
                          <div className="btn-group">
                            <button
                              className="btn btn-link"
                              onClick={() =>
                                removeItemHandler(bug._id, note._id)
                              }
                            >
                              <i
                                className="far fa-trash-alt"
                                style={{ color: "#B13736" }}
                              ></i>
                            </button>
                          </div>
                        </div>
                        <p>{note.comment}</p>
                      </li>
                    ))}
                  </ul>
                  {deleteNoteLoading && <Loader />}
                  {deleteNoteError && (
                    <Message variant="danger">{deleteNoteError}</Message>
                  )}
                  {notesSuccess && (
                    <Message variant="success">Note Added!</Message>
                  )}
                  {notesError && (
                    <Message variant="danger">{notesError}</Message>
                  )}
                  {notesLoading && <Loader />}
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  data-toggle="collapse"
                  data-target="#notes-form"
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
                    <h6 className="text-white">Priority: {bug.priority}</h6>
                  </li>
                  <li className="pt-2">
                    <h6 className="text-white">
                      Severity:{" "}
                      <span
                        className={`badge badge-${
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
                    <h6 className="text-white">
                      Original Estimate: {bug.originalEstimate}
                    </h6>
                  </li>
                  <li className="pt-2">
                    <h6 className="text-white">
                      Hours Spent: {bug.hoursSpent}
                    </h6>
                  </li>
                  <li className="pt-2">
                    <h6 className="text-white">
                      Level of Effort: {bug.levelOfEffort}
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default BugDetailsScreen;
