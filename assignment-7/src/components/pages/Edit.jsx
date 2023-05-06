import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  getSingleJob,
  setIsSuccess,
  updatedJob,
} from "../../features/editJob/editJobSlice";
import { setJobType as changleJobType } from "../../features/filterJob/filterJobSlice";

const Edit = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, error, isSuccess, job } = useSelector(
    (state) => state.editJob
  );

  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobDeadLine, setJobDeadLine] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!jobTitle || !jobType || !jobSalary || !jobDeadLine) {
      alert("Please Provide Valid Information!");
      return;
    }

    dispatch(
      updatedJob({
        id: jobId,
        data: {
          title: jobTitle,
          type: jobType,
          salary: jobSalary,
          deadline: jobDeadLine,
        },
      })
    );
  };

  useEffect(() => {
    if (job.id) {
      const { title, type, salary, deadline } = job;

      setJobTitle(title);
      setJobDeadLine(deadline);
      setJobSalary(salary);
      setJobType(type);
    }
  }, [job]);

  useEffect(() => {
    dispatch(getSingleJob(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (isSuccess) {
      setJobTitle("");
      setJobDeadLine("");
      setJobType("");
      setJobSalary("");

      navigate("/");
      dispatch(changleJobType("all"));
      dispatch(setIsSuccess(false));
    }
  }, [isSuccess, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      alert(error);
      dispatch(clearError());
    }
  }, [isError, error, dispatch]);
  return (
    <>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8" key={job?.id}>
        <div className="lg:pl-[14rem] mt-[5.8125rem]">
          <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
            <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

            <div className="max-w-3xl mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="fieldContainer">
                  <label
                    htmlFor="lws-JobTitle"
                    className="text-sm font-medium text-slate-300"
                  >
                    Job Title
                  </label>
                  <select
                    id="lws-JobTitle"
                    value={jobTitle}
                    name="lwsJobTitle"
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  >
                    <option value="">Select Job</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Software Developer">
                      Software Developer
                    </option>
                    <option value="Full Stack Developer">
                      Full Stack Developer
                    </option>
                    <option value="MERN Stack Developer">
                      MERN Stack Developer
                    </option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Social Media Manager">
                      Social Media Manager
                    </option>
                    <option value="Senior Executive">Senior Executive</option>
                    <option value="Junior Executive">Junior Executive</option>
                    <option value="Android App Developer">
                      Android App Developer
                    </option>
                    <option value="IOS App Developer">IOS App Developer</option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                  </select>
                </div>

                <div className="fieldContainer">
                  <label htmlFor="lws-JobType">Job Type</label>
                  <select
                    id="lws-JobType"
                    name="lwsJobType"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div className="fieldContainer">
                  <label htmlFor="lws-JobSalary">Salary</label>
                  <div className="flex border rounded-md shadow-sm border-slate-600">
                    <span className="input-tag">BDT</span>
                    <input
                      type="number"
                      name="lwsJobSalary"
                      id="lws-JobSalary"
                      required
                      className="!rounded-l-none !border-0"
                      placeholder="20,00,000"
                      value={jobSalary}
                      onChange={(e) => setJobSalary(e.target.value)}
                    />
                  </div>
                </div>

                <div className="fieldContainer">
                  <label htmlFor="lws-JobDeadline">Deadline</label>
                  <input
                    type="date"
                    name="lwsJobDeadline"
                    id="lws-JobDeadline"
                    value={jobDeadLine}
                    onChange={(e) => setJobDeadLine(e.target.value)}
                    required
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    id="lws-submit"
                    className="cursor-pointer btn btn-primary w-fit"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Edit;
