import React from "react";

const DemoFooter = () => {
  return (
    <footer className="w-100 py-4 flex-shrink-0 bg-dark">
      <div className="container py-4">
        <div className="row gy-4 gx-0 gx-md-5">
          <div className="col-lg-4 col-md-6">
            <h5 className="h1 text-light">Bug Tracker.</h5>
            <p className="small text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <p className="small text-muted mb-0">
              &copy; Copyrights. All rights reserved.{" "}
              <a className="text-primary" href="https://landonmckell.com">
                landonmckell.com
              </a>
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Quick links</h5>
            <ul className="list-unstyled text-muted">
              <li>
                <a className="text-decoration-none text-light" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-light" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-light" href="#">
                  Services
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-light" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Quick links</h5>
            <ul className="list-unstyled text-muted">
              <li>
                <a className="text-decoration-none text-light" href="#">
                  Prices
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-light" href="#">
                  Demo
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-light" href="#">
                  Get started
                </a>
              </li>
              <li>
                <a className="text-decoration-none text-light" href="#">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">Newsletter</h5>
            <p className="small text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <form action="#">
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-primary"
                  id="button-addon2"
                  type="button"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DemoFooter;
