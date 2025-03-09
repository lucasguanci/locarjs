# Testing LocAR.js

Using LocAR.js to develop a location-based web-app running both on iOS and Android.


I started from LocAR.js Tutorial - Part 2 that has been modified to:
- enable _device orientation_ on iOS.
In order to do this, you just need to add a button with an event listener attached to it (see btnStart div in index.html), thus prompting an alert message which enables device orientation;
- make use of webkit absoluteDeviceOrientationControl, see AR-js-org/AR.js#466 and also https://github.com/mrdoob/three.js/blob/1ee2fca970e3afdc26e6c2a47c14e9e2b784ae48/examples/jsm/controls/DeviceOrientationControls.js
I included the proposed modification in src/main.js calling AbsoluteDeviceOrientationControls() after having defined the scene and camera objects.

The model displays an animated flag imported as a glb file.

A demo version is available at https://www.idrovolante.org/demo/AR

## Notes
1m is about 0.000009° of latitude
1m is about 0.000013° of longitude @45° latitude