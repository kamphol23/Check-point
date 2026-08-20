import supabase from "./supabaseClient";
import logIn from "./auth";

const user = await logIn();

export const getGoals = async (id) => {
  let { data: goals, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }

  return goals;
};
