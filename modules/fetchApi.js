let siteData = null;

export function fetchSiteData(location) {
  return fetch(
    `https://data.goteborg.se/RiverService/v1.1/MeasureSites/2e864a63-859d-46b7-9c87-dd966f87595e/${location}?format=json`
  )
    .then((response) => response.json())
    .then((data) => ({
      sg: data.SG,
      dg: data.DG,
    }))
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function valuesStartEnd(startDate, endDate, location) {
  return fetch(
    `https://data.goteborg.se/RiverService/v1.1/Measurements/2e864a63-859d-46b7-9c87-dd966f87595e/${location}/Level/${startDate}/${endDate}?dailyaveragevalues=true&format=json`
  )
    .then((response) => response.json())
    .then((data) =>
      data.map((entry) => ({
        value: entry.Value,
        date: new Date(parseInt(entry.TimeStamp.substr(6))),
      }))
    )
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function measureLocation() {
  return fetch(
    "https://data.goteborg.se/RiverService/v1.1/MeasureSites/2e864a63-859d-46b7-9c87-dd966f87595e?format=json"
  )
    .then((response) => response.json())
    .then((data) =>
      data
        .filter((entry) => entry.hasOwnProperty("SG"))
        .map((entry) => ({
          Code: entry.Code,
          Description: entry.Description,
        }))
    )
    .catch((error) => {
      console.error("Error:", error);
    });
}
