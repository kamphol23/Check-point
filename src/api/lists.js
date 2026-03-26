import supabase from "./supabaseClient";


export const getLists = async () => {
  const { data: list, error } = await supabase
    .from('list')
    .select('id, title');

  if (error) throw error;

  console.log("lists", list);
  return list;
};

