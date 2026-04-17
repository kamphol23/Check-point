import supabase from "./supabaseClient";
import logIn from "./auth";

const getUserId = async () => {
    const user = await logIn();
    return user ? user.id : null;
}

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