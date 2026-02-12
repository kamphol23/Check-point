import supabase from "./supabaseClient";

const listsByUserId = async () => {
let { data: list, error } = await supabase
  .from('list')
.select('*')


  if (error) {
    console.error('Error fetching lists:', error);
    return null;
  }

 console.log('Lists fetched:', list);
return list
}

export default listsByUserId;