const app = require("localhostjs");
const path = require("path")
const express = app.express;

app.rest.use(express.static(path.join(__dirname, "dist")))



let gameState = {
	players:[]
}

let clients = []

app.socket.on("register", (data) => {

	let clientid = data.id;
	

	clients.push(clientid)



	app.socket.send("playerRegistered", {
		clientid,
	}, clients.filter(id => id!= clientid))
	
	app.socket.send("getGameState", gameState, clientid)


	gameState.players.push(clientid)
})


app.socket.on("clientUpdate", (data) => {

	console.log(data)


	

	app.socket.send("serverUpdate", data, clients.filter(id => id!=data.clientid))

})

const env = require("./env.json")
app.listen(env)
