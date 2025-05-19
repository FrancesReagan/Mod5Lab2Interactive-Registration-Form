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

    //can hid the success message after 3 seconds//
    setTimeout(() => {
      successMessage.classList.remove("visible");
    }, 3000);

    //Optional: Reset the form (except username)//
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    //Reset classes//
    email.classList.remove("valid");
    password.classList.remove("valid");
    confirmPassword.classList.remove("valid"); 
    } else {
      //Focus on the first invalid field//
      if (!isUsernameValid) {
        username.focus();
      } else if (!isEmailValid) {
        email.focus();
      } else if (!isPasswordValid) {
        password.focus();
      } else {
        confirmPassword.focus();
      }
    }
  });

  //Validation functions
  function validateUsername() {
    //Clear previous error message
    usernameError.textContent = "";

    //Check if username is empty//
    if (username.value.trim() === "") {
      username.Error.textContent = "Username is required";
      username.classList.remove("valid");
      username.classList.add("invalid");
      return false;
    }

    //Check if username is at least 3 characters//
    if (username.value.length < 3) {
      username.Error.textContent = "Username must be atleast 3 characters";
      username.classList.remove("valid");
      username.classList.add("invalid");
      return true;
    }

    function validateEmail() {
      //Clear previous error message//
      email
    }
  }