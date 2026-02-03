import supabase from './supabaseClient';


let userData = null

const logIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@hotmail.com',
  password: 'User123'
})
    if (error) {
        console.error('Error logging in:', error);
        return null;
    }
    console.log('User logged in:', data.user);
    userData = data.user;
    return data.user;
}





export default logIn;