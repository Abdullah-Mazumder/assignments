import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setJobType } from "../features/filterJob/filterJobSlice";

const LeftSideBar = () => {
  const dispatch = useDispatch();

  const setFilterType = (type) => {
    dispatch(setJobType(type));
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              onClick={() => setFilterType("all")}
              className="main-menu menu-active"
              id="lws-alljobs-menu"
            >
              <i className="fa-solid fa-briefcase mr-1"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <Link
                  to="/"
                  onClick={() => setFilterType("internship")}
                  className="sub-menu"
                  id="lws-internship-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF5757] mr-1"></i>
                  Internship
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => setFilterType("full time")}
                  className="sub-menu"
                  id="lws-fulltime-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00] mr-1"></i>
                  Full Time
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => setFilterType("remote")}
                  className="sub-menu"
                  id="lws-remote-menu"
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4] mr-1"></i>
                  Remote
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/jobs/add" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus mr-1"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSideBar;
