const express = require('express');
const router = express.Router();
const Resolution = require('../models/resolution');

router.get('/', async (req,res)=> {
try{
    const resolution = await Resolution.find()
    res.render(resolution)
}catch (err) {
    res.status(500).json({message: err.message})
}
})

router.get('/:id', getResolution, (req,res)=>{
res.send(res.resolution)
})

router.post('/', async (req,res)=>{
    const resolution = new Resolution({
        agent: req.body.agent,
        phone: req.body.phone
    })
    try{
const newResolution = await resolution.save()
res.status(201).json(newResolution)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id', getResolution, async (req,res)=>{
    if (req.body.agent !== null){
        res.resolution.agent = req.body.agent
    }
    if (req.body.phone !==null){
        res.resolution.phone = req.body.phone
    }
    try{
        const updatedResolution = await res.resolution.save()
        res.json(updatedResolution)
    }catch(err){
     res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getResolution, async (req,res)=>{
    try{
        await res.resolution.remove()
        res.json({message:'Delete Successful'})
    }catch(err){
res.status(500).json({message: err.message})
    }
})

async function getResolution(req,res,next) {
    let resolution
    try{
        resolution = await Resolution.findById(req.params.id)
        if (resolution ==null) {
            return res.status(404).json({message: 'Cannot find ID'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.resolution = resolution
    next()
}

module.exports = router