import * as PIXI from "pixi.js"

const main = async () => {
    // actual app
    let app = new PIXI.Application();

    // display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    //initialize colors
    let petalColor = 0XF9DDD2; 
    let bgColor = 0x4A6274;
    
    //flower presets
    let graphics = new PIXI.Graphics();
    let petalSize = 40;
    let innerPetalSize = 12;
    let flowerSize= 28;
    let flowerX = [-50,75,-50,];
    let flowerSpacingX = 250;

    // view size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.renderer.backgroundColor = bgColor;

    //vertical lines
    for (let x = flowerX[0]+flowerSize*3; x<innerWidth;x+=flowerSpacingX/2){
        graphics.lineStyle(8,petalColor);
        graphics.moveTo(x,0);
        graphics.lineTo(x,innerHeight);
    }

    //draw flowers + horizontal lines
    for (let flowerSpacingY = -20, counter = 0; flowerSpacingY<innerHeight; flowerSpacingY+= 125, counter+=1){
        graphics.lineStyle(8,petalColor);
        graphics.moveTo(0,flowerSpacingY+flowerSize*3)
        graphics.lineTo(innerWidth,flowerSpacingY+flowerSize*3)
        drawFlowerRow(flowerX[counter],flowerSpacingX,flowerSpacingY,counter);

        if (counter%2==0){
            counter = 0;
        }
    }

    app.stage.addChild(graphics);
   
    // Handle window resizing
    window.addEventListener('resize', (_e) => {

        app.renderer.resize(window.innerWidth, window.innerHeight);
        
        graphics.x = window.innerWidth / 2 - graphics.width / 2;
        graphics.y = window.innerHeight / 2 - graphics.height / 2;
    });

    document.body.appendChild(app.view);

    function drawFlowerRow(flowerX:number,flowerSpacingX:number, y:number, counter:number){
        for (let x=flowerX, counter = 0;x<innerWidth;x+=flowerSpacingX,counter+=1){
       
            //rectangles
            graphics.lineStyle(0);
            graphics.beginFill(petalColor);
            graphics.drawRect(x+flowerSize*2,y+flowerSize,flowerSize*2,flowerSize*4);
            graphics.drawRect(x+flowerSize,y+flowerSize*2,flowerSize*4,flowerSize*2);

            //top triangle
            graphics.moveTo(x+flowerSize*4,y+flowerSize);
            graphics.lineTo(x+flowerSize*2,y+flowerSize);
            graphics.lineTo(x+flowerSize*3,y+0);
            graphics.lineTo(x+flowerSize*4,y+flowerSize);
            graphics.closePath();

            //right triangle
            graphics.moveTo(x+flowerSize*5,y+flowerSize*2);
            graphics.lineTo(x+flowerSize*6,y+flowerSize*3);
            graphics.lineTo(x+flowerSize*5,y+flowerSize*4);

            //bottom triangle
            graphics.moveTo(x+flowerSize*2,y+flowerSize*5);
            graphics.lineTo(x+flowerSize*3,y+flowerSize*6);
            graphics.lineTo(x+flowerSize*4,y+flowerSize*5);
            graphics.lineTo(x+flowerSize*2,y+flowerSize*5);

            //left triangle
            graphics.moveTo(x+flowerSize,y+flowerSize*2);
            graphics.lineTo(x+0,y+flowerSize*3);
            graphics.lineTo(x+flowerSize,y+flowerSize*4)
            graphics.lineTo(x+flowerSize,y+flowerSize*2);

            //inner part
            graphics.lineStyle(5,bgColor);
            graphics.moveTo(x+flowerSize*3,y+flowerSize*2);
            graphics.lineTo(x+flowerSize*3,y+flowerSize*4);
            graphics.moveTo(x+flowerSize*2,y+flowerSize*3);
            graphics.lineTo(x+flowerSize*4,y+flowerSize*3);
            graphics.moveTo(x+flowerSize*3,y+flowerSize*3);
            graphics.lineTo(x+flowerSize*2,y+flowerSize*2);
            graphics.moveTo(x+flowerSize*3,y+flowerSize*3);
            graphics.lineTo(x+flowerSize*2,y+flowerSize*4);
            graphics.moveTo(x+flowerSize*3,y+flowerSize*3);
            graphics.lineTo(x+flowerSize*4,y+flowerSize*2);
            graphics.moveTo(x+flowerSize*3,y+flowerSize*3);
            graphics.lineTo(x+flowerSize*4,y+flowerSize*4);

            graphics.endFill();
        }
    }
};


main();

        //code to draw round petals
        /* 
            graphics.beginFill(0xf0e9e1);
            graphics.drawCircle(i,50,petalSize);
            graphics.drawCircle(x+50,50,petalSize);
            graphics.drawCircle(i,100,petalSize);
            graphics.drawCircle(x+50,100,petalSize);

            let random = Math.floor(Math.random()*3);

            graphics.beginFill(petalColors[random]);

            graphics.drawCircle(x+15,65,innerPetalSize);
            graphics.drawCircle(x+35,65,innerPetalSize)
            graphics.drawCircle(x+15,85,innerPetalSize);
            graphics.drawCircle(x+35,85,innerPetalSize)

        */