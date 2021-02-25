const Loader = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border d-block mx-auto"
          style={{ width: "100px", height: "100px" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
