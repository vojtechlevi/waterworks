import { threeInit, setMeasurements } from "./modules/threeInit";

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
      // console.log("sgdg: ", siteData);

      valuesStartEnd(startDate, endDate, location).then((measurements) => {
        // console.log("levels: ", measurements);
        setMeasurements({ measurements, sgDg: siteData });
      });
    });
  });

threeInit();
