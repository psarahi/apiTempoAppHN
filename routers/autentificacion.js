const express = require('express');
const bcrypt = require('bcrypt');
const Proyecto = require('../modelos/proyectoModel');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/:user/:password', async(req, res) => {


});