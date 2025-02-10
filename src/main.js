/**
 * LocAR.js Tutorial - Part 2
 * https://github.com/AR-js-org/locar.js/blob/master/docs/tutorial/part2.md
**/
import * as THREE from 'three';
import * as LocAR from 'locar';

// global variables
var scene, camera, renderer, deviceOrientationControls;
var locar, cam;
var box, cube;

// button to use on iOS 13+ to enable deviceOrientationControls
const overlay = document.getElementById("overlay")
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener('click', e => {
  document.body.removeChild(overlay);
  init();
});

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

  let firstLocation = true;

  // Create the device orientation tracker
  deviceOrientationControls = new LocAR.DeviceOrientationControls(camera);

  locar.on("gpsupdate", (pos, distMoved) => {
    if (firstLocation) {
      alert(`Got the initial location: longitude ${pos.coords.longitude}, latitude ${pos.coords.latitude}`);
      box = new THREE.BoxGeometry(2,2,2);
      cube = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
      locar.add(cube, 11.094534, 43.879913);

      firstLocation = false;
    }
  });
  // use fake GPS
  // locar.fakeGps(-0.72, 51.05);
  // locar.add(cube, -0.72, 51.0501);

  locar.startGps();

  renderer.setAnimationLoop(animate);    
}


function animate() {
  cam.update();
  // Update the scene using the latest sensor readings
  deviceOrientationControls.update();
  renderer.render(scene, camera);
}



// 11.094534, 43.879913