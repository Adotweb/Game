import { Actor, CollisionType, Color, Engine, vec } from "excalibur";


const game = new Engine({
	
	width:800,
	height:600

})

game.start()
const paddle = new Actor({

	x:150,
	y:game.drawHeight-40,
	color:Color.Chartreuse,
	width:200,
	height:20

})

game.input.pointers.primary.on("move", (evt) => {

	paddle.pos.x = evt.worldPos.x

})


const ball = new Actor({
	x:100,
	y:300,
	radius:10,
	color:Color.Red,
})

const ballspeed = vec(100, 100)

setTimeout(() => {

	ball.vel = ballspeed

}, 1000)


ball.on("postupdate", () => {

	if(ball.pos.x < ball.width /2){
		ball.vel.x = ballspeed.x
	}

	if(ball.pos.x + ball.width/2 > game.drawWidth){
		ball.vel.x = ballspeed.x * -1;
	}
	if(ball.pos.y < ball.height  /2){
		ball.vel.y = ballspeed.y
	}
})
ball.body.collisionType = CollisionType.Passive;

paddle.body.collisionType = CollisionType.Fixed; 


const padding = 20; // px
const xoffset = 65; // x-offset
const yoffset = 20; // y-offset
const columns = 5;
const rows = 3;
 
const brickColor = [Color.Violet, Color.Orange, Color.Yellow];
 
// Individual brick width with padding factored in
const brickWidth = game.drawWidth / columns - padding - padding / columns; // px
const brickHeight = 30; // px
const bricks: Actor[] = [];
for (let j = 0; j < rows; j++) {
  for (let i = 0; i < columns; i++) {
    bricks.push(
      new Actor({
        x: xoffset + i * (brickWidth + padding) + padding,
        y: yoffset + j * (brickHeight + padding) + padding,
        width: brickWidth,
        height: brickHeight,
        color: brickColor[j % brickColor.length],
      })
    );
  }
}
 
bricks.forEach(function (brick) {
  // Make sure that bricks can participate in collisions
  brick.body.collisionType = CollisionType.Active;
 
  // Add the brick to the current scene to be drawn
  game.add(brick);
});

game.add(ball)
game.add(paddle)
