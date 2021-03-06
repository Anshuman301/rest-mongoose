const express = require('express')
require('./utils/db')
const User = require('./utils/db')
const app  = express();
app.use(express.json())
app.listen(3000)
app.post('/users', async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e.message)
    }
})

app.get('/users', async (req,res) => {
    try{
        const users = await User.find({})
        if(!users)
        return res.status(404).send()
        res.status(200).send(users)

    }catch(e){
        res.status(500).send()
    }
})

app.get('/users/:id',async (req,res) => {
    console.log(req.params)
    try{
        const user = await User.findById(req.params.id)
        if(!user)
        return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.patch('/users/:id',async (req,res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user)
        return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.delete('/users/:id',async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user)
            return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
})