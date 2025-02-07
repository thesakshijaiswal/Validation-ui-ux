document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const errorMessageEmail = document.getElementById("error-message-email");
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const errorMessageDate = document.getElementById("error-message-date");
  const departmentSelect = document.getElementById("department");
  const errorMessageDept = document.getElementById("error-message-dept");
  const form = document.querySelector("form");

  const hideErrorMessages = () => {
    [errorMessageEmail, errorMessageDate, errorMessageDept].forEach(
      (error) => (error.style.display = "none")
    );
  };

  hideErrorMessages();

  const setErrorState = (element, errorMessage, isError) => {
    element.style.border = isError ? "1.5px solid red" : "";
    errorMessage.style.display = isError ? "block" : "none";
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(emailInput.value.trim());
    setErrorState(emailInput, errorMessageEmail, !isValid);
    return isValid;
  };

  const validateDate = () => {
    const dayValue = parseInt(day.value, 10);
    const monthValue = parseInt(month.value, 10);
    const yearValue = parseInt(year.value, 10);
    let isValid = !isNaN(dayValue) && !isNaN(monthValue) && !isNaN(yearValue);

    if (isValid) {
      const date = new Date(yearValue, monthValue - 1, dayValue);
      isValid =
        date.getFullYear() === yearValue &&
        date.getMonth() + 1 === monthValue &&
        date.getDate() === dayValue;
    }

    [day, month, year].forEach((field) =>
      setErrorState(field, errorMessageDate, !isValid)
    );
    return isValid;
  };

  const validateDepartment = () => {
    const isValid = departmentSelect.value.trim() !== "";
    setErrorState(departmentSelect, errorMessageDept, !isValid);
    return isValid;
  };

  
  emailInput.addEventListener("blur", validateEmail);
  day.addEventListener("blur", validateDate);
  month.addEventListener("blur", validateDate);
  year.addEventListener("blur", validateDate);
  departmentSelect.addEventListener("blur", validateDepartment);

  
  emailInput.addEventListener("input", validateEmail);
  departmentSelect.addEventListener("change", validateDepartment);

  form.addEventListener("submit", (event) => {
    const isFormValid = [
      validateEmail(),
      validateDate(),
      validateDepartment(),
    ].every(Boolean);
    if (!isFormValid) event.preventDefault();
  });
});
