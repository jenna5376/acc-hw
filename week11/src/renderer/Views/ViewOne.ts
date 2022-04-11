import {
	Mesh,
	Renderer,
	BoxGeometry,
	MeshPhongMaterial,
	MeshToonMaterial,
	AmbientLight,
	PointLight,
	Group,
	Material,
	TextureLoader,
	RepeatWrapping,
	Texture,
	MeshBasicMaterial,
	WebGLRenderer,
	PlaneBufferGeometry,
	DoubleSide,
	Clock,
	ShaderMaterial,
	Vector2
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseView } from "./BaseView";

import texturePath from '../assets/textures/uv_grid_opengl.jpg'
import modelPath from '../assets/models/iceCreamModel.gltf'

let colorModel = {
	counter: 0
}

const noseMatR = new MeshToonMaterial({color: 0xc42b2b})
const noseMatY = new MeshToonMaterial({color: 0xf2b750})
const noseMatG = new MeshToonMaterial({color: 0x54ab44})
const noseMatB = new MeshToonMaterial({color: 0X3075bf})

export class ViewOne extends BaseView{

	group: Group;
	cube: Mesh;
	plane: Mesh;
	iceCreamModel: Group;
	exampleTexture: Texture;
	counter: Number;

	lightAmbient: AmbientLight;
	lightPoint: PointLight;

	shaderMat: ShaderMaterial;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.counter = 0;
		
		this.iceCreamModel = new Group();
		this.exampleTexture = new Texture();
		this.group = new Group();
		this.scene.add(this.group);

		const cubeGeometry = new BoxGeometry();
		const cubeMaterial = new MeshPhongMaterial({ color: 0xf0bbbb });
		// cubeMaterial.wireframe = true;
		this.cube = new Mesh(cubeGeometry, cubeMaterial);
		this.cube.castShadow = true;

		const geometryPlane = new PlaneBufferGeometry(7, 7, 10, 10);
		const materialPlane = new MeshToonMaterial({
			color: 0x6c9692,
			side: DoubleSide,
		});
		
		const uniforms = {
			u_time: { type: 'f', value: 1.0 },
			u_resolution: { type: 'v2', value: new Vector2(800, 800) },
			// u_mouse: { type: 'v2', value: new THREE.Vector2() },
		};
	
		this.shaderMat = new ShaderMaterial({
			uniforms: uniforms,
			vertexShader: model.vertexShader,
			fragmentShader: model.fragmentShader,
			side: DoubleSide,
		});

		this.plane = new Mesh(geometryPlane, materialPlane)//this.shaderMat);
		this.plane.position.z = -2;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.lightAmbient = new AmbientLight(0x333333);
		this.scene.add(this.lightAmbient);

		this.lightPoint = new PointLight(0xffffff);
		this.lightPoint.position.set(-0.5, 0.5, 4);
		this.lightPoint.castShadow = true;
		this.lightPoint.intensity = 0.25;
		this.scene.add(this.lightPoint);

		let textureMaterial: Material;
		
		let textureLoader = new TextureLoader()
		textureLoader.load(texturePath, (texture) => {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
			this.exampleTexture = texture;
			textureMaterial = new MeshBasicMaterial({ map: texture });

			const modelLoader = new GLTFLoader()
			modelLoader.load(modelPath, (gltf) => {
				this.iceCreamModel = gltf.scene;
				// console.log(this.iceCreamModel);

				this.iceCreamModel.scale.set(0.01, 0.01, 0.01);
				this.iceCreamModel.position.x = 3;

				    //create mesh for ice cream
					const iceCreamMat = new MeshToonMaterial({color: 0xf2e0da})
					
					const eyeMat = new MeshToonMaterial({color: 0x111217})
					const coneMat = new MeshToonMaterial({color: 0x947368})
				

				this.iceCreamModel.traverse((child: THREE.Object3D<THREE.Event>) => {
					// console.log(child);
					// console.log(child.type === 'Mesh');
					if (child.type === "Mesh") {
						(child as gltfMesh).material = iceCreamMat;
					} 		
					if (child.name === "nose") {
						(child as gltfMesh).material = noseMatR;
					} 		
					if (child.name === "eye1" || child.name === "eye2") {
						(child as gltfMesh).material = eyeMat;
					} 
					if (child.name === "cone") {
						(child as gltfMesh).material = coneMat;
					} 


				});

				this.group.add(this.iceCreamModel);
			});
		}, undefined, (err)=> {
			console.log(err)
		});
	}

	addCounter(){
		if (colorModel.counter == 0 || colorModel.counter < 3){
			colorModel.counter ++;
		}
		else{
			colorModel.counter = 0;
		}
	}

	update(clock: Clock, delta: number): void {

		this.shaderMat.uniforms.u_time.value += delta;
		this.iceCreamModel.traverse((child: THREE.Object3D<THREE.Event>) => {
			// console.log(child);
			// console.log(child.type === 'Mesh');
			
			if (child.name === "nose" && colorModel.counter == 0) {
				(child as gltfMesh).material = noseMatR;
			} 
			if (child.name === "nose" && colorModel.counter == 1) {
				(child as gltfMesh).material = noseMatY;
			} 
			if (child.name === "nose" && colorModel.counter == 2) {
				(child as gltfMesh).material = noseMatG;
			} 
			if (child.name === "nose" && colorModel.counter == 3) {
				(child as gltfMesh).material = noseMatB;
			} 		

		});
	
		this.plane.geometry.attributes.position.needsUpdate = true;

	}
}
interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

