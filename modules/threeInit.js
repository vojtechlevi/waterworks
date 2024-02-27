import * as THREE from "three";
import { LoadGLTFByPath } from "./threeHelpers";
import { animateWater, water } from "./threeWater";
import { isPlaying, playFunction } from "./playpause-icon";
import { playbtn } from "../main";
import { formatDate } from "./displaydate";

const loadingScreen = document.querySelector("#three-loading");

let measurements = [];
export let sgDg = { sg: 0, dg: 1 };
export let targetLevel = 0;
export let targetPercentage = 0;
let index = 0;
export let currentLevel = 0;
let isWaterTimedOut = false;

function calcWaterLevel(sg, dg, level) {
  dg = dg < level.value ? level.value : dg;
  let calculatedLevel = (level.value - sg) / (dg - sg);
  return calculatedLevel;
}
function calcWaterLevelForWaterContainer(sg, dg, level) {
  dg = dg < level.value ? level.value : dg;
  let calculatedLevel = ((level.value - sg) / (dg - sg)) * 100;
  return calculatedLevel;
}

export function setMeasurements(data) {
  measurements = data.measurements;
  sgDg = data.sgDg;
  console.log(sgDg);
  console.log(measurements);
  targetLevel = calcWaterLevel(sgDg.sg, sgDg.dg, measurements[index]);

  formatDate(measurements[index].date);
  targetPercentage = calcWaterLevelForWaterContainer(
    sgDg.sg,
    sgDg.dg,
    measurements[index]
  );
}

export async function threeInit() {
  let scene, camera, renderer, waterList;
  let cameraList = [];

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  LoadGLTFByPath(scene, "/waterworks.gltf")
    .then(async () => {
      retrieveListOfCameras(scene);
      waterList = await water(scene);
    })
    .catch((error) => {
      console.error("Error loading JSON scene:", error);
    });

  //retrieve list of all cameras
  function retrieveListOfCameras(scene) {
    // Get a list of all cameras in the scene
    scene.traverse(function (object) {
      if (object.isCamera) {
        cameraList.push(object);
      }
    });

    camera = cameraList[0];

    updateCameraAspect(camera);

    loadingScreen.classList.add("hidden");

    animate();
  }

  function updateCameraAspect(camera) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    requestAnimationFrame(animate);

    if (waterList != undefined && waterList.length > 0) {
      waterList.forEach((water) => {
        if (measurements.length && isPlaying && !isWaterTimedOut) {
          const currentWaterLevel = water.position.y;

          if (Math.abs(currentWaterLevel - targetLevel) < 0.007) {
            water.position.y = targetLevel;

            index++;
            if (index > measurements.length - 1) {
              playFunction(playbtn);
              index = 0;
              return;
            }
            if (index < measurements.length) {
              isWaterTimedOut = true;
              setTimeout(() => {
                formatDate(measurements[index].date);
                targetLevel = calcWaterLevel(
                  sgDg.sg,
                  sgDg.dg,
                  measurements[index]
                );
                targetPercentage = calcWaterLevelForWaterContainer(
                  sgDg.sg,
                  sgDg.dg,
                  measurements[index]
                );
                currentLevel = measurements[index].value;
                isWaterTimedOut = false;
              }, 1000);
            }
          } else {
            const adjustment = currentWaterLevel < targetLevel ? 0.007 : -0.007;
            water.position.y += adjustment;
          }
        }
        animateWater(water);
      });
    }

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
