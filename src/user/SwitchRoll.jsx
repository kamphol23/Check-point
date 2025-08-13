import react from "react";

function SwitchRoll({ userState, setUserState }) {
 
  return (
    <div>
        <button
            className="switch-roll"
            onClick={() => {
                setUserState({
                    ...userState,
                    userRoll: userState.userRoll === "admin" ? "user" : "admin",
                });
            }}
        >
            Switch to {userState.userRoll === "admin" ? "User" : "Admin"}
        </button>
    </div>
  );
}
export default SwitchRoll;