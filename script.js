//Getting all necessary form or DOM elements//
const form = document.getElementById("registrationForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//Getting all the error message elements//
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const successMessage = document.getElementById("successMessage");

console.log("All the elements from the page retrieved:)");

//When the page loads, check if there's a username saved"//
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, checking for saved username...");

  //Check if there's a saved username//
  const savedUsername = localStorage.getItem("username");


  //If there is a username, put it in the form//
  if (savedUsername) {
    console.log(`Found saved username: ${savedUsername}`);
    username.value = savedUsername;
    validateUsername ();
  } else {
    console.log("No saved username found");
  }
});

// Add event listeners to check inputs as the user types//
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

console.log("Added all the input listeners");


// When the form is submitted//
form.addEventListener('submit', function(event) {
  // Prevent the form from actually submitting to a server//
  event.preventDefault();
  console.log("Form was submitted");

//Check all fields//
  const isUsernameOk = validateUsername();
  const isEmailOk = validateEmail();
  const isPasswordOk = validatePassword();
  const isConfirmPasswordOk = validateConfirmPassword();


  //log to see results//
  console.log("Username valid: " + (isUsernameValid ? "yes" : "no"));
  console.log("Email valid: " + (isEmailValid ? "yes" : "no"));
  console.log("Password valid: " + (isPasswordValid ? "yes" : "no"));
  console.log("Confirm password valid: " + (isConfirmPasswordValid ? "yes" : "no"));


  // If all fields are valid//
  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    console.log("All fields are valid");

 // Save the username//
 localStorage.setItem('username', usernameInput.value);
 console.log("Saved username: " + usernameInput.value);


// Show success message//
    successMessageBox.textContent = 'Registration successful';
    successMessageBox.style.display = 'block';
    console.log("Showing success message");
    
    // Hide success message after 3 seconds//
    setTimeout(function() {
      successMessageBox.style.display = 'none';
      console.log("Hiding success message");
    }, 3000);
    
    // Clear the form except username//
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    console.log("Cleared the form except username");
    
    // Remove validation styling//
    email.classList.remove("valid");
    password.classList.remove("valid");
    confirmPassword.classList.remove("valid");
    
    // Clear all error messages//
    clearAllErrors();
  } else {
    console.log("Some fields are not valid");
    
    // Focus on the first invalid field
    if (!isUsernameValid) {
      username.focus();
      console.log("Focusing on username field");
    } else if (!isEmailValid) {
      email.focus();
      console.log("Focusing on email field");
    } else if (!isPasswordValid) {
      password.focus();
      console.log("Focusing on password field");
    } else {
      confirmPassword.focus();
      console.log("Focusing on confirm password field");
    }
  }
});

// Function to validate username using constraint validation api//
function validateUsername() {
  console.log("Validating username");
  
  // Clear the error message
  usernameError.textContent = "";
  
  // Get the username value and remove spaces at beginning and end//
  const value = username.value.trim();
  
  // Check for validity using the constraint validation api//
  if (username.validity.valueMissing) {
    usernameError.textContent = "Username is required";
    username.classList.remove("valid");
    console.log("Username is empty");
    return false;
  }
  
  // Check if it's at least 3 characters//
  if (username.validity.tooShort) {
    usernameError.textContent = "Username must be at least 3 characters";
    username.classList.remove("valid");
    console.log("Username is too short: " + value.length + " characters");
    return false;
  }
  
  // If we got here, username is valid//
  username.classList.add("valid");
  console.log("Username is valid");
  return true;
}

// Function to validate email using constraint validation api//
function validateEmail() {
  console.log("Validating email");
  
  // Clear the error message
  emailError.textContent = "";
  
  // Check for validity using the constraint validation api//
  if (email.validity.valueMissing) {
    emailError.textContent = "Email is required";
    email.classList.remove("valid");
    console.log("Email is empty");
    return false;
  }
  
  
  if (!email.validity.typeMismatch) {
    emailError.textContent = "Please enter a valid email address";
    email.classList.remove("valid");
    console.log("Email is not valid format: " + email.value);
    return false;
  }
  
  // If we got here, email is valid//
  email.classList.add("valid");
  console.log("Email is valid");
  return true;
}

// Function to validate password using constraint validation api//
function validatePassword() {
  console.log("Validating password");
  
  // Clear the error message//
  passwordError.textContent = "";
  
  // Get the password//
  const password = passwordInput.value;
  
  // Check for validity using the constraint validation api//
  if (password.validity.valueMissing) {
    passwordError.textContent = "Password is required";
    password.classList.remove("valid");
    console.log("Password is empty");
    return false;
  }
  
  // Check if it's at least 8 characters
  if (password.validity.tooShort) {
    passwordError.textContent = "Password must be at least 8 characters";
    password.classList.remove("valid");
    console.log("Password is too short: " + password.value.length + " characters");
    return false;
  }
  

  if (password.validity.patternMismatch) {
    // need to determine which part of the pattern is missing//
    const hasUppercase = /[A-Z]/.test(password.value);
    const hasLowercase = /[a-z]/.test(password.value);
    const hasNumber = /[0-9]/.test(password.value);

    if (!hasUppercase) {
      passwordError.textContent = "Password must have at least one uppercase letter";
  } else if (!hasLowercase) {
    passwordError.textContent = "Password must have at least one lowercase letter";
  } else if (!hasNumber) {
    passwordError.textContent = "Password must have at least one number";
  } else {
    passwordError.textContent = "Password  must meet the required pattern";
  }
    passwored.classList.remove("valid");
    console.log("Password pattern mismatch");
    return false;
  }
  // if here, password is valid//
  password.classList.add("valid");
  console.log("Password is valid");
  return true;
}

// Function to validate confirm password//
function validateConfirmPassword() {
  console.log("Validating confirm password");

  //Clear the error message//
  confirmPasswordError.textContent = "";

  //check for validity using the constraint validation api//
  if (confirmPassword.validity.valueMissing) {
    confirmPasswordError.textContent = "Please confirm your password";
    confirmPasswordError.classList.remove("valid");
    console.log("Confirm password is empty");
    return false;
  }
  //check if passwords match (this is not part of built-in validation)//
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPassword.classList.remove("valid");
    console.log("Passwords don't match");
    return false;
  }
  //if got here, confirm password is valid//
  confirmPassword.classList.add("valid");
  console.log("Confirm password is valid");
  return true;
}
//function to clear all error messages//
function clearAllErrors() {
  console.log("Clearing all errors");

  //clear all error message text//
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent="";
}