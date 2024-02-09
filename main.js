import * as THREE from "https://threejs.org/build/three.module.js";
import { GUI } from "dat.gui";
// import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
//SCENE
const scene = new THREE.Scene();

//SETTINGS
var settings = {
  board_size: ["9x9", "13x13", "19x19"],
  background_colour: "#22CBFF",
};

scene.background = new THREE.Color(settings.background_colour);

//GUI
const gui = new GUI();

gui
  .add(settings, "board_size", ["9x9", "13x13", "19x19"])
  .name("Board size")
  .listen();

gui
  .addColor(settings, "background_colour")
  .onChange(function (value) {
    scene.background.set(value);
  })
  .name("Background colour")
  .listen();

//CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

//CUBE
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// Render the scene
function animate() {
    controls.update();

  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

animate();
