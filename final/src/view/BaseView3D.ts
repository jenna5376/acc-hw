import { Clock, Color, OrthographicCamera, PerspectiveCamera, Renderer, Scene, WebGLRenderer } from "three"
import { BaseView } from "./BaseView";

export class BaseView3D extends BaseView {

	scene: Scene;
	camera: OrthographicCamera;
	renderer: WebGLRenderer;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model)
		this.scene = new Scene();
		this.renderer = renderer;

		let d = 2
		let aspect = window.innerWidth / window.innerHeight

		this.camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 2000)
		this.camera.position.set(10, 10, 10)
		this.scene.add(this.camera)
	}

	update(clock: Clock): void {}

	onWindowResize() {
		//this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

}