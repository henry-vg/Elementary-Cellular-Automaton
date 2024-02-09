const rule = 154;
const randomInitialState = false;
let field;

function setup() {
    createCanvas(windowWidth, windowHeight);

    background(20);
    
    field = new Field(
        rule,
        randomInitialState,
        createVector(1, 1),
        createVector(width, height),
    );

    field.render();
    console.log('Done.');
}