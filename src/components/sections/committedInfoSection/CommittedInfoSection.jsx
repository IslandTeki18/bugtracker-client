import React from "react";
import "./CommittedInfoSection.scss";

const CommittedInfoSection = (props) => {
  return (
    <section className="dkCommittedInfoSection py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="fs-1 pb-3">
              Committed to <span className="text-primary">developers</span> in
              soving bugs and finishing their projects.
            </div>
            <p className="fs-5">
              This is Bug Tracker, a Developer Friendly build tool.
            </p>
            <p className="fs-5">
              Helping you maximize your development process and keep track of
              task, bugs, and goals.
            </p>
            <div className="button-wrapper d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary me-5"
                onClick={() => alert("Only for demo purposes")}
              >
                Key Features
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => alert("Only for demo purposes")}
              >
                How we work?
              </button>
            </div>
          </div>
          <div className="col-12 mt-3 mt-lg-0 col-lg-6">
            <img
              className="image-header"
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt="placeholder"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommittedInfoSection;
