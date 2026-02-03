import supabase from "./supabaseClient";
import logIn from "./auth";
import { data } from "react-router-dom";


const listsByUserId = async () => {
let { data: list, error } = await supabase
  .from('list')
  .select('created_by')
    
  .eq('created_by', logIn().id);

  if (error) {
    console.error('Error fetching lists:', error);
    return null;
  }
  console.log('Lists fetched:', data);
  
    return data;
}

export default listsByUserId;