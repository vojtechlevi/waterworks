import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

const waterPlaneName = "WaterPlane";

export async function water(scene) {
  const waterObjects = [];

  const waterPlanes = findWaterPlane(scene);

  for (const object of waterPlanes) {
    const water = await createWaterFromPlaneGeometry(object, scene);
    waterObjects.push(water);
    object.parent.remove(object);
    scene.add(water);
  }

  return waterObjects;
}

function findWaterPlane(scene) {
  const waterPlanes = [];

  scene.traverse((object) => {
    if (object.isMesh && object.name === waterPlaneName) {
      waterPlanes.push(object);
    }
  });

  return waterPlanes;
}

async function createWaterFromPlaneGeometry(object, scene) {
  return new Promise((resolve) => {
    object.geometry.computeBoundingBox();

    const boundingBox = object.geometry.boundingBox;

    const width = boundingBox.max.x - boundingBox.min.x;
    const length = boundingBox.max.z - boundingBox.min.z;

    const waterGeometry = new THREE.PlaneGeometry(width, length);

    new THREE.TextureLoader().load("/Water normals.jpg", (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      let waterOptions = {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: texture,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xfcbe60,
        waterColor: 0x889136,
        distortionScale: 3.7,
        fog: scene.fog !== undefined,
      };

      const water = new Water(waterGeometry, waterOptions);

      water.rotation.x = -Math.PI / 2;
      water.position.copy(object.position);
      resolve(water);
    });
  });
}

export function animateWater(water) {
  water.material.uniforms["time"].value += 1.0 / 360.0;
}
