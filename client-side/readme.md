## Create Account Form Documentation

## index.html

### Purpose
The purpose of this code is to provide the necessary HTML structure for a create account form. It includes form fields for capturing user information such as first name, surname, email address, date of birth, and subject selection.

### Functionality Overview
- The HTML structure consists of a `<form>` element with various `<input>` and `<select>` elements for capturing user input.
- The form includes fields for first name, surname, title (optional), email address, date of birth, and two subject dropdowns.
- The form also includes a "Create Account" button for submitting the form data.
- External CSS and JavaScript files are linked to provide styling and functionality.

### HTML Structure Overview
The HTML structure consists of the following key components:

1. `<head>`: Contains meta tags, title, CSS links, and JavaScript script tags.
2. `<body>`: Contains the main content of the page.
   - `<div class="form-container">`: A container div that wraps the entire form.
     - `<h1>Create Student Account</h1>`: Heading for the form.
     - `<form id="studentForm">`: The actual form element with an ID attribute.
       - Form inputs:
         - First Name: `<input type="text" id="firstName" />`
         - Surname: `<input type="text" id="surname" />`
         - Title: `<input type="text" id="title" />`
         - Email Address: `<input type="email" id="email" />`
         - Date of Birth: `<input type="date" id="dob" />`
         - Subject 1 Dropdown: `<select id="dropdown1"></select>`
         - Subject 2 Dropdown: `<select id="dropdown2"></select>`
       - Submit Button: `<button type="submit">Create Account</button>`

### Dependencies
This code relies on several external dependencies:

- Bootstrap CSS (version 5.3.0): This CSS file provides styling for various elements in the form.
- Font Awesome CSS (version 6.0.0-beta2): This CSS file provides icons for the form.
- SweetAlert2 CSS (version 11.1.4): This CSS file provides styling for displaying messages.
- Bootstrap JS (version 5.3.0): This JavaScript file provides functionality for Bootstrap components used in the form.
- SweetAlert2 JS (version 11.0.19): This JavaScript file provides functionality for displaying messages.
- Custom JavaScript files:
  - `createAccount.js`: This file contains additional functionality specific to creating a student account.
  - `dropDown.js`: This file contains additional functionality needed for the drop down generation.



## createAccount.js

### Purpose
The purpose of this JavaScript file is to handle form submissions for creating a new student account. It captures user input from the HTML form, validates the input data, and sends it to a server using a POST request. Additionally, it displays user-friendly alerts using SweetAlert for successful and failed form submissions as well as for validation errors.

### Functionality Overview
1. The JavaScript file retrieves form values from various input fields in the HTML form.
2. It validates the input data based on character requirements for certain fields.
3. If the input data is valid, it creates a data object with the form values and sends it to the server using a POST request.
4. Upon successful submission, a success message is displayed using SweetAlert, and the form is reset.
5. If there's an error during form submission or if the response from the server is not OK, an error message is displayed using SweetAlert.

### Key Components
1. `const form = document.getElementById("studentForm");`: This line gets the reference to the HTML form element with the ID "studentForm". It will be used to attach a listener to handle form submission.

2. `submitFormData()`: This function retrieves form values, creates an object with the form data, and sends it to the server using the Fetch API. It also handles success and error responses from the server.

3. `form.addEventListener("submit", function (event) { ... }`: This is an event listener that listens for form submission. When the form is submitted, it first validates the form input for character requirements, and if the form is valid, it calls the `submitFormData()` function to handle the data submission.

4. SweetAlert: The JavaScript file uses the SweetAlert library to display user-friendly alerts for success, error, and validation messages.

### Input Fields
The JavaScript file retrieves data from the following input fields in the HTML form:
1. `firstNameInput`: Represents the input element for the student's first name.
2. `surnameInput`: Represents the input element for the student's surname.
3. `titleInput`: Represents the input element for the student's title (e.g., Mr., Mrs., Miss).
4. `emailInput`: Represents the input element for the student's email address.
5. `dobInput`: Represents the input element for the student's date of birth.
6. `dropdown1`: Represents the first dropdown input element.
7. `dropdown2`: Represents the second dropdown input element.

### Data Validation
The JavaScript file performs character limit validation for the following input fields:
1. `firstName`: It checks if the length of the first name exceeds the `firstNameMaxLength` (25 characters). If it does, it marks the input field as invalid.
2. `surname`: It checks if the length of the surname exceeds the `surnameMaxLength` (25 characters). If it does, it marks the input field as invalid.
3. `email`: It checks if the length of the email address exceeds the `emailMaxLength` (50 characters). If it does, it marks the input field as invalid.
More validation is done on the back end side of the project. Check the backend documentation.

### Data Submission
The JavaScript file sends the form data to the server using a POST request to the URL "https://studentapiuoltest.azurewebsites.net/api/studentinfo" with the following headers:
- Content-Type: application/json

### Success and Error Handling
- If the server responds with an OK status, a success message is displayed using SweetAlert, and the form is reset.
- If there's an error during form submission or if the response is not OK, an error message is displayed using SweetAlert.


## dropDown.js

### Purpose
The purpose of this code is to provide the necessary functionality for a create account form that includes two dropdowns. The code fetches data from an API, populates the dropdown options with the fetched data, updates the other dropdown based on the selection, and displays the selected option in a paragraph.

### Functionality Overview
1. `fetchData()`: This asynchronous function fetches data from an API endpoint using the `fetch` function. It checks if the response is successful and returns the fetched data. If there is an error, it displays an error message using SweetAlert and returns an empty array.

2. `populateDropdown(dropdown, options)`: This function populates a given dropdown element with options based on the provided array of options. It uses template literals to generate HTML option elements and appends them to the dropdown element.

3. `updateDropdown(selectedId)`: This function updates both dropdowns based on the selected option's ID. It disables both dropdowns temporarily, removes the selected option from the other dropdown by disabling it, and enables both dropdowns again.

4. `updateSelectedOption(selectedId, selectedTitle)`: This function updates a paragraph element with the selected option's ID and title.

5. `initialize()`: This main function handles dropdown events and fetches data using `fetchData()`. It first checks if there is any data available after fetching. If not, it displays an info message using SweetAlert. Then it initializes both dropdowns by adding a placeholder option and populating them with data using `populateDropdown()`. Finally, it adds event listeners to both dropdowns that update the other dropdown and display the selected option using `updateDropdown()` and `updateSelectedOption()`.

### Key Components
- `fetchData()`: Fetches data from an API endpoint.
- `populateDropdown(dropdown, options)`: Populates a dropdown element with options.
- `updateDropdown(selectedId)`: Updates both dropdowns based on the selected option's ID.
- `updateSelectedOption(selectedId, selectedTitle)`: Updates a paragraph element with the selected option's ID and title.
- `initialize()`: Handles dropdown events and fetches data.

