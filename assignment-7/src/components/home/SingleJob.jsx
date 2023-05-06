import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeJob } from "../../features/deleteJob/deleteJobSlice";

const SingleJob = ({ job }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.deleteJob);
  const { id, title, type, salary, deadline } = job || {};
  let color;
  if (type === "Full Time") color = "#FF8A00";
  if (type === "Internship") color = "#FF5757";
  if (type === "Remote") color = "#56E5C4";
  return (
    <div className="lws-single-job">
      <div className="flex-1 min-w-0">
        <h2 className="lws-title">{title}</h2>
        <div className="job-footers">
          <div className="lws-type">
            <i
              className={`fa-solid fa-stop !text-[${color}] text-lg mr-1.5`}
            ></i>
            {type}
          </div>
          <div className="lws-salary">
            <i className="fa-solid fa-bangladeshi-taka-sign text-slate-400 text-lg mr-1.5"></i>
            BDT {salary}
          </div>
          <div className="lws-deadline">
            <i className="fa-regular fa-calendar text-slate-400 text-lg mr-1.5"></i>
            Closing on {deadline}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
          <Link
            to={`/edit/${id}`}
            type="button"
            className="lws-edit btn btn-primary"
          >
            <i className="fa-solid fa-pen text-gray-300 -ml-1 mr-2"></i>
            Edit
          </Link>
        </span>

        <span className="sm:ml-3">
          <button
            type="button"
            className="lws-delete btn btn-danger"
            disabled={isLoading}
            onClick={() => dispatch(removeJob(id))}
          >
            <i className="fa-solid fa-trash text-gray-300 -ml-1 mr-2"></i>
            Delete
          </button>
        </span>
      </div>
    </div>
  );
};

export default SingleJob;
