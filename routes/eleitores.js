const express = require('express');
const router = express.Router();
const Eleitor = require('../models/Eleitor');

router.post('/', async (req, res) => {
    console.log('Requisição POST recebida em /api/eleitores com dados:', req.body);

    const { nome, etitulo, vote } = req.body;

    if (!nome || !etitulo) {
        console.error('Erro de validação: Campos obrigatórios faltando.');
        return res.status(400).json({ message: 'Os campos nome e etitulo são obrigatórios.' });
    }

    try {
        const newEleitor = new Eleitor({ nome, etitulo, vote });
        await newEleitor.save();
        console.log('Novo eleitor salvo:', newEleitor);
        res.json(newEleitor);
    } catch (error) {
        console.error('Erro ao salvar o eleitor:', error);
        res.status(500).json({ message: 'Erro ao salvar o eleitor.', error });
    }
});

router.get('/', async (req, res) => {
    console.log('Requisição GET recebida em /api/eleitores');
    try {
        const eleitores = await Eleitor.find();
        console.log('Lista de eleitores:', eleitores);
        res.json(eleitores);
    } catch (error) {
        console.error('Erro ao listar eleitores:', error);
        res.status(500).json({ message: 'Erro ao listar eleitores.', error });
    }
});

router.put('/:id', async (req, res) => {
    console.log('Requisição PUT recebida em /api/eleitores com dados:', req.body);
    const { nome, etitulo, vote } = req.body;

    try {
        const updatedEleitor = await Eleitor.findByIdAndUpdate(req.params.id, { nome, etitulo, vote }, { new: true });
        console.log('Eleitor atualizado:', updatedEleitor);
        res.json(updatedEleitor);
    } catch (error) {
        console.error('Erro ao atualizar eleitor:', error);
        res.status(500).json({ message: 'Erro ao atualizar eleitor.', error });
    }
});

router.delete('/:id', async (req, res) => {
    console.log('Requisição DELETE recebida em /api/eleitores com ID:', req.params.id);
    try {
        await Eleitor.findByIdAndDelete(req.params.id);
        console.log('Eleitor excluído com sucesso, ID:', req.params.id);
        res.json({ message: 'Eleitor excluído do cadastro' });
    } catch (error) {
        console.error('Erro ao excluir eleitor:', error);
        res.status(500).json({ message: 'Erro ao excluir eleitor.', error });
    }
});

module.exports = router;
