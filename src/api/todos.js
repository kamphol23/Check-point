import supabase from "./supabaseClient";


const getTodos = async (id) => {

let { data: todos, error } = await supabase

  .from('todos')
  .select('*')
  .eq("list_id", id); 

if (error) {
  console.error('Error fetching todos:', error);
}

return todos;

}

export default getTodos;