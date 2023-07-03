import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(50);
camera.position.setY(45);

renderer.render(scene, camera);

// Światło
const pointLight = new THREE.PointLight(0x00C0C8);

pointLight.position.set(0, 45, 50);

const pointLight2 = new THREE.PointLight(0x00C0C8);

pointLight2.position.set(-10, 25, 50);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, pointLight2, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

// Tlo - ocean
const oceanTexture = new THREE.TextureLoader().load('./img/ocean.jpg');
const oceanMaterial = new THREE.MeshBasicMaterial({ map: oceanTexture });

oceanMaterial.side = THREE.BackSide;

const ocean = new THREE.Mesh(
  new THREE.SphereGeometry( 320, 640, 100 ), 
  oceanMaterial
  );
scene.add(ocean);

// Tlo - babelki

const bubbles = [];

function addBubble() { 

  const materialBubble = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.1,
    metalness: 0.1,
    transparent: true,
    opacity: 0.5,
  });

  let size = Math.random() * (0.4 - 0.2) + 0.1;

  const geometryBubble = new THREE.SphereGeometry(size, 24, 24);

  const bubble = new THREE.Mesh(geometryBubble, materialBubble);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  bubble.position.set(x, y, z);

  bubbles.push(bubble);

  scene.add(bubble);
}

Array(600).fill().forEach(addBubble);

// Spowoduj, aby bańki unosiły się do góry, a po dotarciu na górę przesuń je na dół
function moveBubbles() {
  bubbles.forEach(bubble => {
    bubble.position.y += 0.015;
    if (bubble.position.y > 50) {
      bubble.position.y = -50;
    }
  });
}

// Tlo - obiekt stworzony z zdjęcia
const zdjecieTexture = new THREE.TextureLoader().load('./img/zdjecie.png');

const zdjecie = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ 
    map: zdjecieTexture,
    metalness: 0.8
   })
);

zdjecie.position.z = 42; 
zdjecie.position.y = 18; 
zdjecie.position.x = 1; 

// Animacja obiektu zdjecie symulująca unoszenie się i opadanie
const zdjecieUp = 0.005;
const zdjecieDown = -0.004;
let zdjecieDirection = zdjecieUp;

function moveZdjecie() {
  zdjecie.position.y += zdjecieDirection;
  if (zdjecie.position.y > 25) {
    zdjecieDirection = zdjecieDown;
  } else if (zdjecie.position.y < 18) {
    zdjecieDirection = zdjecieUp;
  }
  zdjecie.rotation.y += 0.002;
  zdjecie.rotation.x += 0.002;
}

scene.add(zdjecie);

const githubTexture = new THREE.TextureLoader().load('./img/github.png');

const githubLogo = new THREE.Mesh(
  new THREE.PlaneGeometry( 9, 9),
  new THREE.MeshStandardMaterial({ 
    map: githubTexture,
    side: THREE.DoubleSide,
    metalness: 0.2
   })
);

githubLogo.position.z = 42;
githubLogo.position.y = -2;
githubLogo.position.x = -8;

scene.add(githubLogo);

function moveGithubLogo() {
  githubLogo.rotation.y += 0.002;
}

// Ruch kamery
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = 45 + (t * 0.03);
  camera.position.x = (t * 0.015);
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  moveZdjecie();
  moveGithubLogo();

  controls.update();

  moveBubbles();
  
  renderer.render(scene, camera);
}

animate();