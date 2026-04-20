import supabase from "./supabaseClient";
import logIn from "./auth";

const getUserId = async () => {
    const user = await logIn();
    return user ? user.id : null;
}

// add a list to the database, and add the user as a owner of the list
export const addList = async (listName) => {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('list')
    .insert([{ title: listName, owner_id: userId }])
    .select();

  if (error) {
    console.error('Error adding list:', error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error('No list returned after insert');
  }

  console.log(data[0].id);
  
  await addListMember(data[0].id, userId, listName);

  return data;
};

// add a member to a list by list id, user id and list name
export const addListMember = async (listId, userId, listName) => {
  const { data, error } = await supabase
    .from('list_members')
    .insert([
      { list_id: listId, user_id: userId, list_name: listName, isOwner: true }
    ])
    .select();

  if (error) {
    console.error('Error adding list member:', error);
    throw error;
  }

  return data;
};

//add a task to the database by task name, list id and description
export const addTask = async (taskName, listId, description) => {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ title: taskName, list_id: listId, description: description}])
    .select();

  if (error) {
    console.error('Error adding task:', error);
    throw error;
  }
  return data;
};

//update a task's name, description by task id
export const updateTask = async (taskId, taskName, description) => {
  const { data, error } = await supabase
    .from('todos')
    .update({ title: taskName, description: description })
    .eq('id', taskId)
    .select();

  if (error) {
    console.error('Error updating task:', error);
    throw error;
  }
  return data;
};

//update list name by list id
export const updateListName = async (listId, newName) => {
  const { data, error } = await supabase
    .from('list')
    .update({ title: newName })
    .eq('id', listId)
    .select();

  await updateListNameInMembers(listId, newName);

  if (error) {
    console.error('Error updating list name:', error);
    throw error;
  }
  return data;
};  

//update the list name in the list members table by list id
export const updateListNameInMembers = async (listId, newName) => {
  const { data, error } = await supabase
    .from('list_members')
    .update({ list_name: newName })
    .eq('list_id', listId)
    .select();

  if (error) {
    console.error('Error updating list name in members:', error);
    throw error;
  }
  return data;
};