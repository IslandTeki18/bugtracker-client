import { useEffect } from "react";

const ProfileScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card m-3">
              <div className="row no-gutters">
                <div className="col-md-4 d-flex justify-content-center align-self-center">
                  <div
                    className="icon-wrapper d-flex justify-content-center"
                    style={{ backgroundColor: "green" }}
                  >
                    <i className="fas fa-bug icon-font-styles"></i>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      Bug Title {` `}
                      <span className="badge badge-success">Solved</span>
                    </h5>
                    <p className="card-text">
                      This is a short description of the bug that the user will
                      title in this section. This is inform the user what the
                      but is.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card m-3">
              <div className="row no-gutters">
                <div className="col-md-4 d-flex justify-content-center align-self-center">
                  <div
                    className="icon-wrapper d-flex justify-content-center"
                    style={{ backgroundColor: "orange" }}
                  >
                    <i className="fas fa-exclamation-triangle icon-font-styles"></i>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      Bug Title {` `}
                      <span className="badge badge-warning">New Issue</span>
                    </h5>
                    <p className="card-text">
                      This is a short description of the bug that the user will
                      title in this section. This is inform the user what the
                      but is.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
