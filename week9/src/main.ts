import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ShaderMaterial, Shading } from 'three';

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
let group2: THREE.Group;
let iceCreamModel: THREE.Group;
let iceCreamModel2: THREE.Group;
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
    camera.position.z = 8;
    camera.position.y = 1.1;

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    const shadowIntensity = 0.25;

    /* 
    still life was too bright with light due to cartoon mesh
	lightPoint = new THREE.PointLight(0xffffff)
	lightPoint.position.set(50, 50, 45)
    lightPoint.rotateZ(30);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint)

    const mapSize = 1024; // Default 512
    const cameraNear = 0.5; // Default 0.5
    const cameraFar = 500; // Default 500
    lightPoint.shadow.mapSize.width = mapSize;
    lightPoint.shadow.mapSize.height = mapSize;
    lightPoint.shadow.camera.near = cameraNear;
    lightPoint.shadow.camera.far = cameraFar;
    */
   
    renderer.shadowMap.enabled = true;

    //draw base for models
    const geometryBox = new THREE.BoxGeometry(20,2,16);
    const materialBox = new THREE.MeshToonMaterial({ color: 0x56768f});
    cube = new THREE.Mesh(geometryBox, materialBox);
    cube.castShadow = true;
    cube.translateY(-3);
    //cube.receiveShadow = true; //default
    scene.add(cube);

    //create mesh for ice cream
    const iceCreamMat = new THREE.MeshToonMaterial({color: 0xf2e0da})
    const noseMat = new THREE.MeshToonMaterial({color: 0xc42b2b})
    const eyeMat = new THREE.MeshToonMaterial({color: 0x111217})
    const coneMat = new THREE.MeshToonMaterial({color: 0x947368})

    //ice cream 1
	group = new THREE.Group()
	scene.add(group)

        const modelLoader = new GLTFLoader().setPath('../resources/models/');
		modelLoader.load('icecream.gltf', (gltf) => {
			iceCreamModel = gltf.scene;

			iceCreamModel.scale.set(0.01,0.01,0.01);
            iceCreamModel.position.x = 2;

			interface gltfMesh extends THREE.Object3D<THREE.Event> {
				material: THREE.Material
			}

            iceCreamModel.traverse((child: THREE.Object3D<THREE.Event>) =>{
                if (child.type === "Mesh") {
                    (child as gltfMesh).material = iceCreamMat;
                } 		
                if (child.name === "nose") {
                    (child as gltfMesh).material = noseMat;
                } 		
                if (child.name === "eye1" || child.name === "eye2") {
                    (child as gltfMesh).material = eyeMat;
                } 
                if (child.name === "nose") {
                    (child as gltfMesh).material = noseMat;
                } 
                if (child.name === "cone") {
                    (child as gltfMesh).material = coneMat;
                } 
            })

            group.rotateY(0.3);
			group.add(iceCreamModel)
		});
        
        //not sure why but adding shadow caused the whole scene to turn black
        //iceCreamModel.castShadow = true;

        //ice cream 2
        group2 = new THREE.Group()
        scene.add(group2)

		modelLoader.load('icecream2.gltf', (gltf) => {
			iceCreamModel2 = gltf.scene;

			iceCreamModel2.scale.set(0.01,0.01,0.01);
			iceCreamModel2.position.x = -0.6;
            iceCreamModel2.position.z = 0.4;
            iceCreamModel2.rotateY(0.2);

			const iceCreamMat2 = new THREE.MeshToonMaterial({color: 0xe89ea5})

			interface gltfMesh extends THREE.Object3D<THREE.Event> {
				material: THREE.Material
			}

            iceCreamModel2.traverse((child: THREE.Object3D<THREE.Event>) =>{
                if (child.type === "Mesh") {
                    (child as gltfMesh).material = iceCreamMat2;
                } 		
                if (child.name === "nose") {
                    (child as gltfMesh).material = noseMat;
                } 		
                if (child.name === "eye1" || child.name === "eye2") {
                    (child as gltfMesh).material = eyeMat;
                } 
                if (child.name === "nose") {
                    (child as gltfMesh).material = noseMat;
                } 
                if (child.name === "cone") {
                    (child as gltfMesh).material = coneMat;
                } 
            })

            group2.rotateY(-0.1);
			group2.add(iceCreamModel2)
		});


    // add plane
    const geometryPlane = new THREE.PlaneBufferGeometry(20, 8, 10, 10);
    const materialPlane = new THREE.MeshToonMaterial({ 
		color: 0x6c9692, 
		side: THREE.DoubleSide,
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

    plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.position.z = -6;
    plane.receiveShadow = true;
    scene.add(plane);

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
