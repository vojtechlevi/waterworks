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
