/**
 * LocAR.js Tutorial - Part 2
 * https://github.com/AR-js-org/locar.js/blob/master/docs/tutorial/part2.md
**/
import * as THREE from 'three';
import * as LocAR from 'locar';

// global variables
var scene, camera, renderer;
var locar, cam, deviceOrientationControls;
var box, cube;

window.onload = (e) => {
  console.log("page loaded, proceed to init");
  const overlay = document.getElementById("overlay");
  const startBtn = document.getElementById("btnStart");
  startBtn.addEventListener('click', function(e) {
    document.body.removeChild(overlay);
    init();
  });
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.001, 100);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;    
    camera.updateProjectionMatrix();
  });

  locar = new LocAR.LocationBased(scene, camera);
  cam = new LocAR.WebcamRenderer(renderer);
  deviceOrientationControls = new LocAR.DeviceOrientationControls(camera);

  let firstLocation = true;
  locar.on("gpsupdate", (pos, distMoved) => {
    if (firstLocation) {
      alert(`Got the initial location: longitude ${pos.coords.longitude}, latitude ${pos.coords.latitude}`);
      box = new THREE.BoxGeometry(2,2,2);
      cube = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
      locar.add(cube, 11.094534, 43.879913);

      firstLocation = false;
    }
  });

  locar.startGps();

  renderer.setAnimationLoop(animate);    
}

function animate() {
  cam.update();
  deviceOrientationControls.update();
  renderer.render(scene, camera);
}
