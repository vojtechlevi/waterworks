import * as THREE from "three";
import { LoadGLTFByPath } from "./threeHelpers";
import { animateWater, water } from "./threeWater";

let measurements = [];
let sgDg = { sg: 0, dg: 1 };
let targetLevel = 0;

function calcWaterLevel(sg, dg, level) {
  console.log((level.value - sg) / (dg - sg));
  return (level.value - sg) / (dg - sg);
}

export function setMeasurements(data) {
  measurements = data.measurements;
  sgDg = data.sgDg;

  targetLevel = calcWaterLevel(sgDg.sg, sgDg.dg, measurements[0]);
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
        if (measurements.length) {
          const currentWaterLevel = water.position.y;
          const adjustment = currentWaterLevel < targetLevel ? 0.001 : -0.001;
          water.position.y += adjustment;
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
