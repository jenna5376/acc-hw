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
let cube: THREE.Mesh;


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

	/*i
	
	my first idea was using a raycaster to enable users to pick up/move furnitures but it didn't work
	*perhaps because i was using 3d groups/children rather than just 3d objects?
	reference code: https://www.youtube.com/watch?v=a0qSHBnqORU&t=235s 
	
	*/
	const floor = 0.9;

    const carpetMat = new THREE.MeshToonMaterial({color: 0xA495CB})
	const wallMat = new THREE.MeshToonMaterial({color: 0x7CA6B7})
    const floorMat = new THREE.MeshToonMaterial({color: 0xA99388})
    const deskMat = new THREE.MeshToonMaterial({color: 0x816863})
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
	const geometryBox = new THREE.BoxGeometry(1,1,1);
    const materialBox = new THREE.MeshToonMaterial({ color: 0x56768f});
    
	//cube player
	cube = new THREE.Mesh(geometryBox, materialBox);
	cube.position.z = 5;
	cube.position.y = 0.9
	cube.position.x = 5

    cube.castShadow = true;
    cube.receiveShadow = true; 
    scene.add(cube);

	//add ambient light
	const light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	const light2 = new THREE.AmbientLight( 0x404040, 0.9 ); // soft white light
	scene.add( light2 )

	scene.add(cube);

    //add room
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
			group.add(roomModel)
		});

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

				if (key == 'w' && cube.position.x > 1){
					cube.position.x -=1;
				}
				else if (key == 's' && cube.position.x < 7){
					cube.position.x +=1;
				}
				else if (key == 'a' && cube.position.z < 7){
					cube.position.z +=1;
				}
				else if (key == 'd' && cube.position.z > 1){
					cube.position.z -=1;
				}
				else if (cube.position.y <= .9 && key == ' '){
					cube.position.y +=1.5;
				}
			

		/* resulted in only s, d input working
        switch (key) {
			case 'w':
				cube.position.x -=1;
			case 's':
				cube.position.x+=1;
			case 'a':
				cube.position.z +=1;
			case 'd':
				cube.position.z -=1;
            default:
                break;
        }
		*/
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {

	const gravity = -0.04;

	if (cube.position.y > .9){
		cube.position.y += gravity
	}

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
