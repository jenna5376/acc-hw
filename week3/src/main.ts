import * as PIXI from 'pixi.js'

const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader
        .add('fish', 'assets/fish.png')
        .add('flower', 'assets/flower.png')
        .add('pond', 'assets/pond.png')
        .load(() => {
          resolve();
        });
    });
};

const main = async () => {
    // Actual app
    let app = new PIXI.Application({antialias: true, backgroundColor: 0xbac9e0});

    //get time
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Load assets
    await load(app);

    //set up pond color
    let pondColor = 0x97bfc9
    if (hour>6 && hour <18){
        pondColor = 0x97bfc9;
    }
    else{
        pondColor = 0x2a464d;
    }

    //draw pond base
    let pondBG = new PIXI.Graphics();
    pondBG.beginFill(pondColor);
    pondBG.drawRect(window.innerWidth/2-200,window.innerHeight/2-200,400,400);
    app.stage.addChild(pondBG);

    //draw fish, make it move based on hr
    let fish = new PIXI.Sprite(app.loader.resources[`fish`].texture);
    fish.anchor.set(0.5, 0.5)
    fish.interactive = true;
    fish.x = window.innerWidth/2
    fish.y = window.innerHeight/2
    fish.angle = hour*30;
    app.stage.addChild(fish);

    //draw pond
    let pond = new PIXI.Sprite(app.loader.resources[`pond`].texture);
    pond.anchor.set(0.5, 0.5)
    pond.x = window.innerWidth/2
    pond.y = window.innerHeight/2
    app.stage.addChild(pond);

    //draw flower, make it move based on min
    let flower = new PIXI.Sprite(app.loader.resources[`flower`].texture);
    flower.x = window.innerWidth/2
    flower.y = window.innerHeight/2
    flower.anchor.set(0.5, 0.5)
    flower.angle = min*6;
    app.stage.addChild(flower);

    app.stage.interactive = true
    
    // Handle window resizing
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.hitArea = new PIXI.Polygon([
            0,0,
            window.innerWidth, 0,
            window.innerWidth, window.innerHeight,
            0, window.innerHeight
        ]);
    });

    document.body.appendChild(app.view);

    app.ticker.add(update);
};

// Cannot be an arrow function. Arrow functions cannot have a 'this' parameter.
function update(delta: number) {

    }

main();

