import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeTop from "../home/HomeTop";
import SingleJob from "../home/SingleJob";
import { fetchJobs } from "../../features/jobs/jobsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, isError, error } = useSelector(
    (state) => state.jobs
  );
  const { searchTerm, sortingOption, jobType } = useSelector(
    (state) => state.filterType
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filterWithSearchTerm = () => {
    return jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterWithSalary = (job1, job2) => {
    if (sortingOption === "low-to-high") {
      return +job1.salary - job2.salary;
    }

    if (sortingOption === "high-to-low") {
      return +job2.salary - job1.salary;
    }

    return true;
  };

  const filterWithJobType = (job) => {
    if (jobType === "internship") {
      return job.type.toLowerCase() === "internship";
    }
    if (jobType === "full time") {
      return job.type.toLowerCase() === "full time";
    }
    if (jobType === "remote") {
      return job.type.toLowerCase() === "remote";
    }
    return job;
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  if (!isLoading && isError) {
    content = <h1>{error}</h1>;
  }

  if (
    !isError &&
    !isLoading &&
    filterWithSearchTerm().sort(filterWithSalary).filter(filterWithJobType)
      .length === 0
  ) {
    content = <h1>No Jobs Found!</h1>;
  }

  if (
    !isError &&
    !isLoading &&
    filterWithSearchTerm().sort(filterWithSalary).filter(filterWithJobType)
      .length > 0
  ) {
    content = filterWithSearchTerm()
      .sort(filterWithSalary)
      .filter(filterWithJobType)
      .map((job) => <SingleJob key={job.id} job={job} />);
  }

  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
      <div className="lg:pl-[14rem]  mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <HomeTop />
          <div className="jobs-list">{content}</div>
        </main>
      </div>
    </div>
  );
};

export default Home;
