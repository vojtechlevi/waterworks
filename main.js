import { threeInit } from "./modules/threeInit";

import {
  valuesStartEnd,
  measureLocation,
  fetchSiteData,
} from "./modules/fetchApi.js";

fetchSiteData("MolndalCentrum").then((siteData) => {
  console.log(`SG: ${siteData.sg}`);
  console.log(`DG: ${siteData.dg}`);

  valuesStartEnd("2023-01-01", "2023-01-02", "MolndalCentrum").then(
    (measurements) => {
      measurements.forEach((measurement) => {
        console.log(`Date: ${measurement.date}`);
        console.log(`Value: ${measurement.value}`);
      });
    }
  );
});

measureLocation().then((locations) => {
  //bygg options lista från denna data
  console.log(locations);
});

threeInit();

document
  .querySelector('form[name="data"]')
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startdate").value;
    const endDate = document.getElementById("enddate").value;

    console.log("Location:", location);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  });
