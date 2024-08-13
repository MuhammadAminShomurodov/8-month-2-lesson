"use strict";
const studentTableBody = document.getElementById("studentTableBody");
const searchStudent = document.getElementById("searchStudent");
const filterIsMarried = document.getElementById("filterIsMarried");
const filterTypePosition = document.getElementById("filterTypePosition");
const studentForm = document.getElementById("studentForm");
let students = [
    {
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        birthDate: "1990-01-01",
        position: "ReactJs Developer",
        typePosition: "Junior",
        salary: 60000,
        isMarried: false,
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        address: "456 Elm St",
        birthDate: "1985-05-15",
        position: "NodeJs Developer",
        typePosition: "Middle",
        salary: 80000,
        isMarried: true,
    },
    // Add more student data as needed
];
let editIndex = null;
function renderStudentList() {
    studentTableBody.innerHTML = "";
    const searchQuery = searchStudent.value.toLowerCase();
    const isMarriedFilter = filterIsMarried.value;
    const typePositionFilter = filterTypePosition.value;
    const filteredStudents = students.filter((student) => {
        const isMarriedMatch = isMarriedFilter === "all" ||
            (isMarriedFilter === "married" && student.isMarried) ||
            (isMarriedFilter === "no" && !student.isMarried);
        const typePositionMatch = typePositionFilter === "all" ||
            student.typePosition === typePositionFilter;
        const searchMatch = student.firstName.toLowerCase().includes(searchQuery) ||
            student.lastName.toLowerCase().includes(searchQuery);
        return isMarriedMatch && typePositionMatch && searchMatch;
    });
    filteredStudents.forEach((student, index) => {
        const studentRow = document.createElement("tr");
        const formattedBirthDate = new Date(student.birthDate).toLocaleDateString();
        studentRow.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.address}</td>
      <td>${formattedBirthDate}</td>
      <td>${student.position}</td>
      <td>${student.typePosition}</td>
      <td>$${student.salary.toFixed(2)}</td>
      <td>${student.isMarried ? "Yes" : "No"}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
        studentTableBody.appendChild(studentRow);
    });
}
function editStudent(index) {
    const student = students[index];
    editIndex = index;
    // Populate the form with existing student data
    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("address").value = student.address;
    document.getElementById("birthDate").value = student.birthDate;
    document.getElementById("position").value = student.position;
    document.getElementById("typePosition").value = student.typePosition;
    document.getElementById("salary").value = student.salary;
    document.getElementById("isMarried").checked = student.isMarried;
    // Change modal title to "Edit Student"
    document.getElementById("studentModalLabel").innerText = "Edit Student";
    // Show the modal
    new bootstrap.Modal(document.getElementById('studentModal')).show();
}
function deleteStudent(index) {
    const confirmDelete = confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
        students.splice(index, 1);
        renderStudentList(); // Re-render the list after deletion
    }
}
studentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting
    const newStudent = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        birthDate: document.getElementById("birthDate").value,
        position: document.getElementById("position").value,
        typePosition: document.getElementById("typePosition").value,
        salary: parseFloat(document.getElementById("salary").value),
        isMarried: document.getElementById("isMarried").checked,
    };
    if (editIndex !== null) {
        // Edit existing student
        students[editIndex] = newStudent;
        editIndex = null;
    }
    else {
        // Add new student
        students.push(newStudent);
    }
    // Clear the form and hide the modal
    studentForm.reset();
    bootstrap.Modal.getInstance(document.getElementById('studentModal')).hide();
    // Re-render the student list
    renderStudentList();
});
// Event listeners
searchStudent.addEventListener("input", renderStudentList);
filterIsMarried.addEventListener("change", renderStudentList);
filterTypePosition.addEventListener("change", renderStudentList);
// Initial rendering of the student list
renderStudentList();
