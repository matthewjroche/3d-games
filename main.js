import * as THREE from 'https://threejs.org/build/three.module.js';
import {GUI} from 'dat.gui';

//initialise GUI
const gui = new GUI();
var obj = { add:function(){ console.log("clicked") }};

gui.add(obj,'add').name('9x9 gobban');
gui.add(obj,'add').name('13x13 gobban');
gui.add(obj,'add').name('19x19 gobban');





const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


const cube = new THREE.Mesh(geometry, material)

scene.add(cube);


camera.position.z = 5;

        // Set up the renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Render the scene
        function animate() {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // Render the scene
            renderer.render(scene, camera);
        }

        animate();