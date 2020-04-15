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

    // if (!usuarioCuenta && !usuarioCuenta) return res.status(400).send('Usuario o contraseña incorrectas user');
    // console.log();

    // let passwordValidaMiembro = await bcrypt.compare(req.body.password, usuarioMiembro.password);
    // let passwordValidaCuenta = await bcrypt.compare(req.body.password, usuarioCuenta.password);

    // if (!passwordValidaCuenta && !passwordValidaMiembro) return res.status(400).send('Usuario o contraseña incorrectas pass');

    // res.send('Correcto');

    if (!usuarioCuenta) {
        if (!usuarioMiembro) {
            return res.status(400).send('Usuario o contraseña incorrectas');
        } else {
            let passwordValidaMiembro = await bcrypt.compare(req.body.password, usuarioMiembro.password);
            if (!passwordValidaMiembro) return res.status(400).send('Usuario o contraseña incorrectas');
            res.send({
                id: usuarioMiembro._id,
                nombre: usuarioMiembro.nombre,
                apellido: usuarioMiembro.apellido,
                idCuenta: usuarioMiembro.cuentas,
                perfil: usuarioMiembro.perfiles
            });
        }
    } else {
        let passwordValidaCuenta = await bcrypt.compare(req.body.password, usuarioCuenta.password);
        if (!passwordValidaCuenta) return res.status(400).send('Usuario o contraseña incorrectas');
        res.send({
            id: usuarioCuenta._id,
            nombre: usuarioCuenta.nombre,
            apellido: usuarioCuenta.apellido,
            idCuenta: usuarioCuenta._id,
            perfil: usuarioCuenta.perfiles
        });
    }


    // if (!usuarioMiembro) {
    //     return res.status(400).send('Usuario o contraseña incorrectas user Miem');
    // } else {
    //     let passwordValidaMiembro = await bcrypt.compare(req.body.password, usuarioMiembro.password);
    //     if (!passwordValidaMiembro) return res.status(400).send('Usuario o contraseña incorrectas pass Miem');
    //     res.send('Correcto');

    // }
    // if (!usuarioCuenta) {
    //     return res.status(400).send('Usuario o contraseña incorrectas user Cuenta');
    // } else {
    //     let passwordValidaCuenta = await bcrypt.compare(req.body.password, usuarioCuenta.password);
    //     if (!passwordValidaCuenta) return res.status(400).send('Usuario o contraseña incorrectas pass');
    //     res.send('Correcto');

    // }

});

module.exports = router;