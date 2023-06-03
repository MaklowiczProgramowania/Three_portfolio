import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PMREMGenerator } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);

renderer.render(scene, camera);

// Światło
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

// Tlo - ocean
const oceanTexture = new THREE.TextureLoader().load('ocean.jpg');
const oceanMaterial = new THREE.MeshBasicMaterial({ map: oceanTexture });

oceanMaterial.side = THREE.BackSide;

const ocean = new THREE.Mesh(
  new THREE.SphereGeometry( 190, 640, 100 ), 
  oceanMaterial
  );
scene.add(ocean);

const bubbles = [];

function addBubble() {

  const materialBubble = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.5,
  });

  let size = Math.random() * (0.3 - 0.2) + 0.2;

  const geometryBubble = new THREE.SphereGeometry(size, 24, 24);

  const bubble = new THREE.Mesh(geometryBubble, materialBubble);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  bubble.position.set(x, y, z);

  bubbles.push(bubble);

  scene.add(bubble);
}

Array(500).fill().forEach(addBubble);

// Make bubbles move up, and after reaching the top move them to the bottom 
function moveBubbles() {
  bubbles.forEach(bubble => {
    bubble.position.y += 0.05;
    if (bubble.position.y > 50) {
      bubble.position.y = -50;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  moveBubbles();
  
  renderer.render(scene, camera);
}

animate();