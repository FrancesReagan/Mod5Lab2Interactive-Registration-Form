//Select all necessary DOM elements//
const form = document.getElementById("registrationForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//Error message elements//
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const successMessage = document.getElementById("successMessage");

//Load saved username from LocalStorage on page load//
document.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("username");
  if (savedUsername) {
    username.value = savedUsername;
    validateUsername ();
  }
});

//Real-time validation for each input field//
username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

//Form submission//
form.addEventListener("submit", function(event) {
  event.preventDefault();

  //Perform final validation check on all fields//
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    //if all fields are valid, save username to LocalStorage//
    localStorage.setItem("username", username.value);

    //Display sucess message//
    successMessage.textContent = "Registration successful!!";
    successMessage.classList.add("visible");

    
  }
}

)