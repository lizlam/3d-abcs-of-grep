import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const canvas = document.querySelector('canvas.webgl');

const sizes = { width: 800, height: 600 };

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry (1, 1, 1);
const material = new THREE.MeshBasicMaterial({ 
//  wireframe: true 
});
const mesh = new THREE.Mesh(geometry, material);
//scene.add(mesh);

const loader = new FontLoader();
let strings = [
  "Use the -A flag to show the lines after the matching search term is found.",
  "Use the -B flag to show the lines before the matching search term is found.",
  "Use the -C flag to show the lines of context around the matching search term."
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let string = strings[getRandomInt(strings.length)];
loader.load('helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry(string, {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true, 
    bevelThickness: 0.03, 
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 14;
camera.position.x = 0;
camera.position.y = 0;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
