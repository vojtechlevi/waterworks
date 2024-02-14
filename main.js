
import { threeInit } from "./modules/threeInit";

import {
  valuesStartEnd,
  measureLocation,
  fetchSiteData,
} from "./modules/fetchApi.js";

measureLocation().then((locations) => {
  //bygg options lista från denna data
  console.log(locations);
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
