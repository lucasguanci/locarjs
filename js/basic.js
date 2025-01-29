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
                "width": 5, 
                "height": 5,
                "depth": 2
            });
            box.setAttribute('material', { "color": 'green' } );
            box.setAttribute('gps-new-entity-place', {
                latitude: 43.879866212532654,
                longitude: 11.094446499969672
            });
            const sphere = document.createElement("a-sphere");
            sphere.setAttribute("class","sphere");
            sphere.setAttribute("radius", 10);
            sphere.setAttribute('material', { "color": 'cyan' });
            sphere.setAttribute('gps-new-entity-place', {
                latitude: 43.87976445800282,
                longitude: 11.094337367967924
            });
            document.querySelector("a-scene").appendChild(box);
            document.querySelector("a-scene").appendChild(sphere);
        }
        testEntityAdded = true;
    });
};