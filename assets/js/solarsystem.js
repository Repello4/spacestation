

const sun = document.querySelector(".sun");

const solarSystem = document.querySelector(".solar-system");

const sunRect = sun.getBoundingClientRect();

const sunPosition = {
    x: sunRect.left + window.scrollX,
    y: sunRect.top + window.scrollY
};
console.log(`Sun Position - X: ${sunPosition.x}, Y: ${sunPosition.y}`);



const venus = {

    theta: 3.14, //Starting position
    speed: 0.0015, //Speed of the planet
    radius: 12.5, //Radius of the planet
    adjX: 0, //Adjustment of the x position
    adjY: 30, //Adjustment of the y position
    el: document.querySelector(".venus"),
    orbit: 12.5/4,
    low: 3, 
    high: 7,
};



const earth = {
    theta: 5,
    speed: 0.0015,
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
    theta: 0.32,
    speed: 0.0015,
    radius: 10,
    adjX: 0,
    adjY: 30,
    orbit: 2.3,
    low: 4,
    high: 6,
    el: document.querySelector(".neptune"),
};




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




// Draw orbits once when the page loads
drawOrbitPath(venus);
drawOrbitPath(earth);
drawOrbitPath(neptune);


requestAnimationFrame(animate);

function togglePlanetSpeed(planet, speed) {
    if (planet.speed != 0) {
        stopPlanet(planet);
    } else {
        planet.speed = speed;
        resetSkills();
    }
}

venus.el.addEventListener("click", () => {
    togglePlanetSpeed(venus, 0.0015);
});

earth.el.addEventListener("click", () => {
    togglePlanetSpeed(earth, 0.0015);
});

neptune.el.addEventListener("click", () => {
    togglePlanetSpeed(neptune, 0.0015);
});


function stopPlanet(planet){
    planet.speed = 0;
    showSkills(planet.el.className);

}



// Show skills
function showSkills(planet) {


 
    if (planet === 'sun'){
        resetSkills();
    }
    else {
        const skillsList = document.querySelector(`.${planet} .skills-list`);
        const infoDisplay = document.querySelector('.info-display');
        infoDisplay.innerHTML = skillsList.innerHTML;
        infoDisplay.style.display = 'block';
    }
}


function resetSkills(){
    const infoDisplay = document.querySelector('.info-display');
    message = '"A brilliant AI engineer harmonizes their tools, crafting a solar system of innovation and balance" <br> ~ Your Mother'
    infoDisplay.innerHTML = `<div style = 'text-align: center; vertical-align: middle; height: 100%; display: flex; justify-content: center; align-items: center;'><blockquote>${message}</blockquote></div>`;
    infoDisplay.style.display = 'block';
}