import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listBugDetails } from "../actions/bugActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const BugDetailsScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const bugId = match.params.id;
  const bugDetails = useSelector((state) => state.bugDetails);
  const { loading, error, bug } = bugDetails;
  useEffect(() => {});
  useEffect(() => {
    // on page load, set scroll to top of screen
    window.scrollTo(0, 0);
    dispatch(listBugDetails(bugId));
  }, [dispatch, bugId]);
  return (
    <>
      <section className="py-5" id="bug-details">
        {loading && <Loader /> ? (
          error && <Message>{error}</Message>
        ) : (
          <div className="container">
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
                  <h6 className="text-white mr-5">
                    Assigned to: {bug.assignmentTo}
                  </h6>
                  <h6 className="text-white mr-5">Type: {bug.type}</h6>
                  <h6 className="text-white">Project: {bug.project}</h6>
                </div>
                <p className="pt-2 text-white">{bug.desc}</p>
                <p className="pt-2 text-white">Description: {bug.repoSteps}</p>
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
