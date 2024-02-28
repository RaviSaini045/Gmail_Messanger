export const validateForm=(email,password)=>{
    const isEmailValid=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isPasswordValid =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
    if(!isEmailValid)
        return "Email ID is not Valid";
    else if(!isPasswordValid)
        return "Pasword is Not Valid";
    else 
        return null;
}