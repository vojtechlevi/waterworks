import { threeInit } from "./modules/threeInit";

import {
  valuesStartEnd,
  measureLocation,
  fetchSiteData,
} from "./modules/fetchApi.js";

measureLocation().then((locations) => {
  const dropdown = document.getElementById("location");
  // Build options list from this data
  locations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location.Code;
    option.text = location.Description;

    dropdown.appendChild(option);
  });
});

document
  .querySelector('form[name="data"]')
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startdate").value;
    const endDate = document.getElementById("enddate").value;

    fetchSiteData(location).then((siteData) => {
      console.log(`SG: ${siteData.sg}`);
      console.log(`DG: ${siteData.dg}`);

      valuesStartEnd(startDate, endDate, location).then((measurements) => {
        measurements.forEach((measurement) => {
          console.log(`Date: ${measurement.date}`);
          console.log(`Value: ${measurement.value}`);
        });
      });
    });
  });

threeInit();

const today = new Date().toISOString().split("T")[0];

document.getElementById("startdate").setAttribute("max", today);
document.getElementById("enddate").setAttribute("max", today);

const startDateInput = document.getElementById("startdate");
const endDateInput = document.getElementById("enddate");

startDateInput.addEventListener("change", function () {
  endDateInput.min = this.value;
});
