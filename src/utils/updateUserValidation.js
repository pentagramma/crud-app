
export const checkFormData = (formData,user)=>{
    const errors = {}
    const nameValidator = /^([a-zA-Z0-9 _-]+)$/
    const emailValidator = /\S+@\S+\.\S+/

    if(!formData.firstName){
        formData.firstName = user.firstName
    }
    else if(!nameValidator.test(formData.firstName)){
        errors.firstName = "First name cannot be alphanumeric"
    }

    if(!formData.lastName){
        formData.lastName = user.lastName
    }
    else if(!nameValidator.test(formData.lastName)){
        errors.lastName = "Last name cannot be alphanumeric"
    }

    if(!formData.email){
        formData.email = user.email
    }
    else if(!emailValidator.test(formData.email)){
        errors.email = "Email must contain @"
    }

    if(!formData.companyName){
        formData.companyName = user.companyName
    }
    if(!formData.designation){
        formData.designation = user.designation
    }
   
    
    return errors
}