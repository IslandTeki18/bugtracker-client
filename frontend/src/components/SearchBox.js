import { useState } from "react";

const SearchBox = ({ history }) => {
  const [keyword, setKeyWord] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="form-inline my-2 my-lg-0">
      <input
        type="search"
        name="q"
        placeholder="Search Items..."
        onChange={(e) => setKeyWord(e.target.value)}
        className="form-control mr-sm-2"
        aria-label="searchProduct"
      />
      <button
        type="submit"
        className="btn btn-outline-success my-2 my-sm-0 btn-sm"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
