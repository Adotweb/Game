import { Actor, CollisionType, Color, Engine, Input, Keys, vec } from "excalibur";


declare const socket :any;



class OnlinePlayer extends Actor{
	
	public speed:number = .5; 
	public playerid : string = ""
	constructor(id:string){

		super({
			x:0,
			y:0,
			height:10,
			width:10,
			color:Color.Gray
		})

		this.playerid = id;
	}
	_onInitialize(_engine:Engine, delta:number){
		this.color = Color.Gray	
	}
}

socket.register() 


socket.onopen(() => {

	socket.sendToServer("register", {

		id:socket.id

	})

})


const game = new Engine({
	backgroundColor:Color.White	
})




game.start()

let onlineplayers : OnlinePlayer[] = []


socket.on("playerRegistered", (data:any) => {


	let {clientid} = data; 

	let newPlayer = new OnlinePlayer(clientid)

	onlineplayers.push(newPlayer)	

	game.add(newPlayer)
	
})


socket.on("serverUpdate", (data:any) => {

	console.log(data, onlineplayers) 


})


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
			socket.sendToServer("clientUpdate", {
				clientid:socket.id,
				update:{
					pos:{
						x:this.pos.x,
						y:this.pos.y
					}
				}
			})

		}
		if(game.input.keyboard.isHeld(Keys.S)){
			this.pos.y += this.speed * delta
			socket.sendToServer("clientUpdate", {
				clientid:socket.id,
				update:{
					pos:{
						x:this.pos.x,
						y:this.pos.y
					}
				}
			})
		}
		if(game.input.keyboard.isHeld(Keys.D)){
			this.pos.x += this.speed * delta
			socket.sendToServer("clientUpdate", {
				clientid:socket.id,
				update:{
					pos:{
						x:this.pos.x,
						y:this.pos.y
					}
				}
			})
		}
		if(game.input.keyboard.isHeld(Keys.A)){
			this.pos.x -= this.speed * delta
			socket.sendToServer("clientUpdate", {
				clientid:socket.id,
				update:{
					pos:{
						x:this.pos.x,
						y:this.pos.y
					}
				}
			})
		}
	}
}

let player1 = new Player()



game.add(player1)
