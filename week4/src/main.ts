import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

const main = async () => {
    // actual app
    let app = new PIXI.Application();

    let height: Array<number> = []
    let height2: Array<number> = []

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
    }

    for (let i = 0; i<3;i++){
        for (let i = 19*Math.PI/16; i<31*Math.PI/16; i+=Math.PI/16){
            height.push(-600*Math.abs(Math.sin(i)),20)
            height2.push(-400*Math.abs(Math.sin(i)),20)
        }
    }
    

    app.stage.addChild(graphics);
    graphics.clear
    

    app.ticker.add(()=>{
       counter += 0.2
       console.log(counter)
        
        graphics.clear()

        for (let i=0; i<height2.length-4; i++){
        
            graphics.beginFill(0x7872e0,.6)
            graphics.drawRoundedRect(-250+i*50,window.innerHeight+80,40,height2[i+Math.floor(counter/1.5)],20)
            graphics.endFill()
            

        }

        for (let i=0; i<height.length-4; i++){
        
            graphics.beginFill(0x81acc7,.6)
            graphics.drawRoundedRect(i*30,window.innerHeight+80,40,height[i+Math.floor(counter)],20)
            graphics.endFill()
            

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
