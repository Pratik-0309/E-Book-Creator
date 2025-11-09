export const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email) return "Email is Required"
    if(!emailRegex.text(email)){
        return "please enter a valid email address"
    }
    return "";
}

export const validatePassword = (password) =>{
    if(!password) return "Password is required";
    if(password.length < 6) return "password must be at least 6 character";
    return "";
};