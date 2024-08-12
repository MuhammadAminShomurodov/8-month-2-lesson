type Student = {
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  position: string;
  typePosition: string;
  salary: number;
  isMarried: boolean;
};

const studentForm = document.getElementById("studentForm") as HTMLFormElement;
const studentTableBody = document.getElementById(
  "studentTableBody"
) as HTMLTableSectionElement;

let students: Student[] = JSON.parse(localStorage.getItem("students") || "[]");

function renderStudentList() {
  studentTableBody.innerHTML = "";
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

studentForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const newStudent: Student = {
    firstName: (document.getElementById("firstName") as HTMLInputElement).value,
    lastName: (document.getElementById("lastName") as HTMLInputElement).value,
    address: (document.getElementById("address") as HTMLInputElement).value,
    birthDate: (document.getElementById("birthDate") as HTMLInputElement).value,
    position: (document.getElementById("position") as HTMLSelectElement).value,
    typePosition: (document.getElementById("typePosition") as HTMLSelectElement)
      .value,
    salary: +(document.getElementById("salary") as HTMLInputElement).value,
    isMarried: (document.getElementById("isMarried") as HTMLInputElement)
      .checked,
  };

  students.push(newStudent);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudentList();
  studentForm.reset();
});

function deleteStudent(index: number) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudentList();
}

function editStudent(index: number) {
  const student = students[index];
  (document.getElementById("firstName") as HTMLInputElement).value =
    student.firstName;
  (document.getElementById("lastName") as HTMLInputElement).value =
    student.lastName;
  (document.getElementById("address") as HTMLInputElement).value =
    student.address;
  (document.getElementById("birthDate") as HTMLInputElement).value =
    student.birthDate;
  (document.getElementById("position") as HTMLSelectElement).value =
    student.position;
  (document.getElementById("typePosition") as HTMLSelectElement).value =
    student.typePosition;
  (document.getElementById("salary") as HTMLInputElement).value =
    student.salary.toString();
  (document.getElementById("isMarried") as HTMLInputElement).checked =
    student.isMarried;

  deleteStudent(index);
}

renderStudentList();
