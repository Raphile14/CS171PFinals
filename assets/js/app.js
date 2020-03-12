// Declaration of Important Camera Variables
let scene, camera, renderer, control;
let keyboard = {};
let player = { height: 12, speed: 0.2, turnSpeed: Math.PI*0.02 };
let useWireframe = false;

// Declaration of Objects
let geometry;
let brickRoad, pedestrian;
let heart;

function init(){
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 100, 950); // FOG

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(-50, 30, 50); 
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Enable Shadows in the Renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    controls = new THREE.OrbitControls (camera, renderer.domElement);

    //================================== TEXTURES =================================
      textureBrickRoad = new THREE.TextureLoader().load('assets/textures/Bricks01_DISP_1K.jpg');
    //   textureBackground = new THREE.TextureLoader().load('assets/textures/bg.jpg');
    //   scene.background = textureBackground;
    //   textureGrass = new THREE.TextureLoader().load('assets/textures/floor.jpg');
    //   textureAbigail = new THREE.TextureLoader().load('assets/textures/abigail.jpg');
    //   textureRaphael = new THREE.TextureLoader().load('assets/textures/raphael.jpg');

    //================================= MATERIALS ================================
    let materialWhite = new THREE.MeshLambertMaterial({color:0xa2a8b3, wireframe:useWireframe});
    let materialBrickRoad = new THREE.MeshLambertMaterial({map: textureBrickRoad});
//   let materialAbigail = new THREE.MeshPhongMaterial({map: textureAbigail});
//   let materialRaphael = new THREE.MeshPhongMaterial({map: textureRaphael});
//   let materialPlane = new THREE.MeshPhongMaterial({color:0xa2a8b3});
//   let materialGrass = new THREE.MeshLambertMaterial({map: textureGrass, wireframe:useWireframe});

    //================================== MODIFY TEXTURE ==================================
    textureBrickRoad.wrapS = THREE.RepeatWrapping;
    textureBrickRoad.wrapT = THREE.RepeatWrapping;
    textureBrickRoad.offset.set(0, 0);
    textureBrickRoad.repeat.x = 10;
    textureBrickRoad.repeat.y = 10;
  //   textureBrickRoad.repeat.set(2, 2);
    //================================== OBJECTS ==================================
    // Brick Road
    geometry = new THREE.PlaneBufferGeometry(300, 300, 2, 2);
    brickRoad = new THREE.Mesh(geometry, materialBrickRoad);
    brickRoad.material.side = THREE.DoubleSide;
    brickRoad.rotation.x -= Math.PI / 2;
    scene.add(brickRoad);

    // Pedestrian
    geometry = new THREE.BoxBufferGeometry(50, 25, 1);
    pedestrian = new THREE.Mesh( geometry, materialWhite );
    pedestrian.receiveShadow = true;
    pedestrian.castShadow = true;
    pedestrian.position.y = 0; 
    pedestrian.position.x -= 10; 
    brickRoad.add( pedestrian );

    const shape = new THREE.Shape();
    shape.moveTo(-145, -145); // 1st Point
    shape.lineTo(-145, 145); // 2nd Point
    shape.lineTo(50, 145); // 3rd Point
    shape.lineTo(50, 100);
    shape.lineTo(-35, 60); // Middle 1
    shape.lineTo(-35, -60); // Middle 2
    shape.lineTo(50, -100);
    shape.lineTo(50, -145); // 4th Point
    // shape.lineTo(10, 0);
    // shape.lineTo(0, 0);
    // shape.lineTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    // shape.lineTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    // shape.lineTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    // shape.lineTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    // shape.lineTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    // const x = -2.5;
    // const y = -5;
    // shape.moveTo(x + 2.5, y + 2.5);
    // shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    // shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    // shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    // shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    // shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    // shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    heart = new THREE.Mesh(geometry, materialWhite);
    brickRoad.add(heart);

    // width = 9;
    // height = 9;
    // widthSegments = 2;
    // heightSegments = 2;

    


    //================================== RAIN ==================================


    //================================== MODELS ==================================


    //================================== LIGHTS ===================================
    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Point Light
    sunLight = new THREE.PointLight(0xffffff, 1, 100);
    sunLight.position.set(0,50,0);
    sunLight.castShadow = true;
    scene.add(sunLight);
    sunLightForward = true;

    animate();
}

function animate(){
    // heart.rotation.z += 0.01;
    // heart.rotation.x += 0.01;
    controls.update();
    requestAnimationFrame(animate);

    // Keyboard Controls
    if(keyboard[87]){ // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if(keyboard[83]){ // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if(keyboard[65]){ // A key
        camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
    }
    if(keyboard[68]){ // D key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }
    if(keyboard[37]){ // left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if(keyboard[39]){ // right arrow key
        camera.rotation.y += player.turnSpeed;
    }
        renderer.render(scene, camera);
    }

    function keyDown(event){
        keyboard[event.keyCode] = true;
    }

    function keyUp(event){
        keyboard[event.keyCode] = false;
    }
 
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;