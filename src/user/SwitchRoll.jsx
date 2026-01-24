import react from "react";

function SwitchRoll({ userRoll, setUserRoll }) {

  return (
    <div>
        <button
            className="switch-roll"
            onClick={() => {
                setUserRoll({
                    ...userRoll,
                    userRoll: userRoll.userRoll === "admin" ? "user" : "admin",
                });
            }}
        >
            Switch to {userRoll.userRoll === "admin" ? "User" : "Admin"}
        </button>
    </div>
  );
}
export default SwitchRoll;