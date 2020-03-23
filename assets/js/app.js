// Declaration of Important Camera Variables
let scene, camera, renderer, control;
let keyboard = {};
let player = { height: 12, speed: 0.2, turnSpeed: Math.PI*0.02 };
let useWireframe = false;
let lightHelper, lampLight;

// Declaration of Objects
let geometry, shape;
let brickRoad, pedestrian, manhole;
let pavementMain, pavementMinor, pavementCenter;
let pavementPostCafeFrontLeft, pavementPostCafeFrontRight, pavementPostPedestrianLeft, pavementPostPedestrianRight, pavementPostFarLeft, pavementPostFarRight; 
let pavementPostBall1, pavementPostBall2, pavementPostBall3, pavementPostBall4, pavementPostBall5, pavementPostBall6;
let cafeFoundation, cafeSecondFloor, cafeHead, cafeHeadStructure, cafeBalcony;
let cafeBalconyWindow, cafeBalconyWindowFence, cafeWindowLedge, cafeSideBalcony, cafeFences;
let cafeWindowHead, cafeWindowHeadFrame, cafeWindowHolder;
let cafeCurtains;
let postFrontLeft, postFrontLeftMiddle, postFrontLeftMost, postFrontRight, postFrontRightMiddle, postFrontRightMost;
let cafeTarpaulinLeft, cafeTarpaulinLeftMost, cafeTarpaulinRight, cafeTarpaulinRightMost, cafeTarpaulinBottom; 
let frontLeftInnerWall, frontRightInnerWall, frontLeftWall, frontRightWall;
let sideWallLeftSmall, sideWallRightSmall, sideWallWindowLeft, sideWallWindowRight, sideWall, sideFrame;
let cafeInsideWall, cafeBackWall;
let chalkboardFront, chalkboardBack;
let tableHead,tableNeck, tableLeg;
let cafeText, brasserieText, chezText, text;

// Declaration of Models
let model;


