async function fetchData() {
    try {
      const response = await fetch("https://studentapiuoltest.azurewebsites.net/api/subjects");
      
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // Display the error using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
  
      return [];
    }
  }

  // Function to populate the dropdown options
  function populateDropdown(dropdown, options) {
    dropdown.innerHTML += options.map(option => `<option value="${option.subjectId}">${option.title}</option>`).join('');
  }

  // Function to update the other dropdown based on the selection
  function updateDropdown(selectedId) {
    const dropdown1 = document.getElementById("dropdown1");
    const dropdown2 = document.getElementById("dropdown2");

    if (selectedId !== null) {
      dropdown1.disabled = true;
      dropdown2.disabled = true;
      
      // Remove the selected option from the other dropdown
      const otherDropdown = dropdown1.value === selectedId ? dropdown2 : dropdown1;
      const options = Array.from(otherDropdown.options);
      for (const option of options) {
        if (option.value === selectedId) {
          option.disabled = true;
        }
      }

      dropdown1.disabled = false;
      dropdown2.disabled = false;
    }
  }

  // Main function to handle dropdown events and fetch data
  async function initialize() {
    const data = await fetchData();
    if (data.length === 0) {
        // Show a message using SweetAlert when there is no data available
        Swal.fire({
          icon: 'info',
          title: 'No Data Available',
          text: 'There is no data available to populate the dropdowns.',
        });
    
        return;
      }


    const dropdown1 = document.getElementById("dropdown1");
    const dropdown2 = document.getElementById("dropdown2");
    const selectedOptions = {};

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.innerHTML = "Please select an option";
    dropdown1.appendChild(placeholderOption.cloneNode(true));
    placeholderOption.innerHTML = "Please select another option";
    dropdown2.appendChild(placeholderOption.cloneNode(true));


    // Populate both dropdowns
    populateDropdown(dropdown1, data);
    populateDropdown(dropdown2, data);

    // Add event listeners to both dropdowns
    dropdown1.addEventListener("change", function () {
      const selectedId = this.value;
      const selectedTitle = this.options[this.selectedIndex].text;
      selectedOptions[selectedId] = selectedTitle;

      // Update the other dropdown and selectedOptions paragraph
      updateDropdown(selectedId);
    });

    dropdown2.addEventListener("change", function () {
      const selectedId = this.value;
      const selectedTitle = this.options[this.selectedIndex].text;
      selectedOptions[selectedId] = selectedTitle;

      // Update the other dropdown and selectedOptions paragraph
      updateDropdown(selectedId);
    });
  }

  // Initialize the dropdowns and data fetching
  initialize();