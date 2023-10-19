import { Server } from "socket.io";

const io = new Server(9000,{
    cors:{
        origin: '*',
        methods: ["GET", "POST"],
    }
})

let users = []; 

const addUser = (userData,socketId) =>{
!users.some(user => user.sub == userData.sub) && users.push({...userData,socketId});
}

const getUser = (userId) => {
    console.log("get users :",users.find(user => user.sub === userId ))
    return users.find(user => user.sub === userId );
    
} 

io.on('connection',(socket) =>{
console.log("User Connected",socket.id);

socket.on("addUsers", userData => {
    addUser(userData, socket.id); 
    console.log(userData);
    io.emit("getUsers", users);
});

socket.on('sendMessage',data => {
    const user = getUser(data.receiverId);
    console.log(data);
    
    if(user){
        io.to(user.socketId).emit('getMessage',data);
    }
})

socket.on("disconnect", () => {
    // Remove the user from the users array when they disconnect
    const userIndex = users.findIndex(user => user.socketId === socket.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        io.emit("getUsers", users);
    }
    console.log("user disconneted",socket.id);
});


})