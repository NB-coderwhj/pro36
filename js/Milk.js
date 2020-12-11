class Milk{
    constructor(){
        this.img = loadImage("images/Milk.png");
        this.milkStock = null;
        this.lastFed = null;
    }

    getFS(){
        database.ref('food').on("value",(data)=>{
            this.milkStock = data.val();
        });
    }
    updateFS(x){
        database.ref('/').update({
            food:x
        })
    }
    deductFS(){
        if(this.milkStock>0){
        this.milkStock -= 1;
        }
    }

    /*updateLastFedTime(hr){
        database.ref('/').update({
            lastFed : hr
        })
    }

    getLFT(){
        database.ref('lastFed').on("value",(data)=>{
            this.lastFed = data.val();
        })
    }*/

    display(){
        var x=50, y=50;

        imageMode(CENTER);
        image(this.img,720,220,70,70);

        if(this.milkStock !== 0){
            for(var i=0;i<this.milkStock;i++){
                if(i%10===0){
                    x=80;
                    y+=70;
                }
                image(this.img,x,y,70,70);
                x+=30
            }
        }
    }
}