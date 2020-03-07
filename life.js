(function(){
    const _ = self.Life = function(seed) {
        this.seed = seed
        this.height = seed.length
        this.width = seed[0].length

        this.prevBoard = []
        this.board = cloneArray(this.seed)
    }
    _.prototype = {
        next(){
            this.prevBoard = cloneArray(this.board);
            for(let y = 0; y < this.height; y++){
                for(let x = 0; x < this.width; x++){
                    const neighbors = this.getNeighbors(this.prevBoard, x, y);
                    const alive = !!neighbors
                    if(alive){
                        if(neighbors < 2 || neighbors > 3){
                            this.board[y][x] = 0;
                        }else if(neighbors === 3 ){
                            this.board[y][x] = '*';
                        }
                    }
                }
            }
        },

        getNeighbors (array, x, y) {
            const prevRow = array[y - 1] || [];
            const currentRow = array[y];
            const nextRow = array[y + 1] || [];
            return [
                prevRow[x - 1], prevRow[x], prevRow[x + 1],
                currentRow[x - 1], currentRow[x + 1],
                nextRow[x - 1], nextRow[x], nextRow[x + 1]
            ].reduce((total, curr) => total + +!!curr, 0);
        },

        toString() {
            return this.board.map(row => row.join(' ')).join('\n')
        }
    };


    //helpers
    function cloneArray(array) {
        return array.slice().map(row => row.slice());
    }

})();

(function () {
    const _ = self.LifeView = function(table, size) {
        this.grid = table;
        this.size = size;

        this.createGrid();
    }

    _.prototype = {
        createGrid:function () {
            const fragment = document.createDocumentFragment();
            this.grid.innerHTML = '';
            const checkboxArray = [];

            for(let y = 0; y < this.size; y++){

                const tableRow = document.createElement('tr');
                checkboxArray[y] = [];
                for(let x = 0; x < this.size; x++){

                    const tableData = document.createElement('td');
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxArray[y][x] = checkboxInput;

                    tableData.appendChild(checkboxInput);
                    tableRow.appendChild(tableData);
                }
                fragment.appendChild(tableRow);
            }
            this.grid.appendChild(fragment);
            console.log(checkboxArray);
        }
    }
})();

const newLife = new LifeView(document.querySelector('.grid'), 10);
