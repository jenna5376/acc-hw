import './style.scss';
import * as THREE from 'three';
import * as PIXI from 'pixi.js'
import { Material, Mesh, MeshPhongMaterial, MeshStandardMaterial, Raycaster, ShaderMaterial, Shading, TubeBufferGeometry, Vector2 } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as DAT from 'dat.gui';

import { BaseView } from "./view/BaseView";
import { BaseView2D } from './view/BaseView2D';
import { BaseView3D } from './view/BaseView3D';
import { ViewOne } from './view/DesignView';

import { ViewFive } from './view/TutView';

let model = {
	groupX: 0,
	groupY: 0,
	groupAngle: 0,
	color: (0),
	activeView: 1,
	pointerPosition: new THREE.Vector2(0,0),
}



let raycaster = new THREE.Raycaster();
let clickMouse = new THREE.Vector2();
let moveMouse = new THREE.Vector2();
let draggable: THREE.Object3D;

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();


let controls: DragControls;
let stats: any;


let viewOne: ViewOne;

let viewFive: ViewFive;

let views: BaseView[] = [];

let gui: DAT.GUI;

let pixiApp: PIXI.Application = new PIXI.Application();



// let shaderMat: ShaderMaterial;

function main() {
	initScene();
	initStats();
	initGUI();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initGUI() {
	gui = new DAT.GUI();
	updateGUI()
}


   var settings = {

	mode: 0,
	color: 0xffffff
   }


function updateGUI() {

	console.log(gui.__folders);
	if (gui.__folders.group) {
		gui.removeFolder(gui.__folders.group);
	}

	switch (model.activeView) {
		case 0:
			const groupControls = gui.addFolder('group');
			groupControls.open();
			groupControls.add(settings, 'mode', { build: 0, color: 1 } )
			.onChange(updateGUI)

			if (settings.mode == 1){
			groupControls.addColor(settings, 'color') 
				.onChange(changeColor)
			}
			break;
	
		default:
			break;
	}
}

function changeColor(){
	const newMat = new MeshPhongMaterial({ color: settings.color });
	(draggable as gltfMesh).material = newMat;
}

function hoverObject(){

}

function initScene() {
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	pixiApp.renderer.view.style.position = 'absolute';
	pixiApp.renderer.view.style.display = 'none';
	pixiApp.renderer.backgroundColor = 0xe9ffc2;
	pixiApp.renderer.resize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
	document.body.appendChild(pixiApp.view);

	viewOne = new ViewOne(model, renderer);
	views.push(viewOne);

	viewFive = new ViewFive(model, pixiApp);
	views.push(viewFive);

	model.pointerPosition = new THREE.Vector2(0,0);

	animate();
}

let checkObject;

function dragObject(){

	if (draggable != null){

		checkObject = draggable.userData.name;

		if (checkObject != 'planks' && checkObject != 'walls' && checkObject != 'windows' && checkObject != 'floor'){
			
		raycaster.setFromCamera(moveMouse, (views[model.activeView] as BaseView3D).camera);
		const found = raycaster.intersectObject((views[model.activeView] as BaseView3D).scene);
		
		if (found.length >0){
			for (let o of found){
	
				draggable.position.x = o.point.x
				draggable.position.z = o.point.z
			
			}
		}
	}
	}
}

function rotateObjectLeft(){
	if (draggable != null){
		draggable.rotateY(-Math.PI/2);
	}
}

function rotateObjectRight(){
	if (draggable != null){
		draggable.rotateY(Math.PI/2);
	}
}

let prevMat: Material;


function initListeners() {

	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('pointermove', onPointerMove);

	window.addEventListener('click', (event =>{

		if (draggable){
			
			console.log('dropping draggable')
			draggable = null as any
			
			return;

		}

		clickMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		clickMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		
		raycaster.setFromCamera(clickMouse, (views[model.activeView] as BaseView3D).camera);

		const found = raycaster.intersectObject((views[model.activeView] as BaseView3D).scene);
	
		if (found.length > 0 ){
			draggable = found[0].object
			console.log("found draggale " + draggable.userData.name);
			
		}
	
	}))

	window.addEventListener('mousemove', event =>{
		moveMouse.x = (event.clientX / window.innerWidth) * 2 -1;
		moveMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	})

	window.addEventListener('keydown', (event) => {
		const { key } = event;

		switch (key) {
			case 'p':
				settings.mode = 0;
			case 'b':
				settings.mode = 0;
			case ',': 
				if (settings.mode == 0){
				rotateObjectLeft();
			}
				break;
			case '.': 
				if (settings.mode == 0){
				rotateObjectRight();
			}
				break;
			case 'ArrowRight':
				model.activeView = (model.activeView + 1) % views.length
				updateGUI();
				break;

			case 'ArrowLeft':
				model.activeView = (model.activeView - 1)
				if (model.activeView < 0) {
					model.activeView = views.length - 1;
				}
				updateGUI();
				break;
		}
	});
}

function onWindowResize() {
	viewOne.onWindowResize();

}

function onPointerMove(event: any) {
	model.pointerPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
	model.pointerPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

	//viewTwo.onMouseMove()
}


function animate() {

	requestAnimationFrame(() => {
		animate();
		console.log(settings.mode)
		if (settings.mode == 0){
			dragObject();
		}
		
	});

	let delta = clock.getDelta();

	// shaderMat.uniforms.u_time.value += delta;

	switch (model.activeView) {
		case 0:
			viewOne.update(clock);
			break;

		case 1:
			viewFive.update();
			break;

		default:
			break;
	}
	

	if (stats) stats.update();

	// if (controls) controls.update();

	if(views[model.activeView] instanceof BaseView3D) {
		renderer.domElement.style.display = 'block'
		pixiApp.renderer.view.style.display = 'none'

		renderer.render((views[model.activeView] as BaseView3D).scene, (views[model.activeView] as BaseView3D).camera);
	
	}

	if (views[model.activeView] instanceof BaseView2D) {
		renderer.domElement.style.display = 'none'
		pixiApp.renderer.view.style.display = 'block'

		// 
	}
}

main();


interface MeshObj extends THREE.Object3D<THREE.Event> {
	material: THREE.MeshPhongMaterial;
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

interface ColorMaterial extends THREE.Material {
	color: THREE.Color;
}
