import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchTerm } from "../features/filter/filterSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.filter);
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src="/images/logo.svg" alt="LWS" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
