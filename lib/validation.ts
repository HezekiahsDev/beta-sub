export type LoginValues = {
  username: string;
  password: string;
};

export type SignUpValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
};

export function validateLogin(values: LoginValues) {
  const errors: Partial<Record<keyof LoginValues, string>> = {};

  if (!values.username.trim()) {
    errors.username = "Username is required.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function validateSignUp(values: SignUpValues) {
  const errors: Partial<Record<keyof SignUpValues, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const digitsOnlyPhone = values.phone.replace(/\D/g, "");

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!digitsOnlyPhone) {
    errors.phone = "Mobile number is required.";
  } else if (digitsOnlyPhone.length < 10) {
    errors.phone = "Mobile number must be at least 10 digits.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.acceptedTerms) {
    errors.acceptedTerms = "You must accept terms to continue.";
  }

  return errors;
}

export function validatePin(createPin: string, confirmPin: string) {
  if (!/^\d{4}$/.test(createPin)) {
    return "Create PIN must be exactly 4 digits.";
  }

  if (!/^\d{4}$/.test(confirmPin)) {
    return "Confirm PIN must be exactly 4 digits.";
  }

  if (createPin !== confirmPin) {
    return "PIN values must match.";
  }

  return "";
}
