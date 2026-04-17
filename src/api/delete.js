import supabase from "./supabaseClient";
import logIn from "./auth";
import { getListMembers } from "./lists";


//delete all the members of a list by list id
export const deleteListMembers = async (listId) => {
  const { data, error } = await supabase
    .from('list_members')
    .delete()
    .eq('list_id', listId);

    if (error) {
        console.error('Error deleting list members:', error);
        throw error;
    }
    return data;
};

// delete a list by id
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

// delete a task by id
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

// delete all tasks in a list
export const deleteAllTasks = async (listId) => {
  const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('list_id', listId);

    if (error) {
        console.error('Error deleting tasks:', error);
        throw error;
    }
    return data;
};