function init(){
    //================================== INITIALIZE =================================
    //#region Init
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 100, 950); // FOG

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(-60, 30, 70); 
    camera.lookAt(new THREE.Vector3(0, 120, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Enable Shadows in the Renderer
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    controls = new THREE.OrbitControls (camera, renderer.domElement);
    //#endregion Init

    //================================== TEXTURES =================================
    //#region Textures
    let textureBrickRoad = new THREE.TextureLoader().load('assets/textures/Bricks.jpg');
    let textureTableNeck = new THREE.TextureLoader().load('assets/textures/table_neck.jpg');
    let textureTableLeg = new THREE.TextureLoader().load('assets/textures/table_neck.jpg');
    let textureWindowHeadFrame = new THREE.TextureLoader().load('assets/textures/WoodPlanksWorn.jpg');
    textureBackground = new THREE.TextureLoader().load('assets/textures/background.jpg');
    scene.background = textureBackground;
    let textureTiles = new THREE.TextureLoader().load('assets/textures/Tiles.jpg');
    let textureChalkboard = new THREE.TextureLoader().load('assets/textures/chalkboard.jpg');
    let textureChalkboardBack = new THREE.TextureLoader().load('assets/textures/chalkboard_back.jpg');
    let texturePedestrian = new THREE.TextureLoader().load('assets/textures/pedestrian.jpg');
    let textureTarpaulin = new THREE.TextureLoader().load('assets/textures/tarpaulin.jpg');
    let textureWhiteWood = new THREE.TextureLoader().load('assets/textures/white_wood.jpg');
    let textureManhole = new THREE.TextureLoader().load('assets/textures/manhole.jpg');
    let textureWhiteCement = new THREE.TextureLoader().load('assets/textures/white_cement.jpg');
    let textureCafeMenu = new THREE.TextureLoader().load('assets/textures/cafeMenu.jpg');
    let textureGrayWall = new THREE.TextureLoader().load('assets/textures/gray_wall.jpg');
    let texturePurpleWall = new THREE.TextureLoader().load('assets/textures/purple_wall.jpg');
    let textureGrayPost = new THREE.TextureLoader().load('assets/textures/gray_post.jpg');
    let textureTableCloth = new THREE.TextureLoader().load('assets/textures/table_texture.jpg');
    let textureCafeFloor = new THREE.TextureLoader().load('assets/textures/cafe_floor.jpg');
    let textureCurtain = new THREE.TextureLoader().load('assets/textures/curtain.jpg');
    let textureWindow = new THREE.TextureLoader().load('assets/textures/window.png');
    let textureFence = new THREE.TextureLoader().load('assets/textures/fence.png');
    //#endregion Textures

    //================================= MATERIALS ================================
    //#region Materials
    let materialWhite = new THREE.MeshPhongMaterial({color:0xa2a8b3, wireframe:useWireframe});
    let materialBlack = new THREE.MeshPhongMaterial({color:0x333333, wireframe:useWireframe});
    let materialGold = new THREE.MeshPhongMaterial({color:0xffff00, wireframe:useWireframe});
    let materialBrickRoad = new THREE.MeshLambertMaterial({map: textureBrickRoad});
    let materialChalkboard = new THREE.MeshPhongMaterial({map: textureChalkboard});
    let materialChalkboardBack = new THREE.MeshLambertMaterial({map: textureChalkboardBack});
    let materialTableNeck = new THREE.MeshPhongMaterial({map: textureTableNeck});
    let materialTableLeg = new THREE.MeshPhongMaterial({map: textureTableLeg});
    let materialWindowHeadFrame = new THREE.MeshPhongMaterial({map: textureWindowHeadFrame});
    let materialTiles = new THREE.MeshPhongMaterial({map: textureTiles});
    let materialPedestrian = new THREE.MeshPhongMaterial({map: texturePedestrian});
    let materialTarpaulin = new THREE.MeshPhongMaterial({map: textureTarpaulin}); 
    let materialWhiteWood = new THREE.MeshPhongMaterial({map: textureWhiteWood});    
    let materialManhole = new THREE.MeshLambertMaterial({map: textureManhole});
    let materialWhiteCement = new THREE.MeshPhongMaterial({map: textureWhiteCement});   
    let materialCafeMenu = new THREE.MeshPhongMaterial({map: textureCafeMenu}); 
    let materialGrayWall = new THREE.MeshPhongMaterial({map: textureGrayWall});
    let materialPurpleWall = new THREE.MeshPhongMaterial({map: texturePurpleWall});
    let materialGrayPost = new THREE.MeshPhongMaterial({map: textureGrayPost});   
    let materialTableCloth = new THREE.MeshPhongMaterial({map: textureTableCloth});   
    let materialCafeFloor = new THREE.MeshPhongMaterial({map: textureCafeFloor}); 
    let materialCurtain = new THREE.MeshPhongMaterial({map: textureCurtain});    
    let materialWindow = new THREE.MeshPhongMaterial({map: textureWindow});   
    let materialFence = new THREE.MeshPhongMaterial({map: textureFence, transparent : true});    
    //#endregion Materials

    //================================== MODIFY TEXTURE ==================================
    //#region Modify Texture
    // Curtain
    textureCurtain.wrapS = THREE.RepeatWrapping;
    textureCurtain.wrapT = THREE.RepeatWrapping;
    textureCurtain.offset.set(0, 0);
    textureCurtain.repeat.x = 1;
    textureCurtain.repeat.y = 1;

    // Brick Road
    textureBrickRoad.wrapS = THREE.RepeatWrapping;
    textureBrickRoad.wrapT = THREE.RepeatWrapping;
    textureBrickRoad.offset.set(0, 0);
    textureBrickRoad.repeat.x = 5;
    textureBrickRoad.repeat.y = 5;

    // Cafe Foundation
    textureCafeFloor.wrapS = THREE.RepeatWrapping;
    textureCafeFloor.wrapT = THREE.RepeatWrapping;
    textureCafeFloor.offset.set(0, 0);
    textureCafeFloor.repeat.x = 0.05;
    textureCafeFloor.repeat.y = 0.05;

    // Tiles
    textureTiles.wrapS = THREE.RepeatWrapping;
    textureTiles.wrapT = THREE.RepeatWrapping;
    textureTiles.offset.set(0, 0);
    textureTiles.repeat.x = 0.005;
    textureTiles.repeat.y = 0.005;   
    
    // White Wood
    textureWhiteWood.wrapS = THREE.RepeatWrapping;
    textureWhiteWood.wrapT = THREE.RepeatWrapping;
    textureWhiteWood.offset.set(0, 0);
    textureWhiteWood.repeat.x = 0.025;
    textureWhiteWood.repeat.y = 0.025;  

    // White Cement
    textureWhiteCement.wrapS = THREE.RepeatWrapping;
    textureWhiteCement.wrapT = THREE.RepeatWrapping;
    textureWhiteCement.offset.set(0, 0);
    textureWhiteCement.repeat.x = 0.025;
    textureWhiteCement.repeat.y = 0.025;     
    
    // Gray Post
    textureGrayPost.wrapS = THREE.RepeatWrapping;
    textureGrayPost.wrapT = THREE.RepeatWrapping;
    textureGrayPost.offset.set(0, 0);
    textureGrayPost.repeat.x = 20;
    textureGrayPost.repeat.y = 20;    

    // Table Neck
    textureTableNeck.wrapS = THREE.RepeatWrapping;
    textureTableNeck.wrapT = THREE.RepeatWrapping;
    textureTableNeck.repeat.y = 2; 

    // Table Leg
    textureTableLeg.wrapS = THREE.RepeatWrapping;
    textureTableLeg.wrapT = THREE.RepeatWrapping;
    textureTableLeg.repeat.x = 2;
    textureTableLeg.repeat.y = 10; 
    //#endregion Modify Texture
    
    //================================== TEXT ==================================
    //#region Text
    // Cafe Text
    text = new THREE.FontLoader().load('assets/fonts/Quesha_Regular.json', function(font){
        geometry = new THREE.TextGeometry( 'CAFE', {
            font : font,
            size : 4,
            height : 1,
            curveSegments : 36,
            bevelEnabled : true,
            bevelThickness : 1,
            bevelSize : 0.2,
            bevelOffset : 0,
            bevelSegments: 1
        })
        cafeText = new THREE.Mesh( geometry, materialGold );
        cafeText.receiveShadow = true;
        cafeText.castShadow = true;
        cafeText.position.x = 39; 
        cafeText.position.y = 39; 
        cafeText.position.z = -5; 
        cafeText.rotation.y -= Math.PI / 2;
        scene.add(cafeText); 
    });

    // Brasserie Text
    text = new THREE.FontLoader().load('assets/fonts/Ariston_Comic_Demo_Regular.json', function(font){
        geometry = new THREE.TextGeometry( 'BRASSERIE', {
            font : font,
            size : 5,
            height : 1,
            curveSegments : 36,
            bevelEnabled : true,
            bevelThickness : 1,
            bevelSize : 0.2,
            bevelOffset : 0,
            bevelSegments: 1
        })
        brasserieText = new THREE.Mesh( geometry, materialWhite );
        brasserieText.receiveShadow = true;
        brasserieText.castShadow = true;
        brasserieText.position.x = 39; 
        brasserieText.position.y = 43.5; 
        brasserieText.position.z = -11; 
        brasserieText.rotation.y -= Math.PI / 2;
        scene.add(brasserieText); 
    });

    // Chez Marceau Text
    text = new THREE.FontLoader().load('assets/fonts/College_Bold.json', function(font){
        geometry = new THREE.TextGeometry( 'CHEZ MARCEAU', {
            font : font,
            size : 7,
            height : 1,
            curveSegments : 36,
            bevelEnabled : true,
            bevelThickness : 1,
            bevelSize : 0.2,
            bevelOffset : 0,
            bevelSegments: 1
        })
        brasserieText = new THREE.Mesh( geometry, materialGold );
        brasserieText.receiveShadow = true;
        brasserieText.castShadow = true;
        brasserieText.position.x = 39; 
        brasserieText.position.y = 50; 
        brasserieText.position.z = -35; 
        brasserieText.rotation.y -= Math.PI / 2;
        scene.add(brasserieText); 
    });
    //#endregion Text

    //================================== MODELS ==================================
    //=== WALL LAMPS ===
    //#region Wall Lamps    
    model = new THREE.GLTFLoader();
    // Lamp 1
    model.load("assets/models/wall_lamp/scene.gltf", function(gltf){
        gltf.scene.position.x = 38;
        gltf.scene.position.y = 30;
        gltf.scene.position.z = 12.5;
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        scene.add(gltf.scene);
        console.log("Wall Lamp 1 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Lamp 2
    model.load("assets/models/wall_lamp/scene.gltf", function(gltf){
        gltf.scene.position.x = 38;
        gltf.scene.position.y = 30;
        gltf.scene.position.z = - 17.5;
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        scene.add(gltf.scene);
        console.log("Wall Lamp 2 added")
    }, undefined, function(error){
        console.log(error);
    });
    //#endregion Wall Lamps

    //=== CHAIRS ===
    //#region Chairs    
    // Chair 1
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 40;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 30;
        gltf.scene.rotation.y = -Math.PI / 1.7;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 1 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 2
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = -55;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 27;
        gltf.scene.rotation.y = -1.5;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 2 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 3
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = -65;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = -30;
        gltf.scene.rotation.y = 0.5;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 3 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 4
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 40;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = -50;
        gltf.scene.rotation.y = -0.3;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 4 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 5
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 70;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = -50;
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 5 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 6
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 80;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 47;
        // gltf.scene.rotation.y = Math.PI;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 6 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 7
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 95;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 47;
        // gltf.scene.rotation.y = Math.PI;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 7 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 8
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 110;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 47;
        // gltf.scene.rotation.y = Math.PI;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 8 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 9
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 125;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 47;
        // gltf.scene.rotation.y = Math.PI;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 9 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Chair 10
    model.load("assets/models/chair/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 140;
        gltf.scene.position.y = 12;
        gltf.scene.position.z = 55;
        gltf.scene.rotation.y = - Math.PI / 2;
        gltf.scene.scale.set(0.25, 0.25, 0.25);
        scene.add(gltf.scene);
        console.log("chair 10 added")
    }, undefined, function(error){
        console.log(error);
    });
    //#endregion Chairs
    
    //=== MISC MODELS ===
    //#region Misc Models
    // Lamp Post
    model.load("assets/models/victorian_lamp_post/scene.gltf", function(gltf){
        gltf.scene.position.x = -40;
        gltf.scene.position.y = 3;
        gltf.scene.position.z = 70;
        gltf.scene.rotation.y = 0.8;
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        scene.add(gltf.scene);
        console.log("Lamp Post added")
    }, undefined, function(error){
        console.log(error);
    });

    // Bicycle
    model.load("assets/models/bicycle/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = -37;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = 62;
        gltf.scene.rotation.x = 0.3;
        gltf.scene.rotation.y = 0.5;
        gltf.scene.rotation.z = -0.15;
        gltf.scene.scale.set(0.035, 0.035, 0.035);
        scene.add(gltf.scene);
        console.log("Bicycle added")
    }, undefined, function(error){
        console.log(error);
    });

    // Umbrella
    model.load("assets/models/umbrella/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 30;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = -40;
        gltf.scene.scale.set(0.15, 0.2, 0.15);
        scene.add(gltf.scene);
        console.log("Umbrella added")
    }, undefined, function(error){
        console.log(error);
    });        
    //#endregion
    
    //=== BUILDING MODELS ===
    //#region Building Models
    // Side Building 
    model.load("assets/models/eastern_european_panel_house/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 195;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = 100;
        gltf.scene.rotation.y = -1;
        gltf.scene.scale.set(0.4, 0.5, 0.4);
        scene.add(gltf.scene);
        console.log("Side Building added")
    }, undefined, function(error){
        console.log(error);
    });

    // Building 1
    model.load("assets/models/building/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = -240;
        gltf.scene.position.y = 0;
        gltf.scene.position.z = 10;
        gltf.scene.scale.set(2.5, 2.5, 2.5);
        scene.add(gltf.scene);
        console.log("Building 1 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Building 2
    model.load("assets/models/building2/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = -200;
        gltf.scene.position.z = -20;
        gltf.scene.scale.set(1.2, 1.2, 1.2);
        scene.add(gltf.scene);
        console.log("Building 2 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Building 3
    model.load("assets/models/old_city_building/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = 265;
        gltf.scene.position.y = 30;
        gltf.scene.position.z = -230;
        gltf.scene.rotation.y = Math.PI;
        gltf.scene.scale.set(50, 50, 50);
        scene.add(gltf.scene);
        console.log("Building 3 added")
    }, undefined, function(error){
        console.log(error);
    });

    // Building 4
    model.load("assets/models/old_city_building/scene.gltf", function(gltf){
        gltf.receiveShadow = true;
        gltf.castShadow = true;
        gltf.scene.position.x = -180;
        gltf.scene.position.y = 30;
        gltf.scene.position.z = 120;
        gltf.scene.rotation.y = - Math.PI / 2;
        gltf.scene.scale.set(50, 50, 50);
        scene.add(gltf.scene);
        console.log("Building 4 added")
    }, undefined, function(error){
        console.log(error);
    });
    //#endregion

    //================================== EXTRUDE SETTINGS ==================================
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

    const extrudeSettingsCafeHeadStructure = {
        steps: 2,
        depth: 110,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelOffset: 1,
        bevelSegments: 1
    };

    const extrudeSettingsCafeBalcony= {
        steps: 2,
        depth: 20,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelOffset: 1,
        bevelSegments: 1
    };

    const extrudeSettingsOverpass= {
        steps: 2,
        depth: 100,
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
    geometry = new THREE.PlaneBufferGeometry(490, 450, 2, 2);
    brickRoad = new THREE.Mesh(geometry, materialBrickRoad);
    brickRoad.receiveShadow = true;
    brickRoad.castShadow = true;
    brickRoad.material.side = THREE.DoubleSide;
    brickRoad.rotation.x -= Math.PI / 2;
    brickRoad.position.x = 115;
    brickRoad.position.z = -75;
    scene.add(brickRoad);

    // Pedestrian
    geometry = new THREE.BoxBufferGeometry(30, 60, 1);
    pedestrian = new THREE.Mesh( geometry, materialPedestrian );
    pedestrian.receiveShadow = true;
    pedestrian.castShadow = true;
    pedestrian.position.y = 0; 
    pedestrian.position.x -= 15; 
    pedestrian.rotation.x -= Math.PI / 2;    
    pedestrian.rotation.z -= Math.PI / 2;    
    scene.add( pedestrian );

    // Main Pavement
    shape = new THREE.Shape();
    shape.moveTo(-130, -150); 
    shape.lineTo(-130, 300); 
    shape.lineTo(40, 300); 
    shape.lineTo(40, 120); 
    shape.bezierCurveTo(-70, 100, -70, -100, 40, -120);  
    shape.lineTo(40, -150); 

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    pavementMain = new THREE.Mesh(geometry, materialTiles);
    pavementMain.rotation.x -= Math.PI / 2;
    pavementMain.receiveShadow = true;
    pavementMain.castShadow = true;
    scene.add(pavementMain);

    // Minor Pavement
    shape = new THREE.Shape();
    shape.moveTo(100, 300); 
    shape.lineTo(100, 120);
    shape.lineTo(360, 120);
    shape.lineTo(360, 300); 

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    pavementMinor = new THREE.Mesh(geometry, materialTiles);
    pavementMinor.rotation.x -= Math.PI / 2;
    pavementMinor.receiveShadow = true;
    pavementMinor.castShadow = true;
    scene.add(pavementMinor);

    // Center Pavement
    shape = new THREE.Shape();
    shape.moveTo(40, -60); 
    shape.bezierCurveTo(5, -55, 5, 55, 40, 60); 
    shape.bezierCurveTo(45, 65, 195, 65, 360, 60); 
    shape.lineTo(360, -150); 
    shape.lineTo(200, -150); 
    shape.bezierCurveTo(195, -65, 65, -60, 40, -60);

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    pavementCenter = new THREE.Mesh(geometry, materialTiles);
    pavementCenter.rotation.x -= Math.PI / 2;
    pavementCenter.receiveShadow = true;
    pavementCenter.castShadow = true;
    scene.add(pavementCenter);

    // Manhole
    geometry = new THREE.BoxBufferGeometry(15, 10, 1);
    manhole = new THREE.Mesh( geometry, materialManhole );
    manhole.receiveShadow = true;
    manhole.castShadow = true;
    manhole.position.x = -35; 
    manhole.position.y = 0; 
    manhole.position.z = 45; 
    manhole.rotation.x -= Math.PI / 2;
    scene.add( manhole );
    //#endregion Road

    //================================== CAFE FOUNDATION ==================================
    //#region Cafe Structure
    // First Floor
    shape = new THREE.Shape();
    shape.moveTo(40, -15); // 1st Point
    shape.lineTo(40, 15); // 2nd Point
    shape.lineTo(60, 40); // 3rd Point
    shape.lineTo(200, 40); // 4th Point
    shape.lineTo(200, -40); // 5th Point
    shape.lineTo(60, -40); // 6th Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettingFoundation);
    cafeFoundation = new THREE.Mesh(geometry, materialCafeFloor);
    cafeFoundation.receiveShadow = true;
    cafeFoundation.castShadow = true;
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
    cafeSecondFloor = new THREE.Mesh(geometry, materialWhiteWood);
    cafeSecondFloor.receiveShadow = true;
    cafeSecondFloor.castShadow = true;
    cafeSecondFloor.rotation.x -= Math.PI / 2;
    cafeSecondFloor.position.y = 40;
    scene.add(cafeSecondFloor);

    // Cafe Head
    shape = new THREE.Shape();
    shape.moveTo(40, -15); // 1st Point
    shape.lineTo(40, 15); // 2nd Point
    shape.lineTo(60, 40); // 3rd Point
    shape.lineTo(200, 40); // 4th Point
    shape.lineTo(200, -40); // 5th Point
    shape.lineTo(60, -40); // 6th Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettingsSecondFloor);
    cafeHead = new THREE.Mesh(geometry, materialWhiteWood);
    cafeHead.receiveShadow = true;
    cafeHead.castShadow = true;
    cafeHead.rotation.x -= Math.PI / 2;
    cafeHead.position.y = 45;
    scene.add(cafeHead);

    // Cafe Head Structure
    shape = new THREE.Shape();
    shape.moveTo(50, -10); // 1st Point
    shape.lineTo(50, 10); // 2nd Point
    shape.lineTo(65, 30); // 3rd Point
    shape.lineTo(200, 30); // 4th Point
    shape.lineTo(200, -30); // 5th Point
    shape.lineTo(65, -30); // 6th Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettingsCafeHeadStructure);
    cafeHeadStructure = new THREE.Mesh(geometry, materialWhiteWood);
    cafeHeadStructure.receiveShadow = true;
    cafeHeadStructure.castShadow = true;
    cafeHeadStructure.rotation.x -= Math.PI / 2;
    cafeHeadStructure.position.y = 50;
    scene.add(cafeHeadStructure);

    // Cafe Window Head
    geometry = new THREE.BoxBufferGeometry(15, 10, 1);
    cafeWindowHead = new THREE.Mesh( geometry, materialTarpaulin );
    cafeWindowHead.receiveShadow = true;
    cafeWindowHead.castShadow = true;
    cafeWindowHead.position.y = 70; 
    cafeWindowHead.position.x = 45; 
    cafeWindowHead.rotation.x -= Math.PI / 2;
    cafeWindowHead.rotation.y -= 0.8;
    scene.add( cafeWindowHead );

    // Cafe Window Head Frame
    // Left
    geometry = new THREE.BoxBufferGeometry(15, 1, 1);
    cafeWindowHeadFrame = new THREE.Mesh( geometry, materialWindowHeadFrame );
    cafeWindowHeadFrame.receiveShadow = true;
    cafeWindowHeadFrame.castShadow = true;
    cafeWindowHeadFrame.position.y = 65; 
    cafeWindowHeadFrame.position.x = 48; 
    cafeWindowHeadFrame.position.z = -4; 
    cafeWindowHeadFrame.rotation.x -= Math.PI / 2;
    scene.add( cafeWindowHeadFrame );

    // Right
    cafeWindowHeadFrame = new THREE.Mesh( geometry, materialWindowHeadFrame );
    cafeWindowHeadFrame.receiveShadow = true;
    cafeWindowHeadFrame.castShadow = true;
    cafeWindowHeadFrame.position.y = 65; 
    cafeWindowHeadFrame.position.x = 48; 
    cafeWindowHeadFrame.position.z = 4; 
    cafeWindowHeadFrame.rotation.x -= Math.PI / 2;
    scene.add( cafeWindowHeadFrame );

    // Cafe Window Holder
    geometry = new THREE.BoxBufferGeometry(12, 12, 1);
    cafeWindowHolder = new THREE.Mesh( geometry, materialWindowHeadFrame );
    cafeWindowHolder.receiveShadow = true;
    cafeWindowHolder.castShadow = true;
    cafeWindowHolder.position.y = 67.5; 
    cafeWindowHolder.position.x = 48; 
    cafeWindowHolder.rotation.x -= Math.PI / 2;
    cafeWindowHolder.rotation.y -= Math.PI / 2;
    scene.add( cafeWindowHolder );

    // Cafe Balcony
    shape = new THREE.Shape();
    shape.moveTo(40, -20); // 1st Point
    shape.bezierCurveTo(35, -15, 35, 15, 40, 20); // Curve and 2nd Point
    shape.bezierCurveTo(45, 25, 45, 25, 60, 25); // Curve and 3rd Point
    shape.lineTo(60, -25); // 4th Point
    shape.bezierCurveTo(60, -25, 55, -30, 40, -20); // Curve and Go Back to 1st Point

    geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettingsCafeBalcony);
    cafeBalcony = new THREE.Mesh(geometry, materialWhiteCement);
    cafeBalcony.receiveShadow = true;
    cafeBalcony.castShadow = true;    
    cafeBalcony.position.y = 80;
    cafeBalcony.rotation.x -= Math.PI / 2;
    scene.add(cafeBalcony);
    //#endregion Cafe Structure

    //#region Cafe Front Posts
    // Cafe Front Post Constants
    const postHeight = 40;
    const postWidth = 1.5;
    const postDepth = 1.5;

    // Left Posts
    // Middle Left
    geometry = new THREE.BoxBufferGeometry(postWidth, postDepth, postHeight);
    postFrontLeftMiddle = new THREE.Mesh( geometry, materialGrayPost );
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

    //#region Cafe Curtains
    // Curtain Left
    geometry = new THREE.BoxBufferGeometry(1, 40, 12);
    cafeCurtains = new THREE.Mesh( geometry, materialCurtain );
    cafeCurtains.receiveShadow = true;
    cafeCurtains.castShadow = true;
    cafeCurtains.position.x = 42; 
    cafeCurtains.position.y = 20; 
    cafeCurtains.position.z = -9; 
    cafeCurtains.rotation.x -= Math.PI;
    scene.add(cafeCurtains);

    // Curtain Right
    cafeCurtains = new THREE.Mesh( geometry, materialCurtain );
    cafeCurtains.receiveShadow = true;
    cafeCurtains.castShadow = true;
    cafeCurtains.position.x = 42; 
    cafeCurtains.position.y = 20; 
    cafeCurtains.position.z = 9; // - 
    cafeCurtains.rotation.x -= Math.PI;
    scene.add(cafeCurtains);
    //#endregion Cafe Curtains

    //#region Cafe Walls
    // Front Left Wall
    geometry = new THREE.BoxBufferGeometry(1, 15, 30);
    frontLeftWall = new THREE.Mesh( geometry, materialPurpleWall );
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
    frontLeftInnerWall = new THREE.Mesh( geometry, materialPurpleWall );
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

    // Back Wall
    geometry = new THREE.BoxBufferGeometry(1, 40, 80);
    cafeBackWall = new THREE.Mesh( geometry, materialGrayWall );
    cafeBackWall.receiveShadow = true;
    cafeBackWall.castShadow = true;
    cafeBackWall.position.x = 200; 
    cafeBackWall.position.y = 20; 
    cafeBackWall.position.z = 0; 
    cafeBackWall.rotation.x -= Math.PI;
    scene.add(cafeBackWall);

    // Inside Wall
    geometry = new THREE.BoxBufferGeometry(1, 40, 80);
    cafeInsideWall = new THREE.Mesh( geometry, materialGrayWall );
    cafeInsideWall.receiveShadow = true;
    cafeInsideWall.castShadow = true;
    cafeInsideWall.position.x = 168; 
    cafeInsideWall.position.y = 20; 
    cafeInsideWall.position.z = 0; 
    cafeInsideWall.rotation.x -= Math.PI;
    scene.add(cafeInsideWall);
    //#endregion Cafe Walls

    //#region Cafe Side Walls
    // Left Small Side Wall
    geometry = new THREE.BoxBufferGeometry(1, 40, 20);
    sideWallLeftSmall = new THREE.Mesh( geometry, materialCafeMenu );
    sideWallLeftSmall.receiveShadow = true;
    sideWallLeftSmall.castShadow = true;
    sideWallLeftSmall.position.x = 70; 
    sideWallLeftSmall.position.y = 20; 
    sideWallLeftSmall.position.z = -40; 
    sideWallLeftSmall.rotation.y -= Math.PI / 2;
    scene.add(sideWallLeftSmall);

    // Right Small Side Wall
    sideWallRightSmall = sideWallLeftSmall.clone();
    sideWallRightSmall.position.x = 70; 
    sideWallRightSmall.position.y = 20; 
    sideWallRightSmall.position.z = 40; 
    scene.add(sideWallRightSmall);

    // Left Side Wall
    geometry = new THREE.BoxBufferGeometry(1, 40, 20);
    sideWall = new THREE.Mesh( geometry, materialGrayWall );
    sideWall.receiveShadow = true;
    sideWall.castShadow = true;
    sideWall.position.x = 90; 
    sideWall.position.y = 20; 
    sideWall.position.z = -40; 
    sideWall.rotation.x -= Math.PI;
    sideWall.rotation.y -= Math.PI / 2;
    scene.add(sideWall);    

    // Right Side Wall
    sideWall = new THREE.Mesh( geometry, materialGrayWall );
    sideWall.receiveShadow = true;
    sideWall.castShadow = true;
    sideWall.position.x = 90; 
    sideWall.position.y = 20; 
    sideWall.position.z = 40; 
    sideWall.rotation.x -= Math.PI;
    sideWall.rotation.y -= Math.PI / 2;
    scene.add(sideWall);

    // Right Side Wall 2
    geometry = new THREE.BoxBufferGeometry(1, 40, 20);
    sideWall = new THREE.Mesh( geometry, materialGrayWall );
    sideWall.receiveShadow = true;
    sideWall.castShadow = true;
    sideWall.position.x = 140; 
    sideWall.position.y = 20; 
    sideWall.position.z = 40; 
    sideWall.rotation.x -= Math.PI;
    sideWall.rotation.y -= Math.PI / 2;
    scene.add(sideWall);

    // Left Side Wall 2
    geometry = new THREE.BoxBufferGeometry(1, 40, 70);
    sideWall = new THREE.Mesh( geometry, materialGrayWall );
    sideWall.receiveShadow = true;
    sideWall.castShadow = true;
    sideWall.position.x = 165; 
    sideWall.position.y = 20; 
    sideWall.position.z = -40; 
    sideWall.rotation.x -= Math.PI;
    sideWall.rotation.y -= Math.PI / 2;
    scene.add(sideWall);

    // Left Window Side Wall
    geometry = new THREE.BoxBufferGeometry(1, 20, 30);
    sideWallWindowLeft = new THREE.Mesh( geometry, materialGrayWall );
    sideWallWindowLeft.receiveShadow = true;
    sideWallWindowLeft.castShadow = true;
    sideWallWindowLeft.position.x = 115; 
    sideWallWindowLeft.position.y = 10; 
    sideWallWindowLeft.position.z = -40; 
    sideWallWindowLeft.rotation.x -= Math.PI;
    sideWallWindowLeft.rotation.y -= Math.PI / 2;
    scene.add(sideWallWindowLeft);

    // Right Window Side Wall
    sideWallWindowRight = sideWallWindowLeft.clone();
    sideWallWindowRight.receiveShadow = true;
    sideWallWindowRight.castShadow = true;
    sideWallWindowRight.position.x = 115; 
    sideWallWindowRight.position.y = 10; 
    sideWallWindowRight.position.z = 40; 
    sideWallWindowRight.rotation.x -= Math.PI;
    sideWallWindowRight.rotation.y = Math.PI / 2;
    scene.add(sideWallWindowRight);

    // Left Side Wall Frame 1
    // Left Window Side Wall Vertical
    geometry = new THREE.BoxBufferGeometry(1, 20, 1);
    sideFrame = new THREE.Mesh( geometry, materialGrayWall );
    sideFrame.receiveShadow = true;
    sideFrame.castShadow = true;
    sideFrame.position.x = 115; 
    sideFrame.position.y = 30; 
    sideFrame.position.z = -40; 
    sideFrame.rotation.x -= Math.PI;
    sideFrame.rotation.y -= Math.PI / 2;
    scene.add(sideFrame);

    // Left Window Side Wall Vertical
    geometry = new THREE.BoxBufferGeometry(1, 20, 1);
    sideFrame = new THREE.Mesh( geometry, materialGrayWall );
    sideFrame.receiveShadow = true;
    sideFrame.castShadow = true;
    sideFrame.position.x = 115; 
    sideFrame.position.y = 30; 
    sideFrame.position.z = 40; 
    sideFrame.rotation.x -= Math.PI;
    sideFrame.rotation.y -= Math.PI / 2;
    scene.add(sideFrame);

    // Left Window Side Wall Horizontal
    geometry = new THREE.BoxBufferGeometry(1, 30, 1);
    sideFrame = new THREE.Mesh( geometry, materialGrayWall );
    sideFrame.receiveShadow = true;
    sideFrame.castShadow = true;
    sideFrame.position.x = 115; 
    sideFrame.position.y = 29; 
    sideFrame.position.z = -40; 
    sideFrame.rotation.z -= Math.PI / 2;
    scene.add(sideFrame);

    // Right Window Side Wall Horizontal
    geometry = new THREE.BoxBufferGeometry(1, 30, 1);
    sideFrame = new THREE.Mesh( geometry, materialGrayWall );
    sideFrame.receiveShadow = true;
    sideFrame.castShadow = true;
    sideFrame.position.x = 115; 
    sideFrame.position.y = 29; 
    sideFrame.position.z = 40; 
    sideFrame.rotation.z -= Math.PI / 2;
    scene.add(sideFrame);

    // Left Window Side Wall Horizontal Top
    geometry = new THREE.BoxBufferGeometry(1, 30, 1);
    sideFrame = new THREE.Mesh( geometry, materialGrayWall );
    sideFrame.receiveShadow = true;
    sideFrame.castShadow = true;
    sideFrame.position.x = 115; 
    sideFrame.position.y = 37.5; 
    sideFrame.position.z = -40; 
    sideFrame.rotation.z -= Math.PI / 2;
    scene.add(sideFrame);

    // Right Window Side Wall Horizontal Top
    geometry = new THREE.BoxBufferGeometry(1, 30, 1);
    sideFrame = new THREE.Mesh( geometry, materialGrayWall );
    sideFrame.receiveShadow = true;
    sideFrame.castShadow = true;
    sideFrame.position.x = 115; 
    sideFrame.position.y = 37.5; 
    sideFrame.position.z = 40; 
    sideFrame.rotation.z -= Math.PI / 2;
    scene.add(sideFrame);
    //#endregion Cafe Side Walls

    //#region Cafe Tarpaulins
    // Left Tarpaulin
    geometry = new THREE.BoxBufferGeometry(20, 33, 1);
    cafeTarpaulinLeft = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinLeft.receiveShadow = true;
    cafeTarpaulinLeft.castShadow = true;
    cafeTarpaulinLeft.position.y = 42; 
    cafeTarpaulinLeft.position.x = 43; 
    cafeTarpaulinLeft.position.z = -34;
    cafeTarpaulinLeft.rotation.x = -1.98;  
    cafeTarpaulinLeft.rotation.y = -0.45;    
    cafeTarpaulinLeft.rotation.z = -0.78;    
    scene.add( cafeTarpaulinLeft );

    // Left Most Tarpaulin
    geometry = new THREE.BoxBufferGeometry(80, 20, 1);
    cafeTarpaulinLeftMost = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinLeftMost.receiveShadow = true;
    cafeTarpaulinLeftMost.castShadow = true;
    cafeTarpaulinLeftMost.position.y = 42; 
    cafeTarpaulinLeftMost.position.x = 100; 
    cafeTarpaulinLeftMost.position.z = -50;
    cafeTarpaulinLeftMost.rotation.x = 1;   
    scene.add( cafeTarpaulinLeftMost );

    // Right Tarpaulin
    geometry = new THREE.BoxBufferGeometry(20, 33, 1);
    cafeTarpaulinRight = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinRight.receiveShadow = true;
    cafeTarpaulinRight.castShadow = true;
    cafeTarpaulinRight.position.y = 42; 
    cafeTarpaulinRight.position.x = 43; 
    cafeTarpaulinRight.position.z = 34;
    cafeTarpaulinRight.rotation.x = -1.17;  
    cafeTarpaulinRight.rotation.y = -0.47;    
    cafeTarpaulinRight.rotation.z = 0.75;    
    scene.add( cafeTarpaulinRight );

    // Right Most Tarpaulin
    geometry = new THREE.BoxBufferGeometry(80, 20, 1);
    cafeTarpaulinRightMost = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinRightMost.receiveShadow = true;
    cafeTarpaulinRightMost.castShadow = true;
    cafeTarpaulinRightMost.position.y = 42; 
    cafeTarpaulinRightMost.position.x = 100; 
    cafeTarpaulinRightMost.position.z = 50;
    cafeTarpaulinRightMost.rotation.x = -1;   
    scene.add( cafeTarpaulinRightMost );

    // Tarpaulin Bottom
    // 1 Left Most
    geometry = new THREE.BoxBufferGeometry(80, 5, 1);
    cafeTarpaulinBottom = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinBottom.receiveShadow = true;
    cafeTarpaulinBottom.castShadow = true;
    cafeTarpaulinBottom.position.y = 34.5; 
    cafeTarpaulinBottom.position.x = 100; 
    cafeTarpaulinBottom.position.z = -58;  
    scene.add( cafeTarpaulinBottom );

    // 2 Right Most
    cafeTarpaulinBottom = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinBottom.receiveShadow = true;
    cafeTarpaulinBottom.castShadow = true;
    cafeTarpaulinBottom.position.y = 34.5; 
    cafeTarpaulinBottom.position.x = 100; 
    cafeTarpaulinBottom.position.z = 58;  
    scene.add( cafeTarpaulinBottom );

    // 3 Left
    geometry = new THREE.BoxBufferGeometry(33, 5, 1);
    cafeTarpaulinBottom = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinBottom.receiveShadow = true;
    cafeTarpaulinBottom.castShadow = true;
    cafeTarpaulinBottom.position.y = 34.5; 
    cafeTarpaulinBottom.position.x = 38; 
    cafeTarpaulinBottom.position.z = -38;  
    cafeTarpaulinBottom.rotation.y = 0.9;
    scene.add( cafeTarpaulinBottom );

    // 4 Right
    cafeTarpaulinBottom = new THREE.Mesh( geometry, materialTarpaulin );
    cafeTarpaulinBottom.receiveShadow = true;
    cafeTarpaulinBottom.castShadow = true;
    cafeTarpaulinBottom.position.y = 34.5; 
    cafeTarpaulinBottom.position.x = 38; 
    cafeTarpaulinBottom.position.z = 38;  
    cafeTarpaulinBottom.rotation.y = - 0.9;
    scene.add( cafeTarpaulinBottom );
    //#endregion Cafe Tarpaulins

    //#region Cafe Windows, Fences, and Ledges
    // Balcony Window 
    geometry = new THREE.BoxBufferGeometry(15, 30, 3);
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 120; 
    cafeBalconyWindow.position.x = 48; 
    cafeBalconyWindow.position.z = 0;
    cafeBalconyWindow.rotation.y = Math.PI / 2;   
    scene.add( cafeBalconyWindow );

    // Side Balcony Windows 1
    // Window Right Bottom
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 62; 
    cafeBalconyWindow.position.x = 95; 
    cafeBalconyWindow.position.z = 33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Left Bottom
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 62; 
    cafeBalconyWindow.position.x = 95; 
    cafeBalconyWindow.position.z = -33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Right Middle
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 97; 
    cafeBalconyWindow.position.x = 95; 
    cafeBalconyWindow.position.z = 33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Left Middle
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 97; 
    cafeBalconyWindow.position.x = 95; 
    cafeBalconyWindow.position.z = -33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Right Top
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 132; 
    cafeBalconyWindow.position.x = 95; 
    cafeBalconyWindow.position.z = 33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Left Top
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 132; 
    cafeBalconyWindow.position.x = 95; 
    cafeBalconyWindow.position.z = -33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Side Balcony Windows 2
    // Window Right Bottom
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 62; 
    cafeBalconyWindow.position.x = 145; 
    cafeBalconyWindow.position.z = 33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Left Bottom
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 62; 
    cafeBalconyWindow.position.x = 145; 
    cafeBalconyWindow.position.z = -33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Right Middle
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 97; 
    cafeBalconyWindow.position.x = 145; 
    cafeBalconyWindow.position.z = 33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Left Middle
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 97; 
    cafeBalconyWindow.position.x = 145; 
    cafeBalconyWindow.position.z = -33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Right Top
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 132; 
    cafeBalconyWindow.position.x = 145; 
    cafeBalconyWindow.position.z = 33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Left Top
    cafeBalconyWindow = new THREE.Mesh( geometry, materialWindow );
    cafeBalconyWindow.receiveShadow = true;
    cafeBalconyWindow.castShadow = true;
    cafeBalconyWindow.position.y = 132; 
    cafeBalconyWindow.position.x = 145; 
    cafeBalconyWindow.position.z = -33;
    cafeBalconyWindow.rotation.y = Math.PI;   
    scene.add( cafeBalconyWindow );

    // Window Ledges 1
    // Cafe Right 1
    geometry = new THREE.BoxBufferGeometry(5, 105, 10);
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 80; 
    cafeWindowLedge.position.z = 33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Cafe Right 2
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 110; 
    cafeWindowLedge.position.z = 33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Cafe Left 1
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 80; 
    cafeWindowLedge.position.z = -33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Cafe Left 2
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 110; 
    cafeWindowLedge.position.z = -33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Window Ledges 2
    // Cafe Right 1
    geometry = new THREE.BoxBufferGeometry(5, 105, 10);
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 130; 
    cafeWindowLedge.position.z = 33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Cafe Right 2
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 160; 
    cafeWindowLedge.position.z = 33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Cafe Left 1
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 130; 
    cafeWindowLedge.position.z = -33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Cafe Left 2
    cafeWindowLedge = new THREE.Mesh( geometry, materialWhiteWood );
    cafeWindowLedge.receiveShadow = true;
    cafeWindowLedge.castShadow = true;
    cafeWindowLedge.position.y = 100; 
    cafeWindowLedge.position.x = 160; 
    cafeWindowLedge.position.z = -33;
    cafeWindowLedge.rotation.y = Math.PI / 2;   
    scene.add( cafeWindowLedge );

    // Side Balconies 1
    // Right Bottom
    geometry = new THREE.BoxBufferGeometry(5, 10, 25);
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 82.5; 
    cafeSideBalcony.position.x = 95; 
    cafeSideBalcony.position.z = 35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Right Middle
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 115; 
    cafeSideBalcony.position.x = 95; 
    cafeSideBalcony.position.z = 35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Right Top
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 152; 
    cafeSideBalcony.position.x = 95; 
    cafeSideBalcony.position.z = 35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Left Bottom
    geometry = new THREE.BoxBufferGeometry(5, 10, 25);
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 82.5; 
    cafeSideBalcony.position.x = 95; 
    cafeSideBalcony.position.z = -35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Left Middle
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 115; 
    cafeSideBalcony.position.x = 95; 
    cafeSideBalcony.position.z = -35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Left Top
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 152; 
    cafeSideBalcony.position.x = 95; 
    cafeSideBalcony.position.z = -35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Side Balconies 2
    // Right Bottom
    geometry = new THREE.BoxBufferGeometry(5, 10, 25);
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 82.5; 
    cafeSideBalcony.position.x = 145; 
    cafeSideBalcony.position.z = 35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Right Middle
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 115; 
    cafeSideBalcony.position.x = 145; 
    cafeSideBalcony.position.z = 35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Right Top
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 152; 
    cafeSideBalcony.position.x = 145; 
    cafeSideBalcony.position.z = 35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Left Bottom
    geometry = new THREE.BoxBufferGeometry(5, 10, 25);
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 82.5; 
    cafeSideBalcony.position.x = 145; 
    cafeSideBalcony.position.z = -35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Left Middle
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 115; 
    cafeSideBalcony.position.x = 145; 
    cafeSideBalcony.position.z = -35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Left Top
    cafeSideBalcony = new THREE.Mesh( geometry, materialWhiteWood );
    cafeSideBalcony.receiveShadow = true;
    cafeSideBalcony.castShadow = true;
    cafeSideBalcony.position.y = 152; 
    cafeSideBalcony.position.x = 145; 
    cafeSideBalcony.position.z = -35;
    cafeSideBalcony.rotation.y = Math.PI / 2;   
    scene.add( cafeSideBalcony );

    // Balcony Fences
    // Fences 1
    // Left Bottom
    geometry = new THREE.BoxBufferGeometry(1, 5, 25);
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 52; 
    cafeFences.position.x = 95; 
    cafeFences.position.z = -36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Left Middle
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 90; 
    cafeFences.position.x = 95; 
    cafeFences.position.z = -36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Left Top
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 122; 
    cafeFences.position.x = 95; 
    cafeFences.position.z = -36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Right Bottom
    geometry = new THREE.BoxBufferGeometry(1, 5, 25);
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 52; 
    cafeFences.position.x = 95; 
    cafeFences.position.z = 36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Right Middle
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 90; 
    cafeFences.position.x = 95; 
    cafeFences.position.z = 36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Right Top
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 122; 
    cafeFences.position.x = 95; 
    cafeFences.position.z = 36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Fences 2
    // Left Bottom
    geometry = new THREE.BoxBufferGeometry(1, 5, 25);
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 52; 
    cafeFences.position.x = 145; 
    cafeFences.position.z = -36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Left Middle
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 90; 
    cafeFences.position.x = 145; 
    cafeFences.position.z = -36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Left Top
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 122; 
    cafeFences.position.x = 145; 
    cafeFences.position.z = -36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Right Bottom
    geometry = new THREE.BoxBufferGeometry(1, 5, 25);
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 52; 
    cafeFences.position.x = 145; 
    cafeFences.position.z = 36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Right Middle
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 90; 
    cafeFences.position.x = 145; 
    cafeFences.position.z = 36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );

    // Right Top
    cafeFences = new THREE.Mesh( geometry, materialFence );
    cafeFences.receiveShadow = true;
    cafeFences.castShadow = true;
    cafeFences.position.y = 122; 
    cafeFences.position.x = 145; 
    cafeFences.position.z = 36;
    cafeFences.rotation.y = Math.PI / 2;   
    scene.add( cafeFences );
    //#endregion Cafe Windows, Fences, and Ledges

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
    chalkboardFront = new THREE.Mesh( geometry, materialChalkboard );
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
    chalkboardBack = new THREE.Mesh( geometry, materialChalkboardBack );
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
    geometry = new THREE.CylinderBufferGeometry(6, 6, 1, 36);
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 32; 
    tableHead.position.y = 17; 
    tableHead.position.z = 25; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);    

    // Table 2
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 30; 
    tableHead.position.y = 17; 
    tableHead.position.z = 40; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 3
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 30; 
    tableHead.position.y = 17; 
    tableHead.position.z = -40; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 4
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 80; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 5
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 95; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 6
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 110; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 7
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 125; 
    tableHead.position.y = 17; 
    tableHead.position.z = 55; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 8
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = -60; 
    tableHead.position.y = 17; 
    tableHead.position.z = -15; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 9
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = -65; 
    tableHead.position.y = 17; 
    tableHead.position.z = 30; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table 10
    tableHead = new THREE.Mesh( geometry, materialTableCloth );
    tableHead.receiveShadow = true;
    tableHead.castShadow = true;
    tableHead.position.x = 55; 
    tableHead.position.y = 17; 
    tableHead.position.z = -50; 
    tableHead.rotation.x -= Math.PI;
    scene.add(tableHead);

    // Table Necks
    // Table 1
    geometry = new THREE.CylinderBufferGeometry(1, 1, 17, 12);
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 32; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 25; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI;
    scene.add(tableNeck);

    // Table 2
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 30; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 40; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/2;
    scene.add(tableNeck);

    // Table 3
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 30; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = -40; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/3;
    scene.add(tableNeck);

    // Table 4
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 80; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/4;
    scene.add(tableNeck);

    // Table 5
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 95; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/5;
    scene.add(tableNeck);

    // Table 6
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 110; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/2;
    scene.add(tableNeck);

    // Table 7
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 125; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 55; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/3;
    scene.add(tableNeck);

    // Table 8
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = -60; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = -15; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/4;
    scene.add(tableNeck);

    // Table 9
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = -65; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = 30; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI/5;
    scene.add(tableNeck);

    // Table 10
    tableNeck = new THREE.Mesh( geometry, materialTableNeck );
    tableNeck.receiveShadow = true;
    tableNeck.castShadow = true;
    tableNeck.position.x = 55; 
    tableNeck.position.y = 8.5; 
    tableNeck.position.z = -50; 
    tableNeck.rotation.x -= Math.PI;
    tableNeck.rotation.y -= Math.PI;
    scene.add(tableNeck);

    // Table Legs
    // Table 1
    geometry = new THREE.CylinderBufferGeometry(3.5, 1.5, 2, 36);
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 32; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 25; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI;
    scene.add(tableLeg);

    // Table 2    
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 30; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 40; 
    tableLeg.rotation.x -= Math.PI;
    scene.add(tableLeg);

    // Table 3
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 30; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = -40; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 4
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 80; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 5
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 95; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 6
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 110; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 7
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 125; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 55; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/2;
    scene.add(tableLeg);

    // Table 8
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = -60; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = -15; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI/3;
    scene.add(tableLeg);

    // Table 9
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = -65; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = 30; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI;
    scene.add(tableLeg);

    // Table 10
    tableLeg = new THREE.Mesh( geometry, materialTableLeg );
    tableLeg.receiveShadow = true;
    tableLeg.castShadow = true;
    tableLeg.position.x = 55; 
    tableLeg.position.y = 4; 
    tableLeg.position.z = -50; 
    tableLeg.rotation.x -= Math.PI;
    tableLeg.rotation.y -= Math.PI;
    scene.add(tableLeg);
    //#endregion Tables

    //================================== LIGHTING ==================================
    //#region Lighting
    // Ambient Light
    ambientLight = new THREE.AmbientLight(0x008B8B, 0.4); // 0.3
    scene.add(ambientLight);

    // Point Light 1 on Lamp 1
    lampLight = new THREE.PointLight(0xea835b, 1, 100);
    lampLight.position.set(34, 37, 15);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 2 on Lamp 2
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(34, 37, -15);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 3 on Model Street Light
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(-35, 50, 70);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 4 on Model Street Light
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(-45, 50, 70);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 5 inside Cafe
    lampLight = new THREE.PointLight(0xea835b, 5, 150);
    lampLight.position.set(100, 35, 0);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 6 on Side Building
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(180, 90, 80);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 7 on Building 1
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(-92, 53, -170);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 8 on Building 1
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(8, 53, -170);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 9 on Unkown Back Building 
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(-115, 50, -40);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 10 on Building 2
    lampLight = new THREE.PointLight(0xea835b, 2, 100);
    lampLight.position.set(70, 70, -160);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    // Point Light 11 below Balcony
    lampLight = new THREE.PointLight(0xea835b, 1, 100);
    lampLight.position.set(45, 75, 0);
    lampLight.castShadow = true;
    scene.add(lampLight);
    lightHelper = new THREE.PointLightHelper(lampLight, 1);
    // scene.add(lightHelper);

    //#endregion Lighting
    window.addEventListener("resize", onWindowResize, false);
    animate();
}

function animate(){
    controls.update();
    requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

function keyDown(event){
    keyboard[event.keyCode] = true;
}

function keyUp(event){
    keyboard[event.keyCode] = false;
}
 
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
 
window.onload = init;