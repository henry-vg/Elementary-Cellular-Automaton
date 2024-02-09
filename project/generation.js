class Generation {
    constructor(field, generationCells) {
        this.field = field;
        this.cells = generationCells === undefined ? this.getFirstGenerationCells() : generationCells;
    }

    getFirstGenerationCells() {
        const cells = [];
        for (let i = -1; i < this.field.numDimensions.x + 1; i++) {
            if (this.field.randomInitialState) {
                cells.push(random([0, 1]));
            }
            else {
                cells.push(i == floor(this.field.numDimensions.x / 2) ? 1 : 0);
            }
        }
        return cells;
    }

    getNextGenerationCells() {
        const cells = [];
        for (let i = 0; i < this.cells.length; i++) {
            const leftNeighbor = i == 0 ? 0 : this.cells[i - 1];
            const rightNeighbor = i == this.cells.length - 1 ? 0 : this.cells[i + 1];
            cells.push(this.getNewCell(this.cells[i], leftNeighbor, rightNeighbor));
        }
        return cells
    }

    getNewCell(cell, leftNeighbor, rightNeighbor) {
        const binaryRule = this.field.rule.toString(2).padStart(8, '0').split('').reverse();
        const binaryNeighbors = `${leftNeighbor}${cell}${rightNeighbor}`;

        return binaryRule[parseInt(binaryNeighbors, 2)];
    }
};