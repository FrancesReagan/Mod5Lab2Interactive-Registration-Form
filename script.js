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

//When the page loads, check if there's a username saved"
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

// Add event listeners to check inputs as the user types
usernameInput.addEventListener('input', checkUsername);
emailInput.addEventListener('input', checkEmail);
passwordInput.addEventListener('input', checkPassword);
confirmPasswordInput.addEventListener('input', checkConfirmPassword);

console.log("Added all the input listeners");


// When the form is submitted
registrationForm.addEventListener('submit', function(event) {
  // Prevent the form from actually submitting to a server
  event.preventDefault();
  console.log("Form was submitted");

//Check all fields//
  const isUsernameOk = checkUsername();
  const isEmailOk = checkEmail();
  const isPasswordOk = checkPassword();
  const isConfirmPasswordOk = checkConfirmPassword();


  //log to see results//
  console.log("Username valid: " + (isUsernameOk ? "yes" : "no"));
  console.log("Email valid: " + (isEmailOk ? "yes" : "no"));
  console.log("Password valid: " + (isPasswordOk ? "yes" : "no"));
  console.log("Confirm password valid: " + (isConfirmPasswordOk ? "yes" : "no"));


  // If all fields are valid
  if (isUsernameOk && isEmailOk && isPasswordOk && isConfirmPasswordOk) {
    console.log("All fields are valid!");

 // Save the username
 localStorage.setItem('username', usernameInput.value);
 console.log("Saved username: " + usernameInput.value);


// Show success message
    successMessageBox.textContent = 'Registration successful!';
    successMessageBox.style.display = 'block';
    console.log("Showing success message");
    
    // Hide success message after 3 seconds
    setTimeout(function() {
      successMessageBox.style.display = 'none';
      console.log("Hiding success message");
    }, 3000);
    
    // Clear the form except username
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    console.log("Cleared the form except username");
    
    // Remove validation styling
    emailInput.style.borderColor = '#ddd';
    passwordInput.style.borderColor = '#ddd';
    confirmPasswordInput.style.borderColor = '#ddd';
    
    // Clear all error messages
    clearAllErrors();
  } else {
    console.log("Some fields are not valid");
    
    // Focus on the first invalid field
    if (!isUsernameOk) {
      usernameInput.focus();
      console.log("Focusing on username field");
    } else if (!isEmailOk) {
      emailInput.focus();
      console.log("Focusing on email field");
    } else if (!isPasswordOk) {
      passwordInput.focus();
      console.log("Focusing on password field");
    } else {
      confirmPasswordInput.focus();
      console.log("Focusing on confirm password field");
    }
  }
});

// Function to check if username is valid
function checkUsername() {
  console.log("Checking username");
  
  // Clear the error message
  usernameErrorMessage.textContent = '';
  
  // Get the username value and remove spaces at beginning and end
  const username = usernameInput.value.trim();
  
  // Check if it's empty
  if (username === '') {
    usernameErrorMessage.textContent = 'Username is required';
    usernameInput.style.borderColor = 'red';
    console.log("Username is empty");
    return false;
  }
  
  // Check if it's at least 3 characters
  if (username.length < 3) {
    usernameErrorMessage.textContent = 'Username must be at least 3 characters';
    usernameInput.style.borderColor = 'red';
    console.log("Username is too short: " + username.length + " characters");
    return false;
  }
  
  // If we got here, username is valid
  usernameInput.style.borderColor = 'green';
  console.log("Username is valid");
  return true;
}

// Function to check if email is valid
function checkEmail() {
  console.log("Checking email");
  
  // Clear the error message
  emailErrorMessage.textContent = '';
  
  // Get the email value and remove spaces
  const email = emailInput.value.trim();
  
  // Check if it's empty
  if (email === '') {
    emailErrorMessage.textContent = 'Email is required';
    emailInput.style.borderColor = 'red';
    console.log("Email is empty");
    return false;
  }
  
  // Check if it has @ and .
  if (!email.includes('@') || !email.includes('.')) {
    emailErrorMessage.textContent = 'Please enter a valid email address';
    emailInput.style.borderColor = 'red';
    console.log("Email is not valid format: " + email);
    return false;
  }
  
  // If we got here, email is valid
  emailInput.style.borderColor = 'green';
  console.log("Email is valid");
  return true;
}

// Function to check if password is valid
function checkPassword() {
  console.log("Checking password");
  
  // Clear the error message
  passwordErrorMessage.textContent = '';
  
  // Get the password
  const password = passwordInput.value;
  
  // Check if it's empty
  if (password === '') {
    passwordErrorMessage.textContent = 'Password is required';
    passwordInput.style.borderColor = 'red';
    console.log("Password is empty");
    return false;
  }
  
  // Check if it's at least 8 characters
  if (password.length < 8) {
    passwordErrorMessage.textContent = 'Password must be at least 8 characters';
    passwordInput.style.borderColor = 'red';
    console.log("Password is too short: " + password.length + " characters");
    return false;
  }
  
  // Check if it has uppercase
  let hasUppercase = false;
  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      hasUppercase = true;
      break;
    }
  }
  
  if (!hasUppercase) {
    passwordErrorMessage.textContent = 'Password must have at least one uppercase letter';
    passwordInput.style.borderColor = 'red';
    console.log("Password has no uppercase letters");
    return false;
  }
  
  // Check if it has lowercase
  let hasLowercase = false;
  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);
    if (char === char.toLowerCase() && char !== char.toUpperCase()) {
      hasLowercase = true;
      break;
    }
  }
  
  if (!hasLowercase) {
    passwordErrorMessage.textContent = 'Password must have at least one lowercase letter';
    passwordInput.style.borderColor = 'red';
    console.log("Password has no lowercase letters");
    return false;
  }
  
  // Check if it has a number
  let hasNumber = false;
  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);
    if (!isNaN(parseInt(char))) {
      hasNumber = true;
      break;
    }
  }
  
  if (!hasNumber) {
    passwordErrorMessage.textContent = 'Password must have at least one number';
    passwordInput.style.borderColor = 'red';
    console.log("Password has no numbers");
    return false;
  }
  
  // If we got here, password is valid
  passwordInput.style.borderColor = 'green';
  console.log("Password is valid");
  return true;
}

// Function to check if confirm password is valid
function checkConfirmPassword() {
  console.log("Checking confirm password");
  
  // Clear the error message
  confirmPasswordErrorMessage.textContent = '';
  
  // Get both passwords
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  // Check if confirm password is empty
  if (confirmPassword === '') {
    confirmPasswordErrorMessage.textContent = 'Please confirm your password';
    confirmPasswordInput.style.borderColor = 'red';
    console.log("Confirm password is empty");
    return false;
  }
  
  // Check if passwords match
  if (password !== confirmPassword) {
    confirmPasswordErrorMessage.textContent = 'Passwords do not match';
    confirmPasswordInput.style.borderColor = 'red';
    console.log("Passwords don't match");
    return false;
  }
  
  // If we got here, confirm password is valid
  confirmPasswordInput.style.borderColor = 'green';
  console.log("Confirm password is valid");
  return true;
}

// Function to clear all error messages
function clearAllErrors() {
  console.log("Clearing all errors");
  
  // Clear all error message text
  usernameErrorMessage.textContent = '';
  emailErrorMessage.textContent = '';
  passwordErrorMessage.textContent = '';
  confirmPasswordErrorMessage.textContent = '';
  
  // Reset border colors
  usernameInput.style.borderColor = '#ddd';
  emailInput.style.borderColor = '#ddd';
  passwordInput.style.borderColor = '#ddd';
  confirmPasswordInput.style.borderColor = '#ddd';
}
