import { Actor, CollisionType, Color, Engine, Input, Keys, vec } from "excalibur";


const game = new Engine({
	backgroundColor:Color.White	
})

class OnlinePlayer extends Actor{


}


game.start()

class Player extends Actor{

	public speed:number = .5;

	constructor(){
		super({
			x:0,
			y:0,
			width:10,
			height:10,
			color:Color.Black
		})

	}
	_onInitialize(_engine:Engine){
		this.color = Color.Black
	}

	public update(engine: Engine, delta:number){
		super.update(engine, delta)

		if(game.input.keyboard.isHeld(Keys.W)){
			this.pos.y -= this.speed * delta

		}
		if(game.input.keyboard.isHeld(Keys.S)){
			this.pos.y += this.speed * delta

		}
		if(game.input.keyboard.isHeld(Keys.D)){
			this.pos.x += this.speed * delta

		}
		if(game.input.keyboard.isHeld(Keys.A)){
			this.pos.x -= this.speed * delta

		}
	}
}

let player1 = new Player()



game.add(player1)
