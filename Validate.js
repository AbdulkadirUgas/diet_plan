module.exports.validateRegisterDate = (fullname,age,height,weight,gender,email,password) =>{
    const errors = {};
    if(fullname === ''){
        errors.error = 'Full name is required'
    }
    else if(age === ''){
        errors.error = 'Age is required'
    }
    else if(age < 15){
        errors.error = 'Age must be greater than 15'
    }
    else if(height === ''){
        errors.error = 'Height is required'
    }
    else if(height < 100){
        errors.error = 'Height must be greater than 100cm'
    }
    else if(weight === ''){
        errors.error = 'Weight is required'
    }
    else if(weight < 40){
        errors.error = 'Weight must be greater than 40kg'
    }
    else if(gender === ''){
        errors.error = 'Select gender'
    }
    else if(email === ''){
        errors.error = 'Email is required'
    }
    else if(!validateEmail(email)) errors.error = 'Invalid email'
    
    else if(password === ''){
        errors.error = "password is required"
    }
    return {
        errors,
        valid:Object.keys(errors).length < 1
    }
}
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};