(function(){
    const _ = self.Life = function(seed) {
        this.seed = seed
        this.height = seed.length
        this.width = seed[0].length

        this.prevBoard = cloneSeed()
    }
    _.prototype = {
        next(){},

        //helpers
        cloneSeed() {
            return this.seed.slice().map(row => row.slice());
        },
    }

})()