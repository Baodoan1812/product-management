const Chat= require("../../models/chat.model")
const User= require("../../models/user.model")
module.exports.index = async (req, res) => {

   _io.once('connection',(socket)=>{
      socket.on("CLIENT_SEND_MESSAGE",async (content)=>{
         const userId= res.locals.user.id;
         const fullName= res.locals.user.fullName;
         const chat= new Chat({
            user_id:userId,
            content:content
         })
         await chat.save();
         _io.emit("SERVER_RETURN_MESSAGE",{
            userId:userId,
            fullName:fullName,
            content:content
         })
      })
      
    })
   // lay data tu database
   const chats= await Chat.find({
      deleted:false
   })
   for(const chat of chats){
      const infoUser= await User.findOne({
         _id:chat.user_id
      }).select("fullName")
      chat.infoUser= infoUser
   }
   res.render("./client/pages/chats/index",{
      chats:chats
   })
}