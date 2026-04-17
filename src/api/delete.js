import supabase from "./supabaseClient";
import logIn from "./auth";

const user = await logIn();

export const deleteListMember = async (listId) => {
  const { data, error } = await supabase
    .from('list_members')
    .delete()
    .select("*")
    .eq('list_id', listId, 'owner_id', user.id);

  
    deleteList(listId); 
    if (error) {
        console.error('Error deleting list member:', error);
        throw error;
    }
    return data;
};

export const deleteList = async (listId) => {
  const { data, error } = await supabase
    .from('list')
    .delete()
    .eq('id', listId);

    if (error) {
        console.error('Error deleting list:', error);
        throw error;
    }
    return data;
};


export const deleteTask = async (todoId) => {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId);

    if (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
    return data;
};