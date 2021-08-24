


export const validatePhone = (input) => {
  let emptyField = validateNotEmpty(input);
  if (emptyField.status === false) {
    return emptyField;
  }
  let phoneNumber = /^\d{10}$/;
  if(input.match(phoneNumber))
  {
    return {status: true, text: ""}
  } else {
    return {status: false, text: "phone number is not valid"}
  }
}

export const validateMail = (input) => {
  let emptyField = validateNotEmpty(input);
  if (emptyField.status === false) {
    return emptyField;
  }
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(input.match(mailFormat))
  {
    return {status: true, text: ""}
  } else {
    return {status: false, text: "Email is not valid"}
  }
}

export const validateNotEmpty = (input) => {
  if (input === "") {
    return {status: false, text: "cant be empty"}
  } else {
    return {status: true, text: ""}
  }
}