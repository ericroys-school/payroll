// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

/**prompt for a single employee worth of data
 * Coded as an all or nothing transaction (
 * user either enters all the stuff or nothing
 * gets added). Using prompts this way is garbage
 * so doing the best with what is available. There
 * is no requirement for validation and therefor there
 * is none; although there is defensive use of salary
 * for calculation purposes.
 */
function getEmployee() {
  const employee = {};

  //ask for first name
  employee.firstName = prompt("Enter First Name: ");

  //only ask for the rest if the user didn't bail
  if (employee.firstName) employee.lastName = prompt("Enter Last Name: ");
  else return null;

  let _tsalary = 0;
  //only ask for salary if didn't bail
  if (employee.lastName) _tsalary = prompt("Enter salary amount: ");
  else return null;

  //make sure it was a number otherwise make it 0
  if (isNaN(_tsalary) || _tsalary === null) employee.salary = 0;
  //set is as converted number
  else employee.salary = Number(_tsalary);

  //return full employee
  return employee;
}

// Collect employee data
const collectEmployees = function () {
  //variable for employee
  let employee = {};
  //variable for all collected employees
  const employees = [];

  /*collect an employee until such time as the collection
   * returns null (i.e. the user bailed entering data)
   * or the user entered data but doesn't want to add any
   * more employees
   */
  while ((employee = getEmployee())) {
    //add it to the array
    employees.push(employee);
    //prompt the user to enter another
    if (!confirm("would you like to add another?")) break;
  }

  return employees;
};

function printSalary(count, avg) {
  console.log(
    `The average employee salary for (${count}) employees is (\$${avg})`
  );
}
// Display the average salary
const displayAverageSalary = function (employeesArray) {
  let avg = 0;

  if (!employeesArray || employeesArray.length < 1) {
    printSalary(0, 0);
    return;
  }

  //assign count with # of employees from the array
  let count = employeesArray.length;
  let t = 0;
  //iterate the array adding the salaries
  employeesArray.map((e) => {
    t += e.salary;
  });
  // calculate the average
  avg = t / employeesArray.length;
  //print the info
  printSalary(count, avg);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
