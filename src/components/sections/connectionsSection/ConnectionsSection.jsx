import React from "react";
import "./ConnectionsSection.scss";

const ConnectionsSection = () => {
  return (
    <section className="dkConnectionsSection py-5">
      <div className="container py-3">
        <div className="row">
          <div className="col-12 col-lg-4 pb-3 pb-lg-0">
            <div className="fs-2 pb-3">
              Simple Solutions for <span className="text-primary">Complex</span>{" "}
              Projects
            </div>
            <div className="fs-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <img
              className="col-image"
              src="https://images.unsplash.com/photo-1618385455730-2571c38966b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="placeholder"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectionsSection;
