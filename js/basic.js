window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const box = document.createElement("a-box");
            box.setAttribute('class','box');
            box.setAttribute("geometry", {
                "width": 100, 
                "height": 50,
                "depth": 17
            });
            box.setAttribute('material', { "color": 'green' } );
            box.setAttribute('gps-new-entity-place', {
                latitude: 43.879755,
                longitude: 11.094394,
                position: '0 5 10' // added some elevation
            });
            const sphere = document.createElement("a-sphere");
            sphere.setAttribute("class","sphere");
            sphere.setAttribute("radius", 10);
            sphere.setAttribute('material', { "color": 'cyan' });
            sphere.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });
            sphere.setAttribute("position", "300 100 200")
            document.querySelector("a-scene").appendChild(box);
            document.querySelector("a-scene").appendChild(sphere);
        }
        testEntityAdded = true;
    });
};