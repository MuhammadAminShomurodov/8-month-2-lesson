"use strict";
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
let students = JSON.parse(localStorage.getItem("students") || "[]");
// Function to render the entire student list in a table
function renderStudentList() {
    studentTableBody.innerHTML = ""; // Clear the table body
    students.forEach((student, index) => {
        const studentRow = document.createElement("tr");
        studentRow.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.address}</td>
            <td>${student.birthDate}</td>
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
// Function to handle the form submission
studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newStudent = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        birthDate: document.getElementById("birthDate").value,
        position: document.getElementById("position").value,
        typePosition: document.getElementById("typePosition").value,
        salary: +document.getElementById("salary").value,
        isMarried: document.getElementById("isMarried").checked,
    };
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudentList(); // Re-render the student list in the table
    studentForm.reset();
});
// Function to delete a student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudentList(); // Re-render the student list in the table
}
// Function to edit a student
function editStudent(index) {
    const student = students[index];
    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("address").value = student.address;
    document.getElementById("birthDate").value = student.birthDate;
    document.getElementById("position").value = student.position;
    document.getElementById("typePosition").value = student.typePosition;
    document.getElementById("salary").value = student.salary.toString();
    document.getElementById("isMarried").checked = student.isMarried;
    // Remove the student being edited from the list
    deleteStudent(index);
}
// Initial render to display existing students
renderStudentList();
