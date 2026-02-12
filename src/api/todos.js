import supabase from "./supabaseClient";


const todos = async () => {

let { data: todos, error } = await supabase
  .from('todos')
  .select('*')
          
if (error) {
  console.error('Error fetching todos:', error);
}

console.log('Todos fetched:', todos);
}
export default todos;