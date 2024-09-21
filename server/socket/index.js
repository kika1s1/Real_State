import express from 'express'
import dotenv from 'dotenv'
import {Server} from 'socket.io'
import http from 'http'
import getUserDetailsFromToken from '../utils/getUserDetailsFromToken.js'
import User from '../models/User.js'
import Conversation from '../models/Conversation.js'
import Message from '../models/Message.js'
import { getConversation } from '../controllers/chat.js'
dotenv.config()
const app = express()

/***socket connection */
const server = http.createServer(app)
// console.log(process.env.FRONTEND_URL)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})


// online user
const onlineUser = new Set()

io.on('connection', async (socket) => {
    // console.log("connect User ", socket.id)

    const token = socket.handshake.auth.token

    // current user details 
    let user
    try {
        user = await getUserDetailsFromToken(token)
    } catch (error) {
        console.error('Failed to get user details from token:', error)
        socket.disconnect(true)
        return
    }

    if (!user || !user._id) {
        console.error('Invalid user details:', user)
        socket.disconnect(true)
        return
    }

    // create a room
    socket.join(user._id.toString())
    onlineUser.add(user._id.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page', async (userId) => {
        // console.log('userId', userId)
        try {
            const userDetails = await User.findById(userId).select("-password")

            const payload = {
                _id: userDetails?._id,
                username: userDetails?.username,
                email: userDetails?.email,
                avatar: userDetails?.avatar,
                online: onlineUser.has(userId)
            }
            socket.emit('message-user', payload)

            // get previous message
            const getConversationMessage = await Conversation.findOne({
                "$or": [
                    { sender: user._id, receiver: userId },
                    { sender: userId, receiver: user._id }
                ]
            }).populate('messages').sort({ updatedAt: -1 })

            socket.emit('message', getConversationMessage?.messages || [])
        } catch (error) {
            console.error('Error in message-page event:', error)
        }
    })

    // new message
    socket.on('new message', async (data) => {
        try {
            // check conversation is available both user
            let conversation = await Conversation.findOne({
                "$or": [
                    { sender: data?.sender, receiver: data?.receiver },
                    { sender: data?.receiver, receiver: data?.sender }
                ]
            })

            // if conversation is not available
            if (!conversation) {
                const createConversation = new Conversation({
                    sender: data?.sender,
                    receiver: data?.receiver
                })
                conversation = await createConversation.save()
            }

            const message = new Message({
                text: data.text,
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
                msgByUserId: data?.msgByUserId,
            })
            const saveMessage = await message.save()

            await Conversation.updateOne({ _id: conversation?._id }, {
                "$push": { messages: saveMessage?._id }
            })

            const getConversationMessage = await Conversation.findOne({
                "$or": [
                    { sender: data?.sender, receiver: data?.receiver },
                    { sender: data?.receiver, receiver: data?.sender }
                ]
            }).populate('messages').sort({ updatedAt: -1 })

            io.to(data?.sender).emit('message', getConversationMessage?.messages || [])
            io.to(data?.receiver).emit('message', getConversationMessage?.messages || [])

            // send conversation
            const conversationSender = await getConversation(data?.sender)
            const conversationReceiver = await getConversation(data?.receiver)

            io.to(data?.sender).emit('conversation', conversationSender)
            io.to(data?.receiver).emit('conversation', conversationReceiver)
        } catch (error) {
            console.error('Error in new message event:', error)
        }
    })

    // sidebar
    socket.on('sidebar', async (currentUserId) => {
        // console.log("current user", currentUserId)
        try {
            const conversation = await getConversation(currentUserId)
            socket.emit('conversation', conversation)
        } catch (error) {
            console.error('Error in sidebar event:', error)
        }
    })

    socket.on('seen', async (msgByUserId) => {
        try {
            let conversation = await Conversation.findOne({
                "$or": [
                    { sender: user?._id, receiver: msgByUserId },
                    { sender: msgByUserId, receiver: user?._id }
                ]
            })

            const conversationMessageId = conversation?.messages || []

            await Message.updateMany(
                { _id: { "$in": conversationMessageId }, msgByUserId: msgByUserId },
                { "$set": { seen: true } }
            )

            // send conversation
            const conversationSender = await getConversation(user?._id?.toString())
            const conversationReceiver = await getConversation(msgByUserId)

            io.to(user?._id?.toString()).emit('conversation', conversationSender)
            io.to(msgByUserId).emit('conversation', conversationReceiver)
        } catch (error) {
            console.error('Error in seen event:', error)
        }
    })

    // disconnect
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id?.toString())
        console.log('disconnect user ', socket.id)
    })
})

export {
    server,
    app
}