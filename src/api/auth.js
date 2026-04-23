import supabase from "./supabaseClient";

let userData = null;

const logIn = async () => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: "user@hotmail.com",
    password: "User123",
  });
  if (error) {
    console.error("Error logging in:", error);
    return null;
  }

  userData = data.user;
  return data.user;
};

const { data: user } = await supabase.auth.getUser();

export default logIn;
