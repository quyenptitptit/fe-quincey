const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return regex.test(phone);
};

const validateRequiredRegister = (data) => {
  const { email, password, fullname, phonenumber } = data;
  if (!email) return "Email";
  if (!password) return "Password";
  if (!fullname) return "Fullname";
  if (!phonenumber) return "PhoneNumber";
  return "";
};

const validateRequiredLogin = (data) => {
  const { email, password } = data;
  if (!email) return "Email";
  if (!password) return "Password";
  return "";
};

const validatePassword = (password) => {
  if (password?.split("").length >= 6) {
    return 1;
  }
  return 0;
};

export const validateRegister = (data) => {
  if (validateRequiredRegister(data))
    return validateRequiredRegister(data) + " is required";
  if (!validateEmail(data?.email)) return "Email invalid";
  if (!validatePassword(data?.password))
    return "Password must be more than 6 characters long";
  if (!validatePhone(data?.phonenumber)) return "Phone number invalid";
  return "";
};

export const validateLogin = (data) => {
  if (validateRequiredLogin(data))
    return validateRequiredRegister(data) + " is required";
  if (!validateEmail(data?.email)) return "Email invalid";
  if (!validatePassword(data?.password))
    return "Password must be more than 6 characters long";
  return "";
};
