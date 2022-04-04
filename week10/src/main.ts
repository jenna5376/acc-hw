import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Raycaster, ShaderMaterial, Shading } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let plane: THREE.Mesh;
let group: THREE.Group;
let roomModel: THREE.Group;


import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
let shaderMat: ShaderMaterial;

function main() {
    initScene();
    initStats();
    initListeners();
}

function initStats() {
    stats = new (Stats as any)();
    document.body.appendChild(stats.dom);
}

function initScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set( 10, 10, 10 );


    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    const shadowIntensity = 0.25;
   
    renderer.shadowMap.enabled = true;

	//ref https://www.youtube.com/watch?v=a0qSHBnqORU
	const rayCaster = new THREE.Raycaster();
	const clickMouse = new THREE.Vector2();
	const moveMouse = new THREE.Vector2();
	var draggable: THREE.Object3D;




    //create mesh for ice cream
    const carpetMat = new THREE.MeshToonMaterial({color: 0xA495CB})
	const wallMat = new THREE.MeshToonMaterial({color: 0x7CA6B7})
    const floorMat = new THREE.MeshToonMaterial({color: 0xA99388})
    const deskMat = new THREE.MeshToonMaterial({color: 0x816863})

	//bed
	const whiteMat = new THREE.MeshToonMaterial({color: 0xEAE0E0})
    const sheet1Mat = new THREE.MeshToonMaterial({color: 0x575591})
    const cushionMat = new THREE.MeshToonMaterial({color: 0x575591})
	const frameMat = new THREE.MeshToonMaterial({color: 0x816863});

    const starMat = new THREE.MeshToonMaterial({color: 0xF3A3C5})
	const paintingMat = new THREE.MeshToonMaterial({color: 0xBBF1F1});


	const potMat = new THREE.MeshToonMaterial({color: 0x8C3B3B});
    const grassMat = new THREE.MeshToonMaterial({color: 0x518046})
	const barkMat = new THREE.MeshToonMaterial({color: 0x48382F});

    const clockMat = new THREE.MeshToonMaterial({color: 0x2B3966})
	const trashMat = new THREE.MeshToonMaterial({color: 0xA26464})

	const laptopMat = new THREE.MeshToonMaterial({color: 0xAFAFB2});

/*

	window.addEventListener("click", event => {
		clickMouse.x = (event.clientX / window.innerWidth)*2 -1;
		clickMouse.y = - (event.clientY / window.innerHeight)*2+1;

		rayCaster.setFromCamera( clickMouse, camera);
	})

	*/

	//add ambient light
	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	const light2 = new THREE.AmbientLight( 0x404040, 0.9 ); // soft white light
	scene.add( light2 )

    //ice cream 1
	group = new THREE.Group()
	scene.add(group)

        const modelLoader = new GLTFLoader().setPath('../resources/models/');
		modelLoader.load('room.gltf', (gltf) => {
			roomModel = gltf.scene;

			roomModel.scale.set(0.01,0.01,0.01);
  


			interface gltfMesh extends THREE.Object3D<THREE.Event> {
				material: THREE.Material
			}

            roomModel.traverse((child: THREE.Object3D<THREE.Event>) =>{
                if (child.name === "carpet") {
                    (child as gltfMesh).material = carpetMat;
                } 		
                if (child.name === "wall1" || child.name === "wall2") {
                    (child as gltfMesh).material = wallMat;
                } 		
                if (child.name === "floor") {
                    (child as gltfMesh).material = floorMat;
                } 
                if (child.name === "desk1" || child.name === "desk2" || child.name === "desk3") {
                    (child as gltfMesh).material = deskMat;
                } 
				if (child.name === "sheet" || child.name === "cushion") {
                    (child as gltfMesh).material = cushionMat;
                } 		
                if (child.name === "sheet1") {
                    (child as gltfMesh).material = sheet1Mat;
                } 		
                if (child.name === "mattress") {
                    (child as gltfMesh).material = whiteMat;
                } 
                if (child.name === "frame") {
                    (child as gltfMesh).material = frameMat;
                } 
				if (child.name === "Star") {
                    (child as gltfMesh).material = starMat;
                } 
                if (child.name === "Cube") {
                    (child as gltfMesh).material = paintingMat;
                } 
				if (child.name === "pot") {
                    (child as gltfMesh).material = potMat;
                } 
				if (child.name === "grass") {
                    (child as gltfMesh).material = grassMat;
                } 
                if (child.name === "bark") {
                    (child as gltfMesh).material = barkMat;
                } 
				if (child.name === "handle" || child.name === "ring") {
                    (child as gltfMesh).material = clockMat;
                } 
				if (child.name === "base") {
                    (child as gltfMesh).material = whiteMat;
                } 
				if (child.name === "trash") {
                    (child as gltfMesh).material = trashMat;
                }
				if (child.name === "top" || child.name === "bottom") {
                    (child as gltfMesh).material = laptopMat;
                }
            })

            group.rotateY(0.3);
			group.add(roomModel)
		});
        
        //not sure why but adding shadow caused the whole scene to turn black
        //roomModel.castShadow = true;


    const uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
    };
    
	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide
	})


    animate();
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', (event) => {
        const { key } = event;

        switch (key) {
            case 'e':
                const win = window.open('', 'Canvas Image');

                const { domElement } = renderer;

                // Makse sure scene is rendered.
                renderer.render(scene, camera);

                const src = domElement.toDataURL();

                if (!win) return;

                win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
                break;

            default:
                break;
        }
    });
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(() => {
        animate();
    });

    let delta = clock.getDelta();
    
    shaderMat.uniforms.u_time.value += delta;
    
    if (stats) stats.update();

    if (controls) controls.update();

    renderer.render(scene, camera);
}

main()
