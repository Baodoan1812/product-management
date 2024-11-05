

//CLIENT_SEND_MESSAGE
const formSendData= document.querySelector(".chat .inner-form")
if(formSendData){
    formSendData.addEventListener("submit",(e)=>{
        e.preventDefault();
        const content=e.target.elements.content.value
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE",content);
            e.target.elements.content.value=""
        }
    })
}
// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE",(data)=>{
    const myId= document.querySelector("[my-id]").getAttribute('my-id');
    const body= document.querySelector(".chat .inner-body");
    const div= document.createElement('div');
    div.classList.add((myId==data.userId)?'inner-outgoing':'inner-incoming');
    let htmlFullname="";
    if(myId!=data.userId){
        htmlFullname=`<div class="inner-name"> ${data.fullName} </div>`
    }
    div.innerHTML= `
        ${htmlFullname}
        <div class="inner-content"> ${data.content} </div>
    `
    body.appendChild(div);
    body.scrollTop= body.scrollHeight
})


//scroll chat
const bodyChat= document.querySelector(".chat .inner-body");
if(bodyChat){
    bodyChat.scrollTop= bodyChat.scrollHeight
}
