const express = require('express');
const bcrypt = require('bcrypt');
const Miembro = require('../modelos/miembrosModel');
const Cuenta = require('../modelos/cuentasModel');

const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/', async(req, res) => {

    let usuarioMiembro = await Miembro.findOne({
        $and: [
            { usuario: req.body.usuario },
            { estado: true }
        ]
    });
    let usuarioCuenta = await Cuenta.findOne({
        $and: [
            { usuario: req.body.usuario },
            { estado: true }
        ]
    });

    if (!usuarioCuenta) {
        if (!usuarioMiembro) {
            return res.status(400).send('Usuario o contraseña incorrectas');
        } else {
            let passwordValidaMiembro = await bcrypt.compare(req.body.password, usuarioMiembro.password);
            if (!passwordValidaMiembro) return res.status(400).send('Usuario o contraseña incorrectas');

            const jwtToken = usuarioMiembro.generarJWT();

            res.status(201).header('Authorization', jwtToken).send('kkkkk');
        }
    } else {
        let passwordValidaCuenta = await bcrypt.compare(req.body.password, usuarioCuenta.password);
        if (!passwordValidaCuenta) return res.status(400).send('Usuario o contraseña incorrectas');

        const jwtToken = usuarioCuenta.generarJWT();

        res.status(201).header('Authorization', jwtToken).send('kkkkkk');
    }

});

module.exports = router;