import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

const main = async () => {
    // actual app
    let app = new PIXI.Application();

    let height: Array<number> = []
    let height2: Array<number> = []
    let height3: Array<number> = []

    // display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // view size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.renderer.backgroundColor = 0xf2e8e1;

 
    let graphics = new PIXI.Graphics;
    graphics.moveTo(50,0);
    graphics.lineTo(100,innerHeight);
    let counter = 0
    
    for (let i=0; i<15*Math.PI/16; i+=Math.PI/16){
        height.push(-600*Math.abs(Math.sin(i)),20)  
        height2.push(-400*Math.abs(Math.sin(i)),20)  
        height3.push(-800*Math.abs(Math.sin(i)),20)  
    }

    for (let i = 0; i<20;i++){
        for (let i = 19*Math.PI/16; i<31*Math.PI/16; i+=Math.PI/16){
            height.push(-600*Math.abs(Math.sin(i)),20)
            height2.push(-400*Math.abs(Math.sin(i)),20)
            height3.push(-800*Math.abs(Math.sin(i)),20)
        }
    }
    

    app.stage.addChild(graphics);
    graphics.clear
    

    app.ticker.add(()=>{
       counter += 0.2
       console.log(counter)
        
        graphics.clear()

    
        //purple wave
        for (let i=0; i<height2.length-4; i++){
        
            graphics.beginFill(0x7872e0,.2)
            graphics.drawRoundedRect(-250+i*35,window.innerHeight+20,70,-250+height2[i+Math.floor(counter/3)],20)
            graphics.endFill()

            if (i>height2.length-5){
                i = 0
            }

        }

        //teal
        for (let i=0; i<height.length-4; i++){
        
            graphics.beginFill(0x65c3d6,.6)
            graphics.drawRoundedRect(i*20,window.innerHeight+80,40,height[i+Math.floor(counter*2)],20)
            graphics.endFill()

            if (i>height2.length-5){
                i = 0
            }

        }

        //blue
        for (let i=0; i<height3.length-4; i++){
        
            graphics.beginFill(0x81acc7,.8)
            graphics.drawRoundedRect(i*28+50,window.innerHeight+80,56,100+height[i+Math.floor(counter)],20)
            graphics.endFill()

            if (i>height2.length-5){
                i = 0
            }

        }
        
     
    }
    )
   
    // Handle window resizing
    window.addEventListener('resize', (_e) => {

        app.renderer.resize(window.innerWidth, window.innerHeight);
        
        graphics.x = window.innerWidth / 2 - graphics.width / 2;
        graphics.y = window.innerHeight / 2 - graphics.height / 2;
    });

    document.body.appendChild(app.view);
    

}

main();
