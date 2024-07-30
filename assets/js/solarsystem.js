
const sun ={
    name:"sun",
    speed: 1,
    speed2: 1,
    el: document.querySelector(".sun"),
}

const solarSystem = document.querySelector(".solar-system");

const sunRect = sun.el.getBoundingClientRect();

const sunPosition = {
    x: sunRect.left + window.scrollX,
    y: sunRect.top + window.scrollY
};
console.log(`Sun Position - X: ${sunPosition.x}, Y: ${sunPosition.y}`);



const venus = {
    name: "venus",
    theta: 3.14, //Starting position
    speed: 0.001, //Speed of the planet
    speed2: 0.001,
    radius: 12.5, //Radius of the planet
    adjX: 0, //Adjustment of the x position
    adjY: 30, //Adjustment of the y position
    el: document.querySelector(".venus"),
    orbit: 12.5/4,
    low: 3, 
    high: 7,
};

const earth = {
    name: "earth",
    theta: 5,
    speed: 0.0006,
    speed2: 0.0006,
    radius: 15,
    adjR: 1.5,
    adjX: 0,
    adjY: 30,
    orbit: 3,
    low: 2,
    high: 8,
    el: document.querySelector(".earth"),
};

const neptune = {
    name: "neptune",
    theta: 1.5,
    speed: 0.0018,
    speed2: 0.0018,
    radius: 10,
    adjX: 0,
    adjY: 30,
    orbit: 2.3,
    low: 4,
    high: 6,
    el: document.querySelector(".neptune"),
}; 

planets = [sun,venus, earth, neptune];


function update(planet) {

    planet.theta += planet.speed;

    const newTop = Math.cos(planet.theta) * planet.radius  + 50 ;
    const newLeft = Math.sin(planet.theta) * planet.radius * planet.orbit  + 50 ;

    planet.el.style.top = `${newTop}%`;
    planet.el.style.left = `${newLeft}%`;

    if (newTop > 50) {
        planet.el.style.zIndex = planet.high;
    } else {
        planet.el.style.zIndex = planet.low;
    }
}





function drawOrbitPath(planet) {


    for (let theta = 0; theta < 2 * Math.PI; theta += 0.01) {
        const newTop = Math.cos(theta) * planet.radius + 50;
        const newLeft = Math.sin(theta) * planet.radius * planet.orbit + 50;

        const orbit = document.createElement('div');
        orbit.style.position = 'absolute';
        orbit.style.width = '2px';
        orbit.style.height = '2px';
        orbit.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        orbit.style.borderRadius = '50%';
        orbit.style.top = `${newTop}%`;
        orbit.style.left = `${newLeft}%`;


        if (newTop > 50) {
            orbit.style.zIndex = '5';
        } else {
            orbit.style.zIndex = '0';
        }
        solarSystem.appendChild(orbit);
    }
}



function animate() {
    update(venus);
    update(earth);
    update(neptune);
    requestAnimationFrame(animate);
}


function togglePlanetSpeed(planet) {
    if (planet.speed != 0) {
        stopPlanet(planet);
        showSkills(planet.name);
        startPlanets(planet.name);
    } else {
        planet.speed = planet.speed2;
        planet.el.style.boxShadow = "none";
        resetSkills();
    }
}

function startPlanets(planet_name){
    
    for (let planet of planets){
        if (planet.name !== planet_name) {
            planet.speed = planet.speed2;
            planet.el.style.boxShadow = "none";
        }
    }
}

function stopPlanet(planet){
    planet.speed = 0;
    planet.el.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
    
}
// Show skills
function showSkills(planet) {


 

        const skillsList = document.querySelector(`.${planet} .skills-list`);
        const infoDisplay = document.querySelector('.info-display');
        infoDisplay.innerHTML = skillsList.innerHTML;
        infoDisplay.style.display = 'block';
    
}


function resetSkills(){
    const infoDisplay = document.querySelector('.info-display');
    const defaultInfo = document.querySelector('.default-info');
    infoDisplay.innerHTML = defaultInfo.innerHTML;
    infoDisplay.style.display = 'block';
}


venus.el.addEventListener("click", () => {
    togglePlanetSpeed(venus);
});

earth.el.addEventListener("click", () => {
    togglePlanetSpeed(earth);
});

neptune.el.addEventListener("click", () => {
    togglePlanetSpeed(neptune);
});
sun.el.addEventListener("click", () => {
    togglePlanetSpeed(sun);
});


// Draw orbits once when the page loads
drawOrbitPath(venus);
drawOrbitPath(earth);
drawOrbitPath(neptune);


requestAnimationFrame(animate);