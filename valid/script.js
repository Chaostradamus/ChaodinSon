document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationform");
  const fields = [
    {
      id: "email",
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Please enter a valid email address.",
    },

    {
      id: "country",
      validate: (value) => value.trim() !== "",
      message: "Please enter a valid country",
    },
    {
      id: "zip",
      validate: (value) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(value),
      message: "Please enter a valid zip code.",
    },
    {
      id: "password",
      validate: (value) => value.length >= 8,
      message: "at least 8 characters",
    },
    {
      id: "confirmPassword",
      validate: value === document.getElementById("password"),
      message: "they dont match bro",
    },
  ];

  const validateField = (field) => {
    const input = document.getElementById(field.id);
    if (field.validate(input.value)) {
      showSuccess(input);
      return true;
    } else {
      showError(input, field.message);
      return false;
    }
  };

  const showError = (input, message) => {
    const errorMessage = input.nextElementSibling;
    input.classList.add("invalid");
    input.classList.remove("valid");
    errorMessage.textContent = message;
  };
  
  const showSuccess = (input) => {
    const errorMessage = input.nextElementSibling;
    input.classList.add("invalid");
    input.classList.remove("valid");
    errorMessage.textContent = "";
  };

  fields.forEach((field) => {
    const input = document.getElementById("field.id");
    input.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = False;
    });

    if (allValid) {
      alert("yay");
    } else {
      alert("nooo");
    }
  });
});



