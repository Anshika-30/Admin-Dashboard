document.addEventListener('DOMContentLoaded', function () {
let originalData;
function displayData(data) {
originalData = [...data];
const tableBody = document.getElementById('table-body');
data.forEach(user => {
const row = document.createElement('tr');
row.innerHTML = `
<td><input type="checkbox" class="row-checkbox" onchange="toggleRowSelection(this)"></td>
<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.role}</td>
<td>
<button class="edit-btn" onclick="editRow(this)">Edit</button>
<button class="delete-btn" onclick="deleteRow(this)">Delete</button>
</td>
`;
tableBody.appendChild(row);
});
}
fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
.then(response => response.json())
.then(data => {
displayData(data);
})
.catch(error => console.error('Error fetching data:', error));
window.editRow = function (button) {
const row = button.closest('tr');
const inputs = row.querySelectorAll('td:not(:last-child)');
document.getElementById('editName').value = inputs[1].innerText;
document.getElementById('editEmail').value = inputs[2].innerText;
document.getElementById('editRole').value = inputs[3].innerText;
row.classList.add('editable');
document.getElementById('editModal').style.display = 'block';
}
window.closeEditModal = function () {
document.querySelectorAll('tr.editable').forEach(row => row.classList.remove('editable'));
document.getElementById('editModal').style.display = 'none';
}
window.saveChanges = function () {
const editedName = document.getElementById('editName').value;
const editedEmail = document.getElementById('editEmail').value;
const editedRole = document.getElementById('editRole').value;
const editableRow = document.querySelector('tr.editable');
const userId = editableRow.querySelector('td').innerText;
const userIndex = originalData.findIndex(user => user.id === userId);
originalData[userIndex] = {
id: userId,
name: editedName,
email: editedEmail,
role: editedRole
};
editableRow.innerHTML = `
<td><input type="checkbox" class="row-checkbox" onchange="toggleRowSelection(this)"></td>
<td>${userId}</td>
<td>${editedName}</td>
<td>${editedEmail}</td>
<td>${editedRole}</td>
<td>
<button class="edit-btn" onclick="editRow(this)">Edit</button>
<button class="delete-btn" onclick="deleteRow(this)">Delete</button>
</td>
`;
closeEditModal();
}
window.deleteRow = function (button) {
animateBird();
const row = button.closest('tr');
row.remove();
}
window.animateBird = function () {
const bird = document.getElementById('bird');
gsap.to(bird, {
x: '+=100',
opacity: 0,
duration: 1,
onComplete: () => {
gsap.set(bird, { x: 0, opacity: 1 });
}
});
}
// Function to toggle row selection
// Function to toggle row selection
window.toggleRowSelection = function (checkbox) {
const row = checkbox.closest('tr');
row.classList.toggle('selected', checkbox.checked);
}
// Function to select all rows
window.selectAllRows = function () {
const selectAllCheckbox = document.getElementById('selectAll');
const rowCheckboxes = document.querySelectorAll('.row-checkbox');
rowCheckboxes.forEach(checkbox => {
checkbox.checked = selectAllCheckbox.checked;
toggleRowSelection(checkbox);
});
}
// Function to delete selected rows
window.deleteSelected = function () {
animateBird();
const selectedRows = document.querySelectorAll('tr.selected');
selectedRows.forEach(selectedRow => {
const userId = selectedRow.querySelector('td:nth-child(2)').innerText; // Adjust the
index based on your table structure
const index = originalData.findIndex(user => user.id === userId);
originalData.splice(index, 1);
selectedRow.remove();
});
}
window.search = function () {
const searchInput = document.getElementById('search').value.toLowerCase();
const tableRows = document.querySelectorAll('#table-body tr');
tableRows.forEach(row => {
const userId = row.querySelector('td:nth-child(2)').innerText.toLowerCase(); //
Adjust the index based on your table structure
const userName = row.querySelector('td:nth-child(3)').innerText.toLowerCase(); //
Adjust the index based on your table structure
const userEmail = row.querySelector('td:nth-child(4)').innerText.toLowerCase(); //
Adjust the index based on your table structure
const userRole = row.querySelector('td:nth-child(5)').innerText.toLowerCase(); //
Adjust the index based on your table structure
if (
userId.includes(searchInput) ||
userName.includes(searchInput) ||
userEmail.includes(searchInput) ||
userRole.includes(searchInput)
) {
row.style.display = '';
} else {
row.style.display = 'none';
}
});
}
});