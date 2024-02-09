import * as THREE from "https://threejs.org/build/three.module.js";
import { GUI } from "dat.gui";
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
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000 
);
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(0, 0, 0);
// camera.position.set( 0, 20, 100 );
// controls.update();


//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;


//WINDOW RESIZE
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // render()
}

//RAYCASTING

// Render the scene
function animate() {

  requestAnimationFrame(animate);
  controls.update();

  // Rotate the cube
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
}

animate();

//LOAD TEXTURES
const texture1 = new THREE.TextureLoader().load('/textures/19x19.png' );




//CUBE
const geometry = new THREE.BoxGeometry(4.5, 0.1, 4.5);
// const material = new THREE.MeshBasicMaterial({ color: "#e09d38" });
const material = new THREE.MeshBasicMaterial( { map:texture1 } );


const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
