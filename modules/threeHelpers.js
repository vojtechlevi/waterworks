import { GLTFLoader } from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export const LoadGLTFByPath = (scene, path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      path,
      (gltf) => {
        scene.add(gltf.scene);

        resolve();
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};
