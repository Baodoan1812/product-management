const mongoose = require("mongoose")

const chatsSchema=new mongoose.Schema(
    {
        user_id: String,
        content: String,
        room_chat_id:String,
        images: Array,
        
        deleted : {
            type:Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamps:true
    }
)
const Chat=mongoose.model('Chat',chatsSchema,"chats")
module.exports=Chat;