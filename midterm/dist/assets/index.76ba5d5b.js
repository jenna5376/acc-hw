import{A as q,C as I,G as b,S as n,P as K}from"./vendor.7958da20.js";const X=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))f(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&f(g)}).observe(document,{childList:!0,subtree:!0});function p(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(r){if(r.ep)return;r.ep=!0;const o=p(r);fetch(r.href,o)}};X();const Y=t=>new Promise(e=>{t.loader.add("base","assets/base.png").add("socks","assets/socks.png").add("legWarmers","assets/legWarmers.png").add("converse","assets/converse.png").add("dunks","assets/dunks.png").add("boots","assets/boots.png").add("skirt","assets/skirt.png").add("blackPants","assets/blackPants.png").add("brownPants","assets/brownPants.png").add("whiteTN","assets/whiteTN.png").add("hoodie","assets/hoodie.png").add("sweater","assets/sweater.png").add("mask","assets/mask.png").add("hairDown","assets/hairDown.png").add("bun","assets/bun.png").add("braid","assets/braid.png").load(()=>{e()})}),_=async()=>{let t=new q({antialias:!0,backgroundColor:12241376});document.body.style.margin="0",t.renderer.view.style.position="absolute",t.renderer.view.style.display="block",t.renderer.resize(window.innerWidth,window.innerHeight),await Y(t);let e=new I,p=new b;p.lineStyle(2,7436200),p.beginFill(16448250),p.drawRoundedRect(-200,-325,400,650,20),e.addChild(p);let f=new n(t.loader.resources.base.texture),r=new n(t.loader.resources.socks.texture),o=new n(t.loader.resources.legWarmers.texture),g=new n(t.loader.resources.converse.texture),P=new n(t.loader.resources.dunks.texture),F=new n(t.loader.resources.boots.texture),W=new n(t.loader.resources.skirt.texture),T=new n(t.loader.resources.blackPants.texture),H=new n(t.loader.resources.brownPants.texture),S=new n(t.loader.resources.whiteTN.texture),A=new n(t.loader.resources.hoodie.texture),N=new n(t.loader.resources.sweater.texture),L=new n(t.loader.resources.mask.texture),M=new n(t.loader.resources.hairDown.texture),D=new n(t.loader.resources.bun.texture),O=new n(t.loader.resources.braid.texture);f.anchor.set(.5,.5),r.anchor.set(.5,.5),o.anchor.set(.5,.5),g.anchor.set(.5,.5),P.anchor.set(.5,.5),F.anchor.set(.5,.5),W.anchor.set(.5,.5),T.anchor.set(.5,.5),H.anchor.set(.5,.5),S.anchor.set(.5,.5),A.anchor.set(.5,.5),N.anchor.set(.5,.5),L.anchor.set(.5,.5),M.anchor.set(.5,.5),D.anchor.set(.5,.5),O.anchor.set(.5,.5),e.addChild(f),e.x=window.innerWidth/2+300,e.y=window.innerHeight/2;let d=100,i=100,s=100,a=100,m=new b;for(let C=0;C<window.innerHeight;C+=20)m.lineStyle(5,13617894),m.moveTo(0,C),m.lineTo(window.innerWidth,C),m.lineTo(0,C);t.stage.addChild(m),t.stage.addChild(e);let l=new b;l.beginFill(15133168),l.drawRoundedRect(d,i,s,a,15),l.interactive=!0,l.buttonMode=!0,l.on("pointerdown",j);let v=0,c=new b;c.beginFill(15133168),c.drawRoundedRect(d,i,s,a+150,15),c.interactive=!0,c.buttonMode=!0,c.on("pointerdown",E);let k=0,u=new b;u.beginFill(15133168),u.drawRoundedRect(d,i+300,s,a,15),u.interactive=!0,u.buttonMode=!0,u.on("pointerdown",G);let R=0,h=new b;h.beginFill(15133168),h.drawRoundedRect(d,i+450,s,a,15),h.interactive=!0,h.buttonMode=!0,h.on("pointerdown",z);let y=0,w=new b;w.beginFill(15133168),w.drawRoundedRect(d,i+600,s,a,15),w.interactive=!0,w.buttonMode=!0,w.on("pointerdown",B);let x=0;function z(){h.clear(),h.beginFill(11117803),h.drawRoundedRect(d,i,s,a,15),y==0?(e.removeChild(P),e.addChild(F)):y==1?(e.removeChild(F),e.addChild(g)):y==2&&(e.removeChild(g),e.addChild(P)),y++}function B(){w.clear(),w.beginFill(11117803),w.drawRoundedRect(d,i,s,a,15),x==0?(e.removeChild(o),e.addChild(L)):x==1?(e.removeChild(L),e.addChild(r)):x==2&&(e.removeChild(r),e.addChild(o)),x++}function E(){c.clear(),c.beginFill(11117803),c.drawRoundedRect(d,i,s,a,15),k==0?(e.removeChild(S),e.addChild(N)):k==1?(e.removeChild(N),e.addChild(A)):k==2&&(e.removeChild(A),e.addChild(S)),k++}function G(){u.clear(),u.beginFill(11117803),u.drawRoundedRect(d,i,s,a,15),R==0?(e.removeChild(W),e.addChild(H)):R==1?(e.removeChild(H),e.addChild(T)):R==2&&(e.removeChild(T),e.addChild(W)),R++}function j(){l.clear(),l.beginFill(11117803),l.drawRoundedRect(d,i,s,a,15),v==0?(e.removeChild(O),e.addChild(M)):v==1?(e.removeChild(M),e.addChild(D)):v==2&&(e.removeChild(D),e.addChild(O)),v++}t.stage.addChild(c),t.stage.addChild(u),t.stage.addChild(l),t.stage.addChild(h),t.stage.addChild(w),t.stage.interactive=!0,window.addEventListener("resize",C=>{t.renderer.resize(window.innerWidth,window.innerHeight),t.stage.hitArea=new K([0,0,window.innerWidth,0,window.innerWidth,window.innerHeight,0,window.innerHeight])}),document.body.appendChild(t.view),t.ticker.add(J)};function J(t){}_();
