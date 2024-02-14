import { threeInit } from "./modules/threeInit";

threeInit();

document
  .querySelector('form[name="data"]')
  .addEventListener("submit", function (event) {
    // Prevent the form from being submitted
    event.preventDefault();

    // Get the form elements
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startdate").value;
    const endDate = document.getElementById("enddate").value;

    // Log the form data
    console.log("Location:", location);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  });
