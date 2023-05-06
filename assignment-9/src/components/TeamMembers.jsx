/* eslint-disable jsx-a11y/alt-text */
import { useGetTeamMembersQuery } from "../features/teamMembers/teamMembersAPI";

const TeamMembers = () => {
  const {
    data: teamMembers,
    isError,
    isLoading,
    error,
  } = useGetTeamMembersQuery();
  return (
    <>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Team Members</h3>
        {isLoading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            {isError ? (
              <h1>{error?.message || "Something went wrong!"}</h1>
            ) : (
              <div className="mt-3 space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="checkbox-container">
                    <img src={member.avatar} className="team-avater" />
                    <p className="label">{member.name}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TeamMembers;
