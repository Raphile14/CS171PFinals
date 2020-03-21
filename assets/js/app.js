// Declaration of Important Camera Variables
let scene, camera, renderer, control;
let keyboard = {};
let player = { height: 12, speed: 0.2, turnSpeed: Math.PI*0.02 };
let useWireframe = false;

// Declaration of Objects
let geometry, shape;
let brickRoad, pedestrian;
let pavementMain, pavementMinor, pavementCenter;
let pavementPostCafeFrontLeft, pavementPostCafeFrontRight, pavementPostPedestrianLeft, pavementPostPedestrianRight, pavementPostFarLeft, pavementPostFarRight; 
let pavementPostBall1, pavementPostBall2, pavementPostBall3, pavementPostBall4, pavementPostBall5, pavementPostBall6;
let cafeFoundation, cafeSecondFloor;
let postFrontLeft, postFrontLeftMiddle, postFrontLeftMost, postFrontRight, postFrontRightMiddle, postFrontRightMost;
let frontLeftInnerWall, frontRightInnerWall, frontLeftWall, frontRightWall;
let sideWallLeftSmall, sideWallRightSmall, sideWallWindowLeft, sideWallWindowRight;
let chalkboardFront, chalkboardBack;
let tableHead,tableNeck, tableLeg;

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

    //================================= MATERIALS ================================
    let materialWhite = new THREE.MeshLambertMaterial({color:0xa2a8b3, wireframe:useWireframe});
    let materialBlack = new THREE.MeshLambertMaterial({color:0xffffff, wireframe:useWireframe});
    let materialBrickRoad = new THREE.MeshLambertMaterial({map: textureBrickRoad});
