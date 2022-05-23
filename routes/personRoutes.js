const router = require('express').Router()

const { app } = require('electron');
const { json } = require('express/lib/response');
const person = require('../models/person')


//Criando pessoa

router.post('/', async (req, res) => {

    const {name, salary, charge} = req.body;
    
    if(!name | !salary | !charge ){
        res.status(422).json({error: 'Os campos Nome, Salário e Cargo são obrigatórios'})
        return
    }
    
    const Objperson = {
        name, 
        salary,
        charge
    }

    try{
        await person.create(Objperson)
        res.status(201).json({message: "Cadastro realizado com sucesso!"})

    }catch(error) {
        res.status(500),json({
            error: error
        })
    }
})

//Atualizando pessoa

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, salary, charge} = req.body

    const Objperson = {
        name, 
        salary,
        charge
    }

    try{
        const updatePerson = await person.updateOne({_id: id}, Objperson)
        
        if(updatePerson.matchedCount === 0){
            res.status(422).json({error: "Usuário não encontrado!"})
            return
        }
        res.status(200).json(Objperson)

    }catch(error){
        res.status(500).json({error: error})
    }
})

//leitura de dados

router.get('/', async (req, res) => {

    try{
        const people = await person.find()
        res.status(200).json(people)
    }catch(error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req,res) => {

    const id = req.params.id 

    try{
        const Objperson = await person.findOne({_id: id})
        
        if(!Objperson)
        {
            res.status(422).json({error: "Usuário não encontrado!"})
            return
        }        
        res.status(200).json(Objperson)

    }catch(error){
        res.status(500).json({error: error})
    }
})


//Excluindo pessoa 

router.delete('/:id', async (req, res) => {

    const id = req.params.id
    const Objperson = await person.findOne({_id: id})

    if(!Objperson)
    {
        res.status(422).json({error: "Usuário não encontrado!"})
        return
    }    
    
    try{
        await person.deleteOne({_id : id})
        res.status(200).json({message: "Remoção realizada com sucesso!"})
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router


