
  import supabase from "./supabaseClient";

const isCompleted = async (todoId, completed) => {

    let { data, error } = await supabase
    return supabase
      .from("todos")
      .update({ completed: completed })
      .eq("id", todoId);

  };

  export default isCompleted;