import * as THREE from "three";

export function water(scene) {
  const planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x5b8ec7,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = Math.PI / 2;
  scene.add(plane);
  return plane;
}
