import supabase from "./supabaseClient";

export const getActivity = async (listId) => {
  const { data } = await supabase
    .from("activity_log")
    .select("*")
    .order("create_at", { ascending: false });

  return data;
};
