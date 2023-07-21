const form = document.getElementById("studentForm");
function submitFormData() {
    // Retrieve form values
    const firstNameInput = document.getElementById("firstName");
    const surnameInput = document.getElementById("surname");
    const titleInput = document.getElementById("title");
    const emailInput = document.getElementById("email");
    const dobInput = document.getElementById("dob");
    const dropdown1 = document.getElementById("dropdown1");
    const dropdown2 = document.getElementById("dropdown2");

    // Retrieve input values
    const firstName = firstNameInput.value;
    const surname = surnameInput.value;
    const title = titleInput.value;
    const email = emailInput.value;
    const dob = dobInput.value;
    const subjectIds = [parseInt(dropdown1.value), parseInt(dropdown2.value)];

    // Create an object with the form data
    const formData = {
        firstName: firstName,
        secondName: surname,
        title: title,
        email: email,
        dob: dob,
        subjectIds: subjectIds,
    };
    console.log(formData)

    // Submit the data to the server (you can customize this as per your backend)
    fetch("https://studentapiuoltest.azurewebsites.net/api/studentinfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (response.ok) {
            // If the response is OK, show a success message
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Data submitted successfully!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            // Reset the form after successful submission
            form.reset();
        } else {
            // If the response is not OK, show an error message
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to submit data. Please try again later.",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        }
    })
    .catch((error) => {
        // If there's an error, show an error message
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    const firstNameInput = document.getElementById("firstName");
    const surnameInput = document.getElementById("surname");
    const emailInput = document.getElementById("email");

    // Retrieve input values
    const firstName = firstNameInput.value;
    const surname = surnameInput.value;
    const email = emailInput.value;

    // Validate character requirements
    const firstNameMaxLength = 25;
    const surnameMaxLength = 25;
    const emailMaxLength = 50;

    let isValid = true;

    if (firstName.length > firstNameMaxLength) {
        isValid = false;
        firstNameInput.classList.add("is-invalid");
    } else {
        firstNameInput.classList.remove("is-invalid");
    }

    if (surname.length > surnameMaxLength) {
        isValid = false;
        surnameInput.classList.add("is-invalid");
    } else {
        surnameInput.classList.remove("is-invalid");
    }

    if (email.length > emailMaxLength) {
        isValid = false;
        emailInput.classList.add("is-invalid");
    } else {
        emailInput.classList.remove("is-invalid");
    }

    // Display SweetAlert alert for invalid form
    if (!isValid) {
        Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Please fix the errors in the form.",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
        });
        return; // Stop form submission if invalid
    }
    submitFormData();
    
});
