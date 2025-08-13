import react from "react";

function User ({ userState, setUserState }) {

  return (
    <div className="user">
        <div className="avatar"></div>
        <h1>{userState.name}</h1>
        <h3>{userState.userRoll}</h3>
        
    </div> 
  );
}
export default User;