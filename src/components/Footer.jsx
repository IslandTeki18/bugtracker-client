const Footer = () => {
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
