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
let exampleModel: THREE.Group;
let exampleTexture: THREE.Texture;

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

    //add raycaster
    //add pick and drop
    //add gui for color
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set( 2, 2, 2 );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

	 lightAmbient = new THREE.AmbientLight(0xE8EBED);
	 scene.add(lightAmbient);

   
    const shadowIntensity = 0.5;

	lightPoint = new THREE.PointLight(0xffffff)
	lightPoint.position.set(-0.5, 0.5, 4)
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint)

    const lightPoint2 = lightPoint.clone();
    lightPoint2.intensity = 1 - shadowIntensity;
    lightPoint2.castShadow = false;
    scene.add(lightPoint2);

    const mapSize = 1024; // Default 512
   
    lightPoint.shadow.mapSize.width = mapSize;
    lightPoint.shadow.mapSize.height = mapSize;
 


	group = new THREE.Group()
	scene.add(group)

    // // load a texture
    let textureMaterial: THREE.Material;
	let textureLoader = new THREE.TextureLoader().setPath('/resources/textures/')
    textureLoader.load('uv_grid_opengl.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        exampleTexture = texture;

		textureMaterial = new THREE.MeshBasicMaterial({map: texture});


        const modelLoader = new GLTFLoader().setPath('/resources/models/');
		modelLoader.load('room.gltf', (gltf) => {
			exampleModel = gltf.scene;
			console.log(exampleModel)

			exampleModel.scale.set(1,1,1);

			const teapotMat = new THREE.MeshPhongMaterial({color: 0x22ff22})

			interface gltfMesh extends THREE.Object3D<THREE.Event> {
				material: THREE.Material
			}

			exampleModel.traverse((child: THREE.Object3D<THREE.Event>) => {
				console.log(child)
				console.log(child.type === "Mesh")
					
			})

			// scene.add(exampleModel)
			group.add(exampleModel)
		})
    });


	


    // // Add a plane


    const uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2(800,800) },
        // u_mouse: { type: 'v2', value: new THREE.Vector2() },
    };

    // shaderMat = new THREE.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader: vertexShader,
    //     fragmentShader: fragmentShader,
    // });

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide
	})


    // // Init animation
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

   

    if (stats) stats.update();

    if (controls) controls.update();

    renderer.render(scene, camera);
}

main()