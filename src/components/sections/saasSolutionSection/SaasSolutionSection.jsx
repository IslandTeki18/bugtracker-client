import React from "react";
import { APP_FEATURES } from "../../../utils/tempData";

const SaasSolutionSection = (props) => {
  function renderFeatureCards() {
    return APP_FEATURES.map((feature, idx) => (
      <div
        className="col-12 col-sm-6 col-lg-3 pt-3 pt-lg-0 text-dark"
        key={idx}
      >
        <div className="card text-center p-2" style={{ height: "230px" }}>
          <i className={feature.icon} style={{ fontSize: "30px" }} />
          <div className="fs-5 fw-bold py-3">{feature.title}</div>
          <p className="fst-normal">{feature.description}</p>
        </div>
      </div>
    ));
  }
  return (
    <section className="dkSaasSolutionSection bg-dark text-light py-5">
      <div className="container py-3">
        <div className="row">
          <div className="col-12 col-md-6">
            <p className="fs-2">
              Saas Solution for{" "}
              <span className="text-primary">developing your projects</span>{" "}
              with precision and effectiveness.
            </p>
          </div>
          <div className="col-12 col-md-6">
            Building projects is always fun and challenging because you can
            exercise your creativity and learn through the building process but
            often our execution lacks structure and design leading to many head
            pounding bugs and road bumps. Bug Tracker is here to help you
            minimize damage and bugs while productively getting closer to
            project launch.
          </div>
        </div>
        <div className="row py-3">{renderFeatureCards()}</div>
      </div>
    </section>
  );
};

export default SaasSolutionSection;
