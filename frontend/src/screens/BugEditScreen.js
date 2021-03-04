import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateBug, listBugDetails } from "../actions/bugActions";
import { useDispatch, useSelector } from "react-redux";
import { BUG_UPDATE_RESET } from "../constants/bugConstants";

const BugEditScreen = ({ match, history }) => {
  const bugId = match.params.id;
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [type, setType] = useState("");
  const [reproSteps, setReproSteps] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [assignmentTo, setAssignmentTo] = useState("");
  const [priority, setPriority] = useState(0);
  const [severity, setSeverity] = useState(0);
  const [originalEstimate, setOriginalEstimate] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [hoursSpent, setHoursSpent] = useState(0);
  const [levelOfEffort, setLevelOfEffort] = useState(0);
  const priorityRange = [1, 2, 3, 4, 5];
  const originalEstimateRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const remainingRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const hoursSpentRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const levelOfEffortRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dispatch = useDispatch();

  const bugDetails = useSelector((state) => state.bugDetails);
  const { loading, error, bug } = bugDetails;

  const bugUpdate = useSelector((state) => state.bugUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = bugUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: BUG_UPDATE_RESET });
      history.push(`/bug/${bugId}`);
    } else {
      if (!bug.title || bug._id !== bugId) {
        dispatch(listBugDetails(bugId));
      } else {
        setTitle(bug.title);
        setProject(bug.project);
        setType(bug.type);
        setReproSteps(bug.reproSteps);
        setDesc(bug.desc);
        setStatus(bug.status);
        setAssignmentTo(bug.assignmentTo);
        setPriority(bug.priority);
        setSeverity(bug.severity);
        setOriginalEstimate(bug.originalEstimate);
        setRemaining(bug.remaining);
        setHoursSpent(bug.hoursSpent);
        setLevelOfEffort(bug.levelOfEffort);
      }
    }
  }, [dispatch, bugId, updateSuccess, history, bug]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBug({
        _id: bugId,
        title,
        project,
        type,
        reproSteps,
        desc,
        status,
        assignmentTo,
        priority,
        severity,
        originalEstimate,
        remaining,
        hoursSpent,
        levelOfEffort,
      })
    );
  };
  return (
    <>
      <section className="py-3">
        <div className="container">
          <div className="row">
            {updateLoading && <Loader />}
            {updateError && <Message variant="danger">{updateError}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                <div className="col-md-8 text-white">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="titleInputField" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="titleInputField"
                        placeholder="Example Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="projectInputField" className="form-label">
                        Project
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectInputField"
                        placeholder="Example Project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="typeInputField"
                        className="form-label pr-2"
                      >
                        Type
                      </label>
                      <select
                        id="typeInputField"
                        className="form-select mr-1"
                        aria-label="Default select example"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option defaultValue>Select Type</option>
                        <option value="Bug">Bug</option>
                        <option value="Issue">Issue</option>
                        <option value="Design">Design</option>
                        <option value="Test Case">Test Case</option>
                      </select>
                      <label
                        htmlFor="statusInputField"
                        className="form-label pr-2"
                      >
                        Status
                      </label>
                      <select
                        id="statusInputField"
                        className="form-select mr-1"
                        aria-label="Default select example"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option defaultValue>Select Status</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                        <option value="Active">Active</option>
                        <option value="New">New</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="repoStepsInputField"
                        className="form-label"
                      >
                        Assigned To
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="repoStepsInputField"
                        placeholder="Assigned To..."
                        value={assignmentTo}
                        onChange={(e) => setAssignmentTo(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="reproStepsInputField"
                        className="form-label"
                      >
                        Repo Steps
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reproStepsInputField"
                        placeholder="Step1, Step2, Step3, Step4..."
                        value={reproSteps}
                        onChange={(e) => setReproSteps(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="descriptionTextArea"
                        className="form-label"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="descriptionTextArea"
                        rows="5"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="col-md-4 text-white pt-4">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="prioritySelectionField"
                        className="form-label pr-2"
                      >
                        Priority
                      </label>
                      <select
                        id="prioritySelectionField"
                        className="form-select mr-1"
                        aria-label="Priority Selection Field"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option defaultValue>Select Priority Level</option>
                        {priorityRange.map((x, idx) => (
                          <option key={idx} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="severitySelectionField"
                        className="form-label pr-2"
                      >
                        Severity
                      </label>
                      <select
                        id="severitySelectionField"
                        className="form-select mr-1"
                        aria-label="Severity Selection Field"
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                      >
                        <option defaultValue>Select Severity</option>
                        <option value="1 - Critical">1 - Critical</option>
                        <option value="2 - High">2 - High</option>
                        <option value="3 - Medium">3 - Medium</option>
                        <option value="4 - Low">4 - Low</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="originalEstimateSelectionField"
                        className="form-label pr-2"
                      >
                        Original Estimate
                      </label>
                      <select
                        id="originalEstimateSelectionField"
                        className="form-select mr-1"
                        aria-label="Original Estimate Selection Field"
                        value={originalEstimate}
                        onChange={(e) => setOriginalEstimate(e.target.value)}
                      >
                        <option defaultValue>
                          Select Original Estimate Time
                        </option>
                        {originalEstimateRange.map((x, idx) => (
                          <option key={idx} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="hoursSpentSelectionField"
                        className="form-label pr-2"
                      >
                        Hours Spent
                      </label>
                      <select
                        id="hoursSpentSelectionField"
                        className="form-select mr-1"
                        aria-label="Remaining Selection Field"
                        value={hoursSpent}
                        onChange={(e) => setHoursSpent(e.target.value)}
                      >
                        <option defaultValue>Select Hours Spent</option>
                        {hoursSpentRange.map((x, idx) => (
                          <option key={idx} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="remainingSelectionField"
                        className="form-label pr-2"
                      >
                        Remaining
                      </label>
                      <select
                        id="remainingSelectionField"
                        className="form-select mr-1"
                        aria-label="Remaining Selection Field"
                        value={remaining}
                        onChange={(e) => setRemaining(e.target.value)}
                      >
                        <option defaultValue>Select Remaining Time</option>
                        {remainingRange.map((x, idx) => (
                          <option key={idx} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="levelOfEffortSelectionField"
                        className="form-label pr-2"
                      >
                        Level of Effort
                      </label>
                      <select
                        id="levelOfEffortSelectionField"
                        className="form-select mr-1"
                        aria-label="Level of Effort Selection Field"
                        value={levelOfEffort}
                        onChange={(e) => setLevelOfEffort(e.target.value)}
                      >
                        <option defaultValue>Select Level of Effort</option>
                        {levelOfEffortRange.map((x, idx) => (
                          <option key={idx} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary btn-block"
                        onClick={submitHandler}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BugEditScreen;
