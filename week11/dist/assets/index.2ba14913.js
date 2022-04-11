import{S as W,a as E,P as G,W as O,b as k,O as F,B as R,M as l,c as P,G as x,d as U,e as B,D as S,f as D,C as H,V as Y}from"./vendor.3341f3a1.js";const j=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const f of t.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&i(f)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}};j();var N=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,$=`precision mediump float;

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
}`;let o,d,r,q=new H,b,p,v,y,g,w,m,M,C;function A(){T(),I(),K()}function I(){p=new W,document.body.appendChild(p.dom)}function T(){d=new E,r=new G(75,window.innerWidth/window.innerHeight,.1,1e3),r.position.z=8,r.position.y=1.1,o=new O,o.shadowMap.enabled=!0,o.shadowMap.type=k,o.setPixelRatio(window.devicePixelRatio),o.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(o.domElement),b=new F(r,o.domElement),o.shadowMap.enabled=!0;const c=new R(20,2,16),s=new l({color:5666447});M=new P(c,s),M.castShadow=!0,M.translateY(-3),d.add(M);const u=new l({color:15917274}),i=new l({color:12856107}),e=new l({color:1118743}),t=new l({color:9728872});y=new x,d.add(y);const f=new U().setPath("../resources/models/");f.load("icecream.gltf",h=>{w=h.scene,w.scale.set(.01,.01,.01),w.position.x=2,w.traverse(n=>{n.type==="Mesh"&&(n.material=u),n.name==="nose"&&(n.material=i),(n.name==="eye1"||n.name==="eye2")&&(n.material=e),n.name==="nose"&&(n.material=i),n.name==="cone"&&(n.material=t)}),y.rotateY(.3),y.add(w)}),g=new x,d.add(g),f.load("icecream2.gltf",h=>{m=h.scene,m.scale.set(.01,.01,.01),m.position.x=-.6,m.position.z=.4,m.rotateY(.2);const n=new l({color:15244965});m.traverse(a=>{a.type==="Mesh"&&(a.material=n),a.name==="nose"&&(a.material=i),(a.name==="eye1"||a.name==="eye2")&&(a.material=e),a.name==="nose"&&(a.material=i),a.name==="cone"&&(a.material=t)}),g.rotateY(-.1),g.add(m)});const _=new B(20,8,10,10),z=new l({color:7116434,side:S}),V={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new Y(800,800)}};C=new D({uniforms:V,vertexShader:N,fragmentShader:$,side:S}),v=new P(_,z),v.position.z=-6,v.receiveShadow=!0,d.add(v),L()}function K(){window.addEventListener("resize",J,!1),window.addEventListener("keydown",c=>{const{key:s}=c;switch(s){case"e":const u=window.open("","Canvas Image"),{domElement:i}=o;o.render(d,r);const e=i.toDataURL();if(!u)return;u.document.write(`<img src='${e}' width='${i.width}' height='${i.height}'>`);break}})}function J(){r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)}function L(){requestAnimationFrame(()=>{L()});let c=q.getDelta();C.uniforms.u_time.value+=c,p&&p.update(),b&&b.update(),o.render(d,r)}A();
