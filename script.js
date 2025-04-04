window.onload = () => {
    const dropdown = document.getElementById('destination');
    dropdown.addEventListener('change', () => {
        const selected = dropdown.value;
        let place, model;

        if (selected === 'pokemon') {
            place = {
                name: 'Pokémon',
                location: { lat: 14.698405, lng: 120.978640 }
            };
            model = models[0];
        } else if (selected === 'articuno') {
            place = {
                name: 'Articuno',
                location: { lat: 14.698450, lng: 120.978700 }
            };
            model = models[1];
        } else if (selected === 'dragonite') {
            place = {
                name: 'Dragonite',
                location: { lat: 14.698500, lng: 120.978750 }
            };
            model = models[2];
        }

        renderSelectedPlace(place, model);
    });

    // Initial trigger
    dropdown.dispatchEvent(new Event('change'));
};

function renderSelectedPlace(place, model) {
    const scene = document.querySelector('a-scene');
    
    // Remove any old model
    const oldModel = document.getElementById('ar-model');
    if (oldModel) oldModel.remove();

    const latitude = place.location.lat;
    const longitude = place.location.lng;

    const entity = document.createElement('a-entity');
    entity.setAttribute('id', 'ar-model');
    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('animation-mixer', '');

    scene.appendChild(entity);

    const infoBox = document.querySelector('.instructions');
    if (infoBox) infoBox.innerText = model.info;
}

var models = [
    {
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        info: 'Magnemite, Lv. 5, HP 10/10',
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
    },
];
