import {
  threeInit,
  setMeasurements,
  targetPercentage,
  sgDg,
} from "./modules/threeInit";
import {
  valuesStartEnd,
  measureLocation,
  fetchSiteData,
} from "./modules/fetchApi.js";
import { FluidMeter } from "./modules/js-fluid-meter.js";
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
      valuesStartEnd(startDate, endDate, location).then((measurements) => {
        setMeasurements({ measurements, sgDg: siteData });
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

var fm3 = new FluidMeter();
fm3.init({
  targetContainer: document.getElementById("fluid-meter-3"),
  fillPercentage: 45,
  options: {
    fontSize: "30px",
    drawPercentageSign: true,
    drawBubbles: false,
    size: 300,
    borderWidth: 0,
    backgroundColor: "#e2e2e2",
    foregroundColor: "#1F2937",
    foregroundFluidLayer: {
      fillStyle: "#16E1FF",
      angularSpeed: 5,
      maxAmplitude: 5,
      frequency: 30,
      horizontalSpeed: -20,
    },
    backgroundFluidLayer: {
      fillStyle: "#4F8FC6",
      angularSpeed: 5,
      maxAmplitude: 3,
      frequency: 22,
      horizontalSpeed: 20,
    },
  },
});

window.onload = function () {
  setInterval(function () {
    fm3.setPercentage(targetPercentage);
  });
};
