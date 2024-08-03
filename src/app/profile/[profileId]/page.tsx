import React from "react";

const UserProfile = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <p>{`${params.profileId}'s Profile Page`}</p>
    </div>
  );
};

export default UserProfile;
