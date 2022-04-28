import React from "react";
import "./HowWeDoWorkSection.scss";
import { BASIC_PROCESS_STEPS } from "../../../utils/tempData";

const HowWeDoWorkSection = () => {
  function renderBasicProcessSteps() {
    return BASIC_PROCESS_STEPS.map((step, idx) => (
      <div className="row mb-4" key={idx}>
        <div className="col-sm-2 d-flex justify-content-center pb-4 pb-sm-0">
          <div className="circle-bg">
            <h1 className="text-center text-primary">{idx + 1}</h1>
          </div>
        </div>
        <div className="col-sm-10">
          <h4>{step.title}</h4>
          <div className="description-label">{step.description}</div>
        </div>
      </div>
    ));
  }

  return (
    <section className="dkHowWeDoWorkSection py-5 bg-dark text-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-lg-6 mb-5 mb-lg-0">
            <div className="fs-2 pb-3">
              Great projects in development are
              <span className="text-primary px-2">hardly, if ever, done</span>
              unplanned.
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              sagittis, quam nec venenatis lobortis, mi risus tempus nulla, sed
              porttitor est nibh at nulla. Praesent placerat enim ut ex
              tincidunt vehicula. Fusce sit amet dui tellus.
            </p>
            <button
              className="btn btn-outline-primary"
              onClick={() => alert("Only for demo purposes")}
            >
              Learn More
            </button>
          </div>
          <div className="col-12 col-lg-6">{renderBasicProcessSteps()}</div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDoWorkSection;
