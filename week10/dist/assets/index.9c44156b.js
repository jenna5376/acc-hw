import{S as O,a as F,P as U,W as z,b as A,O as D,R as G,M as n,A as g,G as H,c as j,d as N,D as $,C as q,V as p}from"./vendor.07b02cec.js";const I=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function l(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=l(t);fetch(t.href,o)}};I();var T=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,K=`precision mediump float;

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
}`;let a,c,s,Y=new q,v,f,d,w,M;function B(){Q(),J(),X()}function J(){f=new O,document.body.appendChild(f.dom)}function Q(){c=new F,s=new U(75,window.innerWidth/window.innerHeight,.1,1e3),s.position.set(10,10,10),a=new z,a.shadowMap.enabled=!0,a.shadowMap.type=A,a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(a.domElement),v=new D(s,a.domElement),a.shadowMap.enabled=!0,new G,new p,new p;const m=new n({color:10786251}),i=new n({color:8169143}),l=new n({color:11113352}),r=new n({color:8480867}),t=new n({color:15392992}),o=new n({color:5723537}),u=new n({color:5723537}),b=new n({color:8480867}),L=new n({color:15967173}),S=new n({color:12317169}),P=new n({color:9190203}),_=new n({color:5341254}),k=new n({color:4732975}),x=new n({color:2832742}),C=new n({color:10642532}),h=new n({color:11513778}),R=new g(4210752);c.add(R);const V=new g(4210752,.9);c.add(V),d=new H,c.add(d),new j().setPath("../resources/models/").load("room.gltf",E=>{w=E.scene,w.scale.set(.01,.01,.01),w.traverse(e=>{e.name==="carpet"&&(e.material=m),(e.name==="wall1"||e.name==="wall2")&&(e.material=i),e.name==="floor"&&(e.material=l),(e.name==="desk1"||e.name==="desk2"||e.name==="desk3")&&(e.material=r),(e.name==="sheet"||e.name==="cushion")&&(e.material=u),e.name==="sheet1"&&(e.material=o),e.name==="mattress"&&(e.material=t),e.name==="frame"&&(e.material=b),e.name==="Star"&&(e.material=L),e.name==="Cube"&&(e.material=S),e.name==="pot"&&(e.material=P),e.name==="grass"&&(e.material=_),e.name==="bark"&&(e.material=k),(e.name==="handle"||e.name==="ring")&&(e.material=x),e.name==="base"&&(e.material=t),e.name==="trash"&&(e.material=C),(e.name==="top"||e.name==="bottom")&&(e.material=h)}),d.rotateY(.3),d.add(w)});const W={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new p(800,800)}};M=new N({uniforms:W,vertexShader:T,fragmentShader:K,side:$}),y()}function X(){window.addEventListener("resize",Z,!1),window.addEventListener("keydown",m=>{const{key:i}=m;switch(i){case"e":const l=window.open("","Canvas Image"),{domElement:r}=a;a.render(c,s);const t=r.toDataURL();if(!l)return;l.document.write(`<img src='${t}' width='${r.width}' height='${r.height}'>`);break}})}function Z(){s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function y(){requestAnimationFrame(()=>{y()});let m=Y.getDelta();M.uniforms.u_time.value+=m,f&&f.update(),v&&v.update(),a.render(c,s)}B();
