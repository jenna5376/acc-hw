import{S as R,a as V,P as A,W as E,b as F,O,A as k,c as S,B as U,M as y,d as P,G as j,T as D,R as H,e as N,f as T,g as B,D as M,h as I,C as $,V as q}from"./vendor.c910d6b9.js";const K=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function d(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=d(e);fetch(e.href,n)}};K();var J=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,Q=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.)
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}`;let o,a,l,X=new $,L,t,b,h,m,w,g,c,x;function Y(){ee(),Z(),te()}function Z(){h=new R,document.body.appendChild(h.dom)}function ee(){a=new V,l=new A(75,window.innerWidth/window.innerHeight,.1,1e3),l.position.z=5,o=new E,o.shadowMap.enabled=!0,o.shadowMap.type=F,o.setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(o.domElement),b=new O(l,o.domElement),L=new k(3355443),a.add(L);const r=.25;t=new S(16777215),t.position.set(-.5,.5,4),t.castShadow=!0,t.intensity=r,a.add(t),t=new S(16777215),t.position.set(-.5,.5,4),t.castShadow=!0,t.intensity=r,a.add(t);const i=t.clone();i.intensity=1-r,i.castShadow=!1,a.add(i);const d=1024,s=.5,e=500;t.shadow.mapSize.width=d,t.shadow.mapSize.height=d,t.shadow.camera.near=s,t.shadow.camera.far=e;const n=new U,u=new y({color:15776699});m=new P(n,u),m.castShadow=!0,g=new j,g.add(m),m.position.set(-2,0,0),a.add(g);let v;new D().setPath("../resources/textures/").load("uv_grid_opengl.jpg",function(p){p.wrapS=p.wrapT=H,p.anisotropy=o.capabilities.getMaxAnisotropy(),v=new N({map:p}),m.material=v,new T().setPath("../resources/models/").load("icecream.gltf",G=>{c=G.scene,console.log(c),c.scale.set(.01,.01,.01),c.position.x=2,new y({color:2293538}),c.traverse(f=>{console.log(f),console.log(f.type==="Mesh"),f.type==="Mesh"&&(f.material=v)}),g.add(c)})});const z=new B(6,6,10,10),C=new y({color:6710886,side:M,flatShading:!0}),W={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new q(800,800)}};x=new I({uniforms:W,vertexShader:J,fragmentShader:Q,side:M}),w=new P(z,C),w.position.z=-2,w.receiveShadow=!0,a.add(w),_()}function te(){window.addEventListener("resize",ne,!1),window.addEventListener("keydown",r=>{const{key:i}=r;switch(i){case"e":const d=window.open("","Canvas Image"),{domElement:s}=o;o.render(a,l);const e=s.toDataURL();if(!d)return;d.document.write(`<img src='${e}' width='${s.width}' height='${s.height}'>`);break}})}function ne(){l.aspect=window.innerWidth/window.innerHeight,l.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}function _(){requestAnimationFrame(()=>{_()});let r=X.getDelta();x.uniforms.u_time.value+=r,w.geometry.attributes.position,h&&h.update(),b&&b.update(),o.render(a,l)}Y();
