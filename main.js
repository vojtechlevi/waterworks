import { threeInit } from "./modules/threeInit";

import {
  valuesStartEnd,
  measureLocation,
  fetchSiteData,
} from "./modules/fetchApi.js";

fetchSiteData("MolndalCentrum").then((siteData) => {
  console.log(`SG: ${siteData.sg}`);
  console.log(`DG: ${siteData.dg}`);

  valuesStartEnd("2023-01-01", "2023-12-31", "MolndalCentrum").then(
    (measurements) => {
      measurements.forEach((measurement) => {
        console.log(`Date: ${measurement.date}`);
        console.log(`Value: ${measurement.value}`);
      });
    }
  );
});

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