//   let materialPlane = new THREE.MeshPhongMaterial({color:0xa2a8b3});
//   let materialGrass = new THREE.MeshLambertMaterial({map: textureGrass, wireframe:useWireframe});

    //================================== MODIFY TEXTURE ==================================
    textureBrickRoad.wrapS = THREE.RepeatWrapping;
    textureBrickRoad.wrapT = THREE.RepeatWrapping;
    textureBrickRoad.offset.set(0, 0);
    textureBrickRoad.repeat.x = 4;
    textureBrickRoad.repeat.y = 4;
  //   textureBrickRoad.repeat.set(2, 2);

    //#region Extrude Settings
    const extrudeSettings = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const extrudeSettingFoundation = {
        steps: 2,
        depth: 3,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const extrudeSettingsSecondFloor = {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelOffset: 1,
        bevelSegments: 1
    };

    //#endregion Extrude Settings

    //================================== OBJECTS ==================================
    //#region Road
    // Brick Road
    geometry = new THREE.PlaneBufferGeometry(300, 300, 2, 2);
    brickRoad = new THREE.Mesh(geometry, materialBrickRoad);
    brickRoad.material.side = THREE.DoubleSide;
    brickRoad.rotation.x -= Math.PI / 2;
    brickRoad.position.x = 45;
    scene.add(brickRoad);

    // Pedestrian
    geometry = new THREE.BoxBufferGeometry(80, 40, 1);
    pedestrian = new THREE.Mesh( geometry, materialWhite );
    pedestrian.receiveShadow = true;
    pedestrian.castShadow = true;
    pedestrian.position.y = 0; 
    pedestrian.position.x -= 10; 
    pedestrian.rotation.x -= Math.PI / 2;
    scene.add( pedestrian );

    // Main Pavement
    shape = new THREE.Shape();
    shape.moveTo(-130, -200); // 1st Point
    shape.lineTo(-130, 200); // 2nd Point
    shape.lineTo(40, 200); // 3rd Point
    shape.lineTo(40, 120); 
    shape.bezierCurveTo(-70, 100, -70, -100, 40, -120); // Curve   
    shape.lineTo(40, -200); // 4th Point    

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    pavementMain = new THREE.Mesh(geometry, materialWhite);
    pavementMain.rotation.x -= Math.PI / 2;
    scene.add(pavementMain);

    // Minor Pavement
    shape = new THREE.Shape();
    shape.moveTo(100, 200); // 1st Point
    shape.lineTo(100, 120); // 2nd Point
    shape.lineTo(200, 120); // 3rd Point
    shape.lineTo(200, 200); // 4th Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    pavementMinor = new THREE.Mesh(geometry, materialWhite);
    pavementMinor.rotation.x -= Math.PI / 2;
    scene.add(pavementMinor);

    // Center Pavement
    shape = new THREE.Shape();
    shape.moveTo(40, -60); // 1st Point
    shape.bezierCurveTo(5, -55, 5, 55, 40, 60); // Curve and 2nd Point
    shape.bezierCurveTo(45, 65, 195, 65, 200, 60); // Curve and 3rd Point
    shape.lineTo(200, -60); // 4th Point
    shape.bezierCurveTo(195, -65, 65, -60, 40, -60); // Curve and Go Back to 1st Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    pavementCenter = new THREE.Mesh(geometry, materialWhite);
    pavementCenter.rotation.x -= Math.PI / 2;
    scene.add(pavementCenter);

    //#endregion Road

    //#region Cafe Structure
    //================================== CAFE FOUNDATION ==================================
    // First Floor
    shape = new THREE.Shape();
    shape.moveTo(40, -15); // 1st Point
    shape.lineTo(40, 15); // 2nd Point
    shape.lineTo(60, 40); // 3rd Point
    shape.lineTo(200, 40); // 4th Point
    shape.lineTo(200, -40); // 5th Point
    shape.lineTo(60, -40); // 6th Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettingFoundation);
    cafeFoundation = new THREE.Mesh(geometry, materialWhite);
    cafeFoundation.rotation.x -= Math.PI / 2;
    cafeFoundation.position.y = 3;
    scene.add(cafeFoundation);

    // Second FLoor
    shape = new THREE.Shape();
    shape.moveTo(40, -15); // 1st Point
    shape.lineTo(40, 15); // 2nd Point
    shape.lineTo(60, 40); // 3rd Point
    shape.lineTo(200, 40); // 4th Point
    shape.lineTo(200, -40); // 5th Point
    shape.lineTo(60, -40); // 6th Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettingsSecondFloor);
    cafeSecondFloor = new THREE.Mesh(geometry, materialWhite);
    cafeSecondFloor.rotation.x -= Math.PI / 2;
    cafeSecondFloor.position.y = 40;
    scene.add(cafeSecondFloor);

    //#endregion Cafe Structure

    //#region Cafe Front Posts
    // Cafe Front Post Constants
    const postHeight = 40;
    const postWidth = 1.5;
    const postDepth = 1.5;

    // Left Posts
    // Middle Left
    geometry = new THREE.BoxBufferGeometry(postWidth, postDepth, postHeight);
    postFrontLeftMiddle = new THREE.Mesh( geometry, materialWhite );
    postFrontLeftMiddle.receiveShadow = true;
    postFrontLeftMiddle.castShadow = true;
    postFrontLeftMiddle.position.y = postHeight/2; 
    postFrontLeftMiddle.position.x = 40; 
    postFrontLeftMiddle.position.z = -15; 
    postFrontLeftMiddle.rotation.x -= Math.PI / 2;
    scene.add(postFrontLeftMiddle);

    // Inner Left Post
    postFrontLeft = postFrontLeftMiddle.clone();
    postFrontLeft.position.y = postHeight/2;
    postFrontLeft.position.x = 40;
    postFrontLeft.position.z = -7;
    scene.add(postFrontLeft);

    // Farthest Left Post
    postFrontLeftMost = postFrontLeftMiddle.clone();
    postFrontLeftMost.position.y = postHeight/2;
    postFrontLeftMost.position.x = 60;
    postFrontLeftMost.position.z = -40; 
    scene.add(postFrontLeftMost);

    // Right Posts
    // Middle Right
    postFrontRightMiddle = postFrontLeftMiddle.clone();    
    postFrontRightMiddle.position.y = postHeight/2; 
    postFrontRightMiddle.position.x = 40; 
    postFrontRightMiddle.position.z = 15; 
    scene.add(postFrontRightMiddle);

    // Inner Right Post
    postFrontRight = postFrontLeftMiddle.clone();
    postFrontRight.position.y = postHeight/2;
    postFrontRight.position.x = 40;
    postFrontRight.position.z = 7;
    scene.add(postFrontRight);

    // Farthest Right Post
    postFrontRightMost = postFrontLeftMiddle.clone();
    postFrontRightMost.position.y = postHeight/2;
    postFrontRightMost.position.x = 60;
    postFrontRightMost.position.z = 40;
    scene.add(postFrontRightMost);

    //#endregion Cafe Front Posts

    //#region Cafe Front Walls
    // Front Left Wall
    geometry = new THREE.BoxBufferGeometry(1, 15, 30);
    frontLeftWall = new THREE.Mesh( geometry, materialWhite );
    frontLeftWall.receiveShadow = true;
    frontLeftWall.castShadow = true;
    frontLeftWall.position.x = 50; 
    frontLeftWall.position.y = 10; 
    frontLeftWall.position.z = -27.5; 
    frontLeftWall.rotation.x -= Math.PI;
    frontLeftWall.rotation.y -= 2.46;
    scene.add(frontLeftWall);

    // Front Left Inner Wall
    geometry = new THREE.BoxBufferGeometry(1, 15, 7);
    frontLeftInnerWall = new THREE.Mesh( geometry, materialWhite );
    frontLeftInnerWall.receiveShadow = true;
    frontLeftInnerWall.castShadow = true;
    frontLeftInnerWall.position.x = 40; 
    frontLeftInnerWall.position.y = 10; 
    frontLeftInnerWall.position.z = -11; 
    frontLeftInnerWall.rotation.x -= Math.PI;
    scene.add(frontLeftInnerWall);

    // Front Right Wall
    frontRightWall = frontLeftWall.clone();
    frontRightWall.position.x = 50; 
    frontRightWall.position.y = 10; 
    frontRightWall.position.z = 27.5; 
    frontRightWall.rotation.x -= Math.PI;
    frontRightWall.rotation.y = 2.46;
    scene.add(frontRightWall);

    // Front Right Inner Wall
    frontRightInnerWall = frontLeftInnerWall.clone();
    frontRightInnerWall.position.z = 11;
    scene.add(frontRightInnerWall);

    //#endregion Cafe Front Walls

    //#region Cafe Side Walls
    // Left Small Side Wall
    geometry = new THREE.BoxBufferGeometry(1, 40, 20);
    sideWallLeftSmall = new THREE.Mesh( geometry, materialWhite );
    sideWallLeftSmall.receiveShadow = true;
    sideWallLeftSmall.castShadow = true;
    sideWallLeftSmall.position.x = 70; 
    sideWallLeftSmall.position.y = 20; 
    sideWallLeftSmall.position.z = -40; 
    sideWallLeftSmall.rotation.x -= Math.PI;
    sideWallLeftSmall.rotation.y -= Math.PI / 2;
    scene.add(sideWallLeftSmall);

    // Right Small Side Wall
    sideWallRightSmall = sideWallLeftSmall.clone();
    sideWallRightSmall.position.x = 70; 
    sideWallRightSmall.position.y = 20; 
    sideWallRightSmall.position.z = 40; 
    sideWallRightSmall.rotation.x -= Math.PI;
    sideWallRightSmall.rotation.y = Math.PI / 2;
    scene.add(sideWallRightSmall);

    // Left Window Side Wall
    geometry = new THREE.BoxBufferGeometry(1, 40, 60);
    sideWallWindowLeft = new THREE.Mesh( geometry, materialWhite );
    sideWallWindowLeft.receiveShadow = true;
    sideWallWindowLeft.castShadow = true;
    sideWallWindowLeft.position.x = 110; 
    sideWallWindowLeft.position.y = 20; 
    sideWallWindowLeft.position.z = -40; 
    sideWallWindowLeft.rotation.x -= Math.PI;
    sideWallWindowLeft.rotation.y -= Math.PI / 2;
    scene.add(sideWallWindowLeft);

    // Right Window Side Wall
    sideWallWindowRight = sideWallWindowLeft.clone();
    sideWallWindowRight.position.x = 110; 
    sideWallWindowRight.position.y = 20; 
    sideWallWindowRight.position.z = 40; 
    sideWallWindowRight.rotation.x -= Math.PI;
    sideWallWindowRight.rotation.y = Math.PI / 2;
    scene.add(sideWallWindowRight);

    //#endregion Cafe Side Walls

    //#region Pavement Posts and Pavement Balls
    // Cafe Front Left
    geometry = new THREE.CylinderBufferGeometry(1, 1, 20, 12);
    pavementPostCafeFrontLeft = new THREE.Mesh( geometry, materialBlack );
    pavementPostCafeFrontLeft.receiveShadow = true;
    pavementPostCafeFrontLeft.castShadow = true;
    pavementPostCafeFrontLeft.position.x = 20; 
    pavementPostCafeFrontLeft.position.y = 10; 
    pavementPostCafeFrontLeft.position.z = -10; 
    pavementPostCafeFrontLeft.rotation.x -= Math.PI;
    scene.add(pavementPostCafeFrontLeft);

    // Pavement Ball 1
    geometry = new THREE.SphereBufferGeometry(1, 32, 32);
    pavementPostBall1 = new THREE.Mesh( geometry, materialBlack );
    pavementPostBall1.receiveShadow = true;
    pavementPostBall1.castShadow = true;
    pavementPostBall1.position.x = 20; 
    pavementPostBall1.position.y = 21; 
    pavementPostBall1.position.z = -10; 
    pavementPostBall1.rotation.x -= Math.PI;
    scene.add(pavementPostBall1);

    // Cafe Front Right
    pavementPostCafeFrontRight = pavementPostCafeFrontLeft.clone();
    pavementPostCafeFrontLeft.position.x = 20; 
    pavementPostCafeFrontLeft.position.y = 10; 
    pavementPostCafeFrontLeft.position.z = 10; 
    scene.add(pavementPostCafeFrontRight);

    // Pavement Ball 2
    pavementPostBall2 = pavementPostBall1.clone();
    pavementPostBall2.position.x = 20; 
    pavementPostBall2.position.y = 21; 
    pavementPostBall2.position.z = 10; 
    pavementPostBall2.rotation.x -= Math.PI;
    scene.add(pavementPostBall2);

    // Pedestrian Left
    pavementPostPedestrianLeft = pavementPostCafeFrontLeft.clone();
    pavementPostPedestrianLeft.position.x = -45; 
    pavementPostPedestrianLeft.position.y = 10; 
    pavementPostPedestrianLeft.position.z = -10; 
    scene.add(pavementPostPedestrianLeft);

    // Pavement Ball 3
    pavementPostBall3 = pavementPostBall1.clone();
    pavementPostBall3.position.x = -45; 
    pavementPostBall3.position.y = 21; 
    pavementPostBall3.position.z = -10; 
    pavementPostBall3.rotation.x -= Math.PI;
    scene.add(pavementPostBall3);

    // Pedestrian Right
    pavementPostPedestrianRight = pavementPostCafeFrontLeft.clone();
    pavementPostPedestrianRight.position.x = -45; 
    pavementPostPedestrianRight.position.y = 10; 
    pavementPostPedestrianRight.position.z = 10; 
    scene.add(pavementPostPedestrianRight);

    // Pavement Ball 4
    pavementPostBall4 = pavementPostBall1.clone();
    pavementPostBall4.position.x = -45; 
    pavementPostBall4.position.y = 21; 
    pavementPostBall4.position.z = 10; 
    pavementPostBall4.rotation.x -= Math.PI;
    scene.add(pavementPostBall4);

    // Far Left
    pavementPostFarLeft = pavementPostCafeFrontLeft.clone();
    pavementPostFarLeft.position.x = 30; 
    pavementPostFarLeft.position.y = 10; 
    pavementPostFarLeft.position.z = -150; 
    scene.add(pavementPostFarLeft);

    // Pavement Ball 5
    pavementPostBall5 = pavementPostBall1.clone();
    pavementPostBall5.position.x = 30; 
    pavementPostBall5.position.y = 21; 
    pavementPostBall5.position.z = -150; 
    pavementPostBall5.rotation.x -= Math.PI;
    scene.add(pavementPostBall5);

    // Far Right
    pavementPostFarRight = pavementPostCafeFrontLeft.clone();
    pavementPostFarRight.position.x = 30; 
    pavementPostFarRight.position.y = 10; 
    pavementPostFarRight.position.z = -130; 
    scene.add(pavementPostFarRight);

    // Pavement Ball 6
    pavementPostBall6 = pavementPostBall1.clone();
    pavementPostBall6.position.x = 30; 
    pavementPostBall6.position.y = 21; 
    pavementPostBall6.position.z = -130; 
    pavementPostBall6.rotation.x -= Math.PI;
    scene.add(pavementPostBall6);

    //#endregion Pavement Posts and Pavement Balls

    //#region Cafe Chalkboard
    // Cafe Chalkboard Front
    const chalkboardHeight = 23;
    const chalkboardWidth = 10;
    const chalkboardDepth = 1.5;

    geometry = new THREE.BoxBufferGeometry(chalkboardWidth, chalkboardDepth, chalkboardHeight);
    chalkboardFront = new THREE.Mesh( geometry, materialWhite );
    chalkboardFront.receiveShadow = true;
    chalkboardFront.castShadow = true;
    chalkboardFront.position.y = chalkboardHeight/2; 
    chalkboardFront.position.x = 30; 
    chalkboardFront.position.z = -20; 
    chalkboardFront.rotation.x = 1.3;
    chalkboardFront.rotation.y -= 0.25;
    chalkboardFront.rotation.z = 0.7;
    scene.add(chalkboardFront);

    // Cafe Chalkboard Back
    chalkboardBack = new THREE.Mesh( geometry, materialWhite );
    chalkboardBack.receiveShadow = true;
    chalkboardBack.castShadow = true;
    chalkboardBack.position.y = chalkboardHeight/2; 
    chalkboardBack.position.x = 33.5; 
    chalkboardBack.position.z = -24; 
    chalkboardBack.rotation.x = Math.PI / 2;
    chalkboardBack.rotation.y = 0;
    chalkboardBack.rotation.z = 0.75; // 0.7
    scene.add(chalkboardBack);

    //#endregion Cafe Chalkboard
    
    //#region Tables
    // Table Head
    // Table 1
    geometry = new THREE.CylinderBufferGeometry(6, 6, 1, 12);
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 32; 
    tableHead.position.y = 17; 
    tableHead.position.z = 25; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);    

    // Table 2
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 30; 
    tableHead.position.y = 17; 
    tableHead.position.z = 40; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 3
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 30; 
    tableHead.position.y = 17; 
    tableHead.position.z = -40; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 4
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 80; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 5
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 95; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 6
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 110; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 7
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 125; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 8
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = -60; 
    tableHead.position.y = 17; 
    tableHead.position.z = -15; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 9
    tableHead = new THREE.Mesh( geometry, materialBlack );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = -65; 
    tableHead.position.y = 17; 
    tableHead.position.z = 30; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table Necks
    // Table 1
    geometry = new THREE.CylinderBufferGeometry(1, 1, 17, 12);
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 32; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 25; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 2
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 30; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 40; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 3
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 30; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = -40; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 4
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 80; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 5
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 95; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 6
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 110; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 7
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 125; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 8
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = -60; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = -15; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table 9
    tableNeck = new THREE.Mesh( geometry, materialBlack );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = -65; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 30; 
    tableNeck.rotation.x -= Math.PI;
    scene.add(tableNeck);

    // Table Legs
    // Table 1
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 32; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 25; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI;
    scene.add(tableLeg);

    // Table 2
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 30; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 40; 
    tableLeg.rotation.x -= Math.PI;
    scene.add(tableLeg);

    // Table 3
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 30; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = -40; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 4
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 80; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 5
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 95; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 6
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 110; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 7
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 125; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 8
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = -60; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = -15; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/3;
    scene.add(tableLeg);

    // Table 9
    geometry = new THREE.CylinderBufferGeometry(5, 3, 2, 6);
    tableLeg = new THREE.Mesh( geometry, materialBlack );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = -65; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 30; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI;
    scene.add(tableLeg);


    //#endregion
    //================================== RAIN ==================================


    //================================== MODELS ==================================

    //#region Lighting
    // Ambient Light
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Point Light
    sunLight = new THREE.PointLight(0xffffff, 1, 100);
    sunLight.position.set(0, 50, 0);
    sunLight.castShadow = true;
    scene.add(sunLight);
    sunLightForward = true;

    //#endregion Lighting

    animate();
}

function animate(){
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