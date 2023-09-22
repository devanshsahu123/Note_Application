const isValidPassword = (password)=>{
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
 return passwordRegex.test(password)
}

export default isValidPassword;