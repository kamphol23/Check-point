import supabase from "./supabaseClient";
import logIn from "./auth";

const user = await logIn();

// fetch the list that the user is a member of, and return the list name and list id
export const getMemberLists = async () => {
  const { data: list, error } = await supabase
    .from('list_members')
    .select('list_id, list_name, isOwner')
    .eq('user_id', user.id);
   
  if (error) throw error;
  return list;
};

// fetch all the members of a list by list id
export const getListMembers = async (listId) => {
  const { data: members, error } = await supabase
    .from('list_members')
    .select('user_id, list_name, list_id')
    .eq('list_id', listId);
    
  if (error) throw error;

  console.log("members", members);
  return members;
};

