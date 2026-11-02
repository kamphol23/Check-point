import supabase from "./supabaseClient";
import logIn from "./auth";

export const getRewards = async (listId) => {
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .eq("belong_to", listId);

  if (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
  return data;
};
