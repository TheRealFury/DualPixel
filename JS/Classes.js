class blueBullet {
    constructor(){
      this.x = playerBlue.x;
      this.y = playerBlue.y;
      this.direction = blueDirection;
    }
    display(){
      fill('blue');
      rect(this.x, this.y, 10, 10);
      if(this.direction == 'l'){
        this.x -= 20;
      }
      else if(this.direction == 'r'){
        this.x += 20;
      }
    }
  }
  
  class redBullet {
    constructor(){
      this.x = playerRed.x;
      this.y = playerRed.y;
      this.direction = redDirection;
    }
  
    display(){
      fill('red');
      rect(this.x, this.y, 10, 10);
      if(this.direction == 'l'){
        this.x -= 20;
      }
      else if(this.direction == 'r'){
        this.x += 20;
      }
    }
  }