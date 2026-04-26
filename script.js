// Load from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Render table
function render() {
  table.innerHTML = "";

  if (students.length === 0) {
    table.innerHTML = `<tr><td colspan="5">No students added</td></tr>`;
    return;
  }

  students.forEach((s, i) => {
    table.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.id}</td>
        <td>${s.email}</td>
        <td>${s.contact}</td>
        <td>
          <button onclick="editStudent(${i})">Edit</button>
          <button onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("students", JSON.stringify(students));
}

// Validation
function isValid(name, id, email, contact) {
  if (!name || !id || !email || !contact) return false;

  if (!/^[A-Za-z ]+$/.test(name)) return false; // only letters
  if (!/^[0-9]+$/.test(id)) return false; // only numbers
  if (!/^[0-9]{10}$/.test(contact)) return false; // exactly 10 digits
  if (!/^\S+@\S+\.\S+$/.test(email)) return false; // valid email

  return true;
}

// Add / Update
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!isValid(name, id, email, contact)) {
    alert("Enter valid details");
    return;
  }

  const student = { name, id, email, contact };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  form.reset();
  render();
});

// Edit
function editStudent(i) {
  const s = students[i];

  document.getElementById("name").value = s.name;
  document.getElementById("studentId").value = s.id;
  document.getElementById("email").value = s.email;
  document.getElementById("contact").value = s.contact;

  editIndex = i;
}

// Delete
function deleteStudent(i) {
  if (confirm("Delete this record?")) {
    students.splice(i, 1);
    render();
  }
}

// Initial load
render();
