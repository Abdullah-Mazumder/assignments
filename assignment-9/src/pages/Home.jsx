import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeftSideBar from "../components/LeftSideBar";
import SingleTask from "../components/SingleTask";
import { useGetTasksQuery } from "../features/tasks/tasksAPI";

const Home = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const { searchTerm, checkedProjects } = useSelector((state) => state.filter);

  const filterTasksWithSearchTerm = () => {
    return tasks.filter((task) => {
      return (
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.project.projectName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
  };

  const filterTasksWithCheckBox = (task) => {
    if (checkedProjects.includes(task.project.id)) return true;
    return false;
  };

  return (
    <div className="container relative">
      <LeftSideBar />
      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
            <Link to="/add-task" className="lws-addnew group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 group-hover:text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              <span className="group-hover:text-indigo-500">Add New</span>
            </Link>
          </div>

          {isLoading ? (
            <h1>Loading...</h1>
          ) : isError ? (
            <h1>{error?.message || "Something went wrong!"}</h1>
          ) : (
            <>
              {filterTasksWithSearchTerm()?.filter(filterTasksWithCheckBox)
                .length === 0 ? (
                <h1>No Tasks Found!</h1>
              ) : (
                <div className="lws-task-list">
                  {filterTasksWithSearchTerm()
                    .filter(filterTasksWithCheckBox)
                    .map((task) => (
                      <SingleTask task={task} key={task.id} />
                    ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
