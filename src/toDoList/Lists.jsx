import ListDisplay from "../components/ListDisplay";
import { useEffect, useState } from "react";

import { getMemberLists } from "../api/lists";

function Lists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const data = await getMemberLists();
      setLists(data);
    };

    fetchLists();
  }, []);
  const ownerLists = lists.filter((list) => list.isOwner === true);
  const memberLists = lists.filter((list) => list.isOwner === false);
  return (
    <div>
      <h1>Lists</h1>
      <h2>Owner of the lists</h2>
      <ListDisplay lists={ownerLists} />
      <h2>Member of the lists</h2>
      <ListDisplay lists={memberLists} />
    </div>
  );
}

export default Lists;
