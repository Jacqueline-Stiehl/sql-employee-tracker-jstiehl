/* 
Sometimes you will need to take an array of data from the database, and have inquirer 
display the results as choices for the user to choose from. For instance, you may provide a 
list of employees and the user must select one. Here's how you do that:
*/

// Let's say the variable below represents the data we got back from mysql 
const arrayOfEmployees = [];

// Now let's make the inquirer part: 

inquirer.prompt([
  {
    type: "list", 
    message: "Choose an employee from the list below:", 
    name: "selectedEmployeeId",
    choices: arrayOfEmployees.map(({ id, first_name, last_name }) => ({ 
      //per Gary, you are going to map over the array of data
      //array mapping takes one array and transforms it into another array
      //map over the original data (only need id and name); 
      //that's the only part being put into the new array
      //inquirer looks for key of value (with id)
      fname: first_name,
      lname: last_name,
      value: id
    })).then( response => {
      // response.selectedEmployeeId = id of the employee chosen by the user+
    })
  }
]);

/* 

  The code above takes the array of all the student info and makes a new array for inquirer; 
  for each student we display their name, and we also provide an id value. When the student 
  chooses by name, the id value is what gets put into the response object.