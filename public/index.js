( ()=>{
    const app = document.querySelector(".chat-app");
const socket = io();
let user;
console.log("hiii")
app.querySelector(".join-button").addEventListener("click", () => {
    const username = app.querySelector("#username").value
    console.log("hello");
    if (username.length == 0) {
        return;
    }
    socket.emit("newuser", username);
    user = username
    app.querySelector(".join-screen-full").classList.remove("active");
    app.querySelector(".chat-screen").classList.add("active");
})

app.querySelector("#send-message").addEventListener("click" , () =>{
    let message = app.querySelector("#input-message").value ; 

    if(message.length == 0 )
    {
        return ; 
    }

    renderMessage("my", {
        username: user, 
        text: message 
    })
    socket.emit("chat",{
        username: user , 
        text: message 
    })

    app.querySelector("#input-message").value = "" ; 
})

app.querySelector("#exit-chat").addEventListener("click", ()=>{
    socket.emit("exituser",user)
    window.location.reload();
})

socket.on("update", (update) =>{
    renderMessage("update",update) 
})
socket.on("chat",(message)=>{
    renderMessage("other",message)
})

const renderMessage = (type,message) =>{
    let container = app.querySelector(".messages") 
    if(type == "my"){
        let ele = document.createElement("div") ; 
        ele.setAttribute("class","message  my-message") 
        ele.innerHTML =`
            <div>
                <div class="name">You</div>
                <div class="text">${message.text}</div>
            </div>
        ` 
        container.appendChild(ele) 
    }
    else if(type == "other"){
        let ele = document.createElement("div") ; 
        ele.setAttribute("class","message  other-message") 
        ele.innerHTML =`
            <div>
                <div class="name">${message.username}</div>
                <div class="text">${message.text}</div>
            </div>
        ` 
        container.appendChild(ele) 
    }
    else if(type == "update"){
        let ele = document.createElement("div") ; 
        ele.setAttribute("class","update") 
        console.log(message);
        ele.innerText = message 
        container.appendChild(ele) 
    }

    container.scrollHeight = container.scrollHeight - container.clientHeight 
}
})()


