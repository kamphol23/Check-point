import react from "react";
import SwitchRoll from "./SwitchRoll";


function User ({ userRoll, setUserRoll }) {

const [listOfDashboards, setListOfDashboards] = react.useState([]);

  return (
    <div className="user">
        <div className="avatar"></div>
        <h1>{userRoll.name}</h1>
        <h3>{userRoll.userRoll}</h3>
        <SwitchRoll userRoll={userRoll} setUserRoll={setUserRoll} />
    </div> 
  );
}
export default User;