import React, { useState } from "react";
import FormInput from "./FormInput";
import SweetAlert from "./SweetAlert";
import { validateForm } from "./FormValidator";
import "./StudentAccountForm.css";
import DropDown from "./DropDown";
const StudentAccountForm = () => {
    const initialState = {
        firstName: "",
        surname: "",
        title: "",
        email: "",
        dob: "",
        subject1: "",
        subject2: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [isFormValid, setIsFormValid] = useState(true);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        const isValid = validateForm(formData);

        if (!isValid) {
            setIsFormValid(false);
            return;
        }
        const jsonFormData = {
            firstName: formData.firstName,
            secondName: formData.surname,
            title: formData.title,
            email: formData.email,
            dob: formData.dob,
            subjectIds: [formData.subject1, formData.subject2]
                .filter(Boolean)
                .map(Number),
        };
        try {
            // Send the POST request to the API
            const response = await fetch(
                "https://studentapiuoltest.azurewebsites.net/api/studentinfo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonFormData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create student account.");
            }

            // If the request was successful, reset the form data
            setFormData(initialState);

            <SweetAlert
                icon="success"
                title="Validation Error"
                text="Student account created successfully."
                confirmButtonColor="#3085d6"
                confirmButtonText="OK"
                onClose={() => setIsFormValid(true)}
            />;
        } catch (error) {
            // Handle any errors that occur during the request
            console.error("Error creating student account:", error);

            // Show an error message using SweetAlert

            <SweetAlert
                icon="error"
                title="Server Error"
                text="Failed to create student account. Please try again later."
                confirmButtonColor="#3085d6"
                confirmButtonText="OK"
            />;
        }
        setFormData(initialState);
    };
    const handleDropDownChange = (selectedId, selectedTitle) => {
        console.log(selectedId);
        setFormData((prevFormData) => ({
            ...prevFormData,
            subject1: selectedId,
            subject2:
                selectedId === prevFormData.subject1
                    ? prevFormData.subject2
                    : selectedId,
        }));
    };

    return (
        <div className="form-container">
            <h1 className="mb-4">Create Student Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="firstName"
                        maxLength={25}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="surname">Surname:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="surname"
                        maxLength={25}
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        maxLength={50}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        title="Please enter a valid email address."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        className="form-control"
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Dropdown:</label>
                    <DropDown onSelectChange={handleDropDownChange} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Account
                </button>
            </form>

            {!isFormValid && (
                <SweetAlert
                    icon="error"
                    title="Validation Error"
                    text="Please fix the errors in the form."
                    confirmButtonColor="#3085d6"
                    confirmButtonText="OK"
                    onClose={() => setIsFormValid(true)}
                />
            )}
        </div>
    );
};

export default StudentAccountForm;
