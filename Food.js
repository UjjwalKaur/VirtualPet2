class Food {
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("Milk.png");
    }

    getFoodStock(){
        var FoodStockRef = database.ref('Food');
        FoodStockRef.on("value",function(data){
          FoodS = data.val();
        })
      }

      updateFoodStock(x){
        database.ref('/').update({
            Food: x
          });
      }

      deductFood(x){
        if(x <= 0){
            x=0;
          } else {
            x = x -1;
          }        
      }

      display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
      }
    
}