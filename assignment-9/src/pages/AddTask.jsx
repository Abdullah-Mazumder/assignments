/* eslint-disable eqeqeq */
import { useGetTeamMembersQuery } from "../features/teamMembers/teamMembersAPI";
import { useGetProjectsQuery } from "../features/projects/projectsAPI";
import { useEffect, useState } from "react";
import { useAddTaskMutation } from "../features/tasks/tasksAPI";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const {
    data: teamMembers,
    isLoading: isTeamMembersLoading,
    isError: isTeamMembersError,
  } = useGetTeamMembersQuery();

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery();

  const [addTask, { isSuccess }] = useAddTaskMutation();

  const [taskName, setTaskName] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [project, setProject] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const teamMemberInfo = teamMembers.find(
      (member) => member.id == teamMember
    );
    const projectInfo = projects.find((p) => p.id == project);

    addTask({
      taskName,
      teamMember: teamMemberInfo,
      project: projectInfo,
      deadline: date,
      status: "pending",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {isTeamMembersLoading || isProjectsLoading ? (
            <h1>Loading...</h1>
          ) : isTeamMembersError || isProjectsError ? (
            <h1>Something went wrong!</h1>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  id="lws-taskName"
                  required
                  placeholder="Implement RTK Query"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>

              <div className="fieldContainer">
                <label>Assign To</label>
                <select
                  name="teamMember"
                  id="lws-teamMember"
                  required
                  value={teamMember}
                  onChange={(e) => setTeamMember(e.target.value)}
                >
                  <option value="" hidden>
                    Select Team Member
                  </option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select
                  id="lws-projectName"
                  name="projectName"
                  required
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option value="" hidden>
                    Select Project
                  </option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  id="lws-deadline"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="text-right">
                <button type="submit" className="lws-submit">
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddTask;
