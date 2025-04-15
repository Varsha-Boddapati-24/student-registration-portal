const form = document.getElementById("studentForm");

// Select input fields for student details
const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");

// Regular expressions for validating student details (name, student ID, email, contact)
const namePattern = /^[a-zA-Z\s]+$/;// Validates names containing only letters (A-Z, a-z) and spaces
const studentIdPattern = /^[0-9]+$/;// Validates student IDs containing only digits (0-9)
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;//Validates email addresses in the format "local-part@domain.extension"
const contactPattern = /^[0-9]{10}$/;// Validates contact numbers containing exactly 10 digits



// Validates input by matching it against the regex pattern and adds/removes 'valid' or 'invalid' classes for styling indication.
function validateField(input, pattern) {
    if (pattern.test(input.value.trim())) {
        input.classList.add("valid");
        input.classList.remove("invalid");
        return true;
    } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
        return false;
    }
}

// Event listeners for input validation
nameInput.addEventListener("input", () => validateField(nameInput, namePattern));
studentIdInput.addEventListener("input", () => validateField(studentIdInput, studentIdPattern));
emailInput.addEventListener("input", () => validateField(emailInput, emailPattern));
contactInput.addEventListener("input", () => validateField(contactInput, contactPattern));

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();
     // Get form values
    const name = nameInput.value;
    const studentId = studentIdInput.value;
    const email = emailInput.value;
    const contact = contactInput.value;

     // Check if all fields are filled
    if (!name || !studentId || !email || !contact) {
        alert("Please fill in all fields!");
        return;
    }
   


  // Validate each field before submission
    if (
        !validateField(nameInput, namePattern) ||
        !validateField(studentIdInput, studentIdPattern) ||
        !validateField(emailInput, emailPattern) ||
        !validateField(contactInput, contactPattern)
    ) {
        alert("Please correct the highlighted fields before submitting.");
        return;
    }

    // Check for duplicate student ID
      let students = JSON.parse(localStorage.getItem("students")) || [];
      const isDuplicate = students.some(student => student.studentId === studentId);
      if (isDuplicate) {
          alert("A student with this ID already exists!");
          return;
      }
   // Create student object and store in localStorage
    const student = { name, studentId, email, contact };
   
    students.push(student);
    //Save updated students array in localStorage
    localStorage.setItem("students", JSON.stringify(students));
    // Reset the form and display success message
    form.reset();
    alert("Student registered successfully!");

     // Redirect to student registration page
    window.location.href = "student.html";
});
