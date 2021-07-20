import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";

// Variables necesarias para la escena:
let scene, camera, renderer;

// Creamos la escena y le asignamos neblina roja:
scene = new THREE.Scene();
scene.background = new THREE.Color(0xAC4D00);
scene.fog = new THREE.Fog(0xf50000, 1.5, 8);

// Ponemos la cámara y la posicionamos:
camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
// Acercamos o alejamos la cámara:
// camera.position.z = 2;
camera.position.set(3,2,2);

// Renderizador:
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creamos los controladores:
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Agregamos la luz a la escena:
const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 3.5);
// var light = new THREE.AmbientLight(0x404040, 7);
scene.add(light);

// AÑADIMOS EL LOADER CON EL MODELO DE BLENDER:
const loader = new GLTFLoader(); // LOADER 
loader.load( './js/mircha.glb', function ( gltf ) { // MODELO BLENDER
    // gltf.scene.scale.set(1.5,1.5,1.5);
    scene.add( gltf.scene);
    } );

// REDIMENSIONAMIENTO DE LA VENTANA:
window.addEventListener("resize", function(){
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            render(scene, camera);
        });

// Función de Animación: 
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Llamada a la función:
animate();