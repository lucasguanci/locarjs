window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const entity = document.createElement("a-box");
            entity.setAttribute('class','box');
            entity.setAttribute("geometry", {
                "width": 100, 
                "height": 50,
                "depth": 17
            });
            entity.setAttribute('material', { "color": 'green' } );
            entity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude,
                position: '0 5 10' // added some elevation
            });
            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
};