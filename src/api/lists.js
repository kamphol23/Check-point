import supabase from "./supabaseClient";


export const getLists = async () => {
  const { data: list, error } = await supabase
    .from('list_members')
    .select('user_id, list_name, list_id');

  if (error) throw error;

  console.log("lists", list);
  return list;
};

