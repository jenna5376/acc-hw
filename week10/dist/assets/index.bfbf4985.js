import{S as A,a as B,P as H,W as R,b as U,O as h,M as o,B as j,c as D,A as y,G as N,d as q,e as T,D as I,C as K,V as J}from"./vendor.adc97187.js";const Q=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&u(f)}).observe(document,{childList:!0,subtree:!0});function p(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(n){if(n.ep)return;n.ep=!0;const i=p(n);fetch(n.href,i)}};Q();var X=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,Y=`precision mediump float;

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
}`;let r,s,l,Z=new K,w,c,v,d,t,g;function $(){te(),ee(),ne()}function ee(){c=new A,document.body.appendChild(c.dom)}function te(){s=new B,l=new H(75,window.innerWidth/window.innerHeight,.1,1e3),l.position.set(10,10,10),r=new R,r.shadowMap.enabled=!0,r.shadowMap.type=U,r.setPixelRatio(window.devicePixelRatio),r.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(r.domElement),w=new h(l,r.domElement),r.shadowMap.enabled=!0;const m=new o({color:10786251}),a=new o({color:8169143}),p=new o({color:11113352}),u=new o({color:8480867}),n=new o({color:15392992}),i=new o({color:5723537}),f=new o({color:5723537}),b=new o({color:8480867}),x=new o({color:15967173}),S=new o({color:12317169}),L=new o({color:9190203}),P=new o({color:5341254}),_=new o({color:4732975}),k=new o({color:2832742}),z=new o({color:10642532}),C=new o({color:11513778}),V=new j(1,1,1),W=new o({color:5666447});t=new D(V,W),t.position.z=5,t.position.y=.9,t.position.x=5,t.castShadow=!0,t.receiveShadow=!0,s.add(t);const O=new y(4210752);s.add(O);const E=new y(4210752,.9);s.add(E),s.add(t),v=new N,s.add(v),new q().setPath("../resources/models/").load("room.gltf",G=>{d=G.scene,d.scale.set(.01,.01,.01),d.traverse(e=>{e.name==="carpet"&&(e.material=m),(e.name==="wall1"||e.name==="wall2")&&(e.material=a),e.name==="floor"&&(e.material=p),(e.name==="desk1"||e.name==="desk2"||e.name==="desk3")&&(e.material=u),(e.name==="sheet"||e.name==="cushion")&&(e.material=f),e.name==="sheet1"&&(e.material=i),e.name==="mattress"&&(e.material=n),e.name==="frame"&&(e.material=b),e.name==="Star"&&(e.material=x),e.name==="Cube"&&(e.material=S),e.name==="pot"&&(e.material=L),e.name==="grass"&&(e.material=P),e.name==="bark"&&(e.material=_),(e.name==="handle"||e.name==="ring")&&(e.material=k),e.name==="base"&&(e.material=n),e.name==="trash"&&(e.material=z),(e.name==="top"||e.name==="bottom")&&(e.material=C)}),v.add(d)});const F={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new J(800,800)}};g=new T({uniforms:F,vertexShader:X,fragmentShader:Y,side:I}),M()}function ne(){window.addEventListener("resize",oe,!1),window.addEventListener("keydown",m=>{const{key:a}=m;a=="w"&&t.position.x>1?t.position.x-=1:a=="s"&&t.position.x<7?t.position.x+=1:a=="a"&&t.position.z<7?t.position.z+=1:a=="d"&&t.position.z>1?t.position.z-=1:t.position.y<=.9&&a==" "&&(t.position.y+=1.5)})}function oe(){l.aspect=window.innerWidth/window.innerHeight,l.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)}function M(){const m=-.04;t.position.y>.9&&(t.position.y+=m),requestAnimationFrame(()=>{M()});let a=Z.getDelta();g.uniforms.u_time.value+=a,c&&c.update(),w&&w.update(),r.render(s,l)}$();
