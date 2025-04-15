// Retrieve student data from localStorage or initialize an empty array
const students = JSON.parse(localStorage.getItem("students")) || [];
const tbody = document.querySelector("#students-table tbody");

// If no students, show a message in the table
if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No students registered.</td></tr>`;
}
// Generate and display rows for each student
students.forEach((student, index) => {
    const row = document.createElement("tr");

    // Create the row content and include edit, delete, and save buttons
    row.innerHTML = `
        <td id="name-${index}">${student.name}</td>
        <td id="studentId-${index}">${student.studentId}</td>
        <td id="email-${index}">${student.email}</td>
        <td id="contact-${index}">${student.contact}</td>
        <td class="actions">
            <button class="edit-btn" onclick="editStudent(${index})"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteStudent(${index})"><i class="fas fa-trash-alt"></i></button>
            <button class="save-btn" onclick="saveStudent(${index})" style="display:none;"><i class="fas fa-save"></i></button>
            <button class="cancel-btn" onclick="cancelEdit(${index})" style="display:none;"><i class="fas fa-times"></i></button>
        </td>
    `;

    // Append the generated row to the table body
    tbody.appendChild(row);
});

// Function to make a student's data editable
function editStudent(index) {
    makeEditable(index);
    toggleButtons(index, false, true);// Disable Edit and Delete buttons, show Save and Cancel
}
// Function to delete a student from the table and localStorage
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    location.reload();  // Reload the page to reflect changes
}

// Function to save the edited student data
function saveStudent(index) {
    const nameInput = document.querySelector(`#name-${index} input`);
    const studentIdInput = document.querySelector(`#studentId-${index} input`);
    const emailInput = document.querySelector(`#email-${index} input`);
    const contactInput = document.querySelector(`#contact-${index} input`);

    // Validation patterns
    const namePattern = /^[a-zA-Z\s]+$/;
    const studentIdPattern = /^[0-9]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactPattern = /^[0-9]{10}$/;

    // Use validateInput function to check if all fields are valid
    let isValid =
        validateInput(nameInput, namePattern) &&
        validateInput(studentIdInput, studentIdPattern) &&
        validateInput(emailInput, emailPattern) &&
        validateInput(contactInput, contactPattern);

    if (!isValid) {
        alert("Please correct the highlighted fields before saving.");
        return;
    }



    const students = JSON.parse(localStorage.getItem("students")) || [];  // Retrieve the current student data from localStorage

    // Update the student data in the array
    students[index] = {
        name: nameInput.value,
        studentId: studentIdInput.value,
        email: emailInput.value,
        contact: contactInput.value,
    };

    // Save the updated student list back to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Update the table with the new values
    document.getElementById(`name-${index}`).innerText = nameInput.value;
    document.getElementById(`studentId-${index}`).innerText = studentIdInput.value;
    document.getElementById(`email-${index}`).innerText = emailInput.value;
    document.getElementById(`contact-${index}`).innerText = contactInput.value;
    toggleButtons(index, true, false); // Hide the Save and Cancel buttons, show Edit and Delete
}
// Function to cancel the editing
function cancelEdit(index) {
    revertChanges(index);
    toggleButtons(index, true, false); // Hide the Save and Cancel buttons, show Edit and Delete
}


// Helper function to hide or show buttons based on action
function toggleButtons(index, showEditDelete, showSaveCancel) {
    const row = tbody.rows[index];
    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");
    const saveButton = row.querySelector(".save-btn");
    const cancelButton = row.querySelector(".cancel-btn");

    // Toggle visibility of buttons
    editButton.style.display = showEditDelete ? "inline-block" : "none";
    deleteButton.style.display = showEditDelete ? "inline-block" : "none";
    saveButton.style.display = showSaveCancel ? "inline-block" : "none";
    cancelButton.style.display = showSaveCancel ? "inline-block" : "none";
}

//  validation function
function validateInput(input, pattern) {
    if (pattern.test(input.value.trim())) {
        input.classList.remove("input-invalid");
        input.classList.add("input-valid");
        return true;
    } else {
        input.classList.remove("input-valid");
        input.classList.add("input-invalid");
        return false;
    }
}

// Helper function to update table cells with input fields
function makeEditable(index) {
    const nameCell = document.getElementById(`name-${index}`);
    const studentIdCell = document.getElementById(`studentId-${index}`);
    const emailCell = document.getElementById(`email-${index}`);
    const contactCell = document.getElementById(`contact-${index}`);

    // Replace text content in cells with input fields for editing
    nameCell.innerHTML = `<input type="text" value="${nameCell.innerText}">`;
    studentIdCell.innerHTML = `<input type="number" value="${studentIdCell.innerText}">`;
    emailCell.innerHTML = `<input type="email" value="${emailCell.innerText}">`;
    contactCell.innerHTML = `<input type="tel" value="${contactCell.innerText}">`;

    // Add event listeners for real-time validation
    const nameInput = nameCell.querySelector("input");
    const studentIdInput = studentIdCell.querySelector("input");
    const emailInput = emailCell.querySelector("input");
    const contactInput = contactCell.querySelector("input");
    // Validation patterns
    const namePattern = /^[a-zA-Z\s]+$/;  // Name should contain only letters and spaces
    const studentIdPattern = /^[0-9]+$/; // Student ID should contain only digits
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email pattern
    const contactPattern = /^[0-9]{10}$/; // Contact number should be exactly 10 digits

    // Event listeners for each input field to validate on input
    nameInput.addEventListener("input", () => validateInput(nameInput, namePattern));
    studentIdInput.addEventListener("input", () => validateInput(studentIdInput, studentIdPattern));
    emailInput.addEventListener("input", () => validateInput(emailInput, emailPattern));
    contactInput.addEventListener("input", () => validateInput(contactInput, contactPattern));
}



// Helper function to revert back to original values
function revertChanges(index) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const nameCell = document.getElementById(`name-${index}`);
    const studentIdCell = document.getElementById(`studentId-${index}`);
    const emailCell = document.getElementById(`email-${index}`);
    const contactCell = document.getElementById(`contact-${index}`);

    // Revert back to the original values
    const student = students[index];
    nameCell.innerText = student.name;
    studentIdCell.innerText = student.studentId;
    emailCell.innerText = student.email;
    contactCell.innerText = student.contact;
}








