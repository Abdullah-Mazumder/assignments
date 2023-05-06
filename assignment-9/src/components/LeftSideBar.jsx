/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckedProjects } from "../features/filter/filterSlice";
import { useGetProjectsQuery } from "../features/projects/projectsAPI";
import TeamMembers from "./TeamMembers";

const LeftSideBar = () => {
  const dispatch = useDispatch();
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();
  const { checkedProjects } = useSelector((state) => state.filter);

  useEffect(() => {
    if (projects) {
      dispatch(setCheckedProjects(projects.map((project) => project.id)));
    }
  }, [projects]);

  const handleCheckboxChange = (event) => {
    const projectId = event.target.id;
    const isChecked = event.target.checked;

    if (isChecked) {
      dispatch(setCheckedProjects([...checkedProjects, +projectId]));
    } else {
      dispatch(
        setCheckedProjects(checkedProjects.filter((id) => id != projectId))
      );
    }
  };
  return (
    <div className="sidebar">
      <div>
        <h3 className="text-xl font-bold">Projects</h3>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : isError ? (
          <h1>{error?.message || "Something went wrong!"}</h1>
        ) : (
          <div className="mt-3 space-y-4">
            {projects.map((project) => (
              <div className="checkbox-container" key={project.id}>
                <input
                  type="checkbox"
                  className={project.colorClass}
                  id={project.id}
                  checked={checkedProjects.includes(project.id)}
                  onChange={handleCheckboxChange}
                />
                <p className="label">{project.projectName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <TeamMembers />
    </div>
  );
};

export default LeftSideBar;
