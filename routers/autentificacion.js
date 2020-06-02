const express = require('express');
const bcrypt = require('bcrypt');
const Miembro = require('../modelos/miembrosModel');
const Cuenta = require('../modelos/cuentasModel');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/', async(req, res) => {
    try {
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
                console.log(process.env.KEY_API_JWT);

                const jwtToken = usuarioMiembro.generarJWT();
                const payload = jwt.verify(jwtToken, process.env.KEY_API_JWT);
                console.log(payload);

                res.status(201).header('Authorization', jwtToken).send(jwtToken);
            }
        } else {
            let passwordValidaCuenta = await bcrypt.compare(req.body.password, usuarioCuenta.password);
            if (!passwordValidaCuenta) return res.status(400).send('Usuario o contraseña incorrectas');

            const jwtToken = usuarioCuenta.generarJWT();
            const payload = jwt.verify(jwtToken, process.env.KEY_API_JWT);
            console.log(payload);

            res.status(201).header('Authorization', jwtToken).send(jwtToken);
        }

    } catch (error) {
        console.log(error);
        res.status(404).send(error);

    }

});

module.exports = router;