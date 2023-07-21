export const validateForm = (formData) => {
    const firstNameMaxLength = 25;
    const surnameMaxLength = 25;
    const emailMaxLength = 50;
  
    if (formData.firstName.length > firstNameMaxLength) {
      return false;
    }
  
    if (formData.surname.length > surnameMaxLength) {
      return false;
    }

    if(isDateInFuture(formData.dob)){
      return false;
    }
    
    if (formData.email.length > emailMaxLength) {
      return false;
    }
    return true;
  };
  const isDateInFuture = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    return selectedDate > today;
  };