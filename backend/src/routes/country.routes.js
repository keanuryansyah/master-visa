const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

router.get('/', async (req, res) => {
    const countries = await prisma.country.findMany();
    res.json(countries);
});

router.post('/', async (req, res) => {
    const { name, description, slug } = req.body;
    const c = await prisma.country.create({ data: { name, description, slug } });
    res.json(c);
});

module.exports = router;
