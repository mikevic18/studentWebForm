import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

export default function DropDown({onSelectChange}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await fetch("https://studentapiuoltest.azurewebsites.net/api/subjects");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
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

  function populateDropdownOptions(options) {
    return options.map(option => (
      <option key={option.subjectId} value={option.subjectId}>
        {option.title}
      </option>
    ));
  }
useEffect(() => {
    async function initializeDropdowns() {
      const fetchedData = await fetchData();
      if (fetchedData.length === 0) {
        // Handle the case where there is no data available
        console.warn('No data available to populate the dropdowns.');
        return;
      }
      setData(fetchedData);
      setLoading(false);
    }
    initializeDropdowns();
  }, []);

  useEffect(() => {
    async function initializeDropdowns() {
      const fetchedData = await fetchData();
      if (fetchedData.length === 0) {
        // Handle the case where there is no data available
        console.warn('No data available to populate the dropdowns.');
        return;
      }
      setData(fetchedData);
      setLoading(false);
    }
    initializeDropdowns();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <select id="dropdown1" onChange={(e) => {
        const selectedId = e.target.value;
        const selectedTitle = e.target.options[e.target.selectedIndex].text;
        updateDropdown(selectedId);
        onSelectChange(selectedId, selectedTitle);
      }}>
        <option value="">Please select an option</option>
        {populateDropdownOptions(data)}
      </select>
      <br />
      <select id="dropdown2" onChange={(e) => {
        const selectedId = e.target.value;
        console.log(selectedId);
        const selectedTitle = e.target.options[e.target.selectedIndex].text;
        updateDropdown(selectedId);
        onSelectChange(selectedId, selectedTitle);
      }}>
        <option value="">Please select another option</option>
        {populateDropdownOptions(data)}
      </select>
    </div>
  );
}