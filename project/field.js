    class Field {
    constructor(rule, randomInitialState, cellSize, fieldSize) {
        fieldSize = createVector(
            min(fieldSize.x, width),
            min(fieldSize.y, height)
        );

        this.cellSize = createVector(
            min(cellSize.x,
                min(100, floor(fieldSize.x / 2))
            ),
            min(cellSize.y,
                min(100, floor(fieldSize.y / 2))
            )
        );

        this.fieldSize = createVector(
            floor(fieldSize.x / this.cellSize.x) * this.cellSize.x,
            floor(fieldSize.y / this.cellSize.y) * this.cellSize.y
        );

        this.numDimensions = createVector(
            this.fieldSize.x / this.cellSize.x,
            this.fieldSize.y / this.cellSize.y
        );

        this.offset = createVector(
            (width - this.fieldSize.x) / 2,
            (height - this.fieldSize.y) / 2
        );

        this.grid = false;
        this.border = false;
        this.cellsColor = color(100);
        this.gridColor = color(30);
        this.borderColor = color(100);

        this.rule = rule;
        this.randomInitialState = randomInitialState;
        this.setGenerations();
    }

    setGenerations() {
        const generations = [];
        let generationCells = undefined;

        for (let i = 0; i < this.numDimensions.y; i++) {
            const generation = new Generation(this, generationCells);

            generationCells = generation.getNextGenerationCells();

            generations.push(generation);
        }

        this.generations = generations;
    }

    renderGenerations() {
        noStroke();
        fill(100);

        this.generations.forEach((generation, index) => {
            for (let i = 1; i < generation.cells.length - 1; i++) {
                if (generation.cells[i] == 1){
                    rect(
                        this.offset.x + (i - 1) * this.cellSize.x,
                        this.offset.y + index * this.cellSize.y,
                        this.cellSize.x,
                        this.cellSize.y
                    );
                }
            }
        });
    }

    renderGrid() {
        if (this.grid) {
            stroke(this.gridColor);
            strokeWeight(1);
            noFill();

            //vertical
            for (let i = 1; i < this.numDimensions.x; i++) {
                line(
                    this.offset.x + i * this.cellSize.x,
                    this.offset.y,
                    this.offset.x + i * this.cellSize.x,
                    this.offset.y + this.fieldSize.y
                );
            }

            //horizontal
            for (let i = 1; i < this.numDimensions.y; i++) {
                line(
                    this.offset.x,
                    this.offset.y + i * this.cellSize.y,
                    this.offset.x + this.fieldSize.x,
                    this.offset.y + i * this.cellSize.y,
                );
            }
        }
    }

    renderBorder() {
        if (this.border) {
            stroke(this.borderColor);
            strokeWeight(2);
            noFill();
            rect(this.offset.x, this.offset.y, this.fieldSize.x, this.fieldSize.y);
        }
    }

    render() {
        this.renderGenerations();
        this.renderGrid();
        this.renderBorder();
    }
}