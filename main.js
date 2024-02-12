import * as THREE from "https://threejs.org/build/three.module.js";
import { GUI } from "dat.gui";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "/node_modules/three/examples/jsm/loaders/STLLoader";
import { DragControls } from "/node_modules/three/examples/jsm/controls/DragControls.js";

var objects = [];
//SCENE
const scene = new THREE.Scene();

//SETTINGS
var settings = {
  board_size: ["9x9", "13x13", "19x19"],
  background_colour: "#22CBFF",
  blackstone: function () {
    //STL 3D MODEL LOADER (STONES)
    const loader = new STLLoader();
    loader.load("/models/gostone.stl", function (blackstone) {
      const black = new THREE.MeshBasicMaterial({
        color: 0x000,
      });
      const blackmesh = new THREE.Mesh(blackstone, black);
      blackmesh.scale.set(0.01, 0.01, 0.01);
      blackmesh.rotateX(80);
      blackmesh.position.set(0.1, 0.05, 0.1);
      scene.add(blackmesh);
      objects.push(blackmesh);
    });
  },

  whitestone: function () {
    //STL 3D MODEL LOADER (STONES)
    const loader = new STLLoader();
    loader.load("/models/gostone.stl", function (whitestone) {
      const white = new THREE.MeshBasicMaterial();
      const whitemesh = new THREE.Mesh(whitestone, white);
      whitemesh.scale.set(0.01, 0.01, 0.01);
      whitemesh.rotateX(80);
      whitemesh.position.set(0.1, 0.05, 0);
      scene.add(whitemesh);
      objects.push(whitemesh);
    });
  },

  reset:function(objects, whitemesh, blackmesh){
    scene.remove(whitemesh,blackmesh);
    console.log("Reset")

  }
};

scene.background = new THREE.Color(settings.background_colour);

//GUI
const gui = new GUI();

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

//RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

//WINDOW RESIZE
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// 9x9 board
const texture2 = new THREE.TextureLoader().load("/textures/9x9.png");
const geometry2 = new THREE.BoxGeometry(4.5, 0.1, 4.5);
const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
const cube2 = new THREE.Mesh(geometry2, material2);

// 13x13 board
const texture3 = new THREE.TextureLoader().load("/textures/13x13.png");
const geometry3 = new THREE.BoxGeometry(4.5, 0.1, 4.5);
const material3 = new THREE.MeshBasicMaterial({ map: texture3 });
const cube3 = new THREE.Mesh(geometry3, material3);

// 19x19 board
const texture1 = new THREE.TextureLoader().load("/textures/19x19.png");
const geometry = new THREE.BoxGeometry(4.5, 0.1, 4.5);
const material = new THREE.MeshBasicMaterial({ map: texture1 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//BOARD SIZE GUI
gui
  .add(settings, "board_size", ["9x9", "13x13", "19x19"])
  .onChange(function (board_size) {
    scene.remove(cube);

    if (board_size == "19x19") {
      scene.remove(cube, cube2, cube3);
      scene.add(cube);
    } else if (board_size == "13x13") {
      scene.remove(cube, cube2, cube3);
      scene.add(cube3);
    } else if (board_size == "9x9") {
      scene.remove(cube, cube2, cube3);
      scene.add(cube2);
    }
  })
  .name("Board size");

gui.add(settings, "blackstone").name("Add Black Stone");
gui.add(settings, "whitestone").name("Add White Stone");
gui.add(settings, "reset").name("Reset stones")


var objects = [];

//DRAG AND DROP CONTROLS
const maxX = 4.5; // Maximum allowed X position
const maxZ = 4.5; // Maximum allowed Z position


const dndcontrols = new DragControls(objects, camera, renderer.domElement);
dndcontrols.addEventListener("dragstart", function () {
  controls.enabled = false;
//   objects.position.y.set = 0.1;
});

dndcontrols.addEventListener ( 'drag', function( event ){
    event.object.position.y = 0.05; // Set Y position to 1
});

dndcontrols.addEventListener("dragend", function () {
    // objects.position.z=1
    // objects.position.y = 1;

  controls.enabled = true;
});


