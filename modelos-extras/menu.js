function obtenerMenu(perfil) {
    var menu = [{
            titulo: 'Administración',
            icon: 'audit',
            submenu: [
                { titulo: 'Cuentas', url: '/cuentas' }
            ]
        },
        {
            titulo: 'Tablero',
            icon: 'dashboard',
            submenu: [
                { titulo: 'Actividad', url: '/actividadActiva' },
                { titulo: 'Reporte', url: '/dashboard' },
            ]
        },
        {
            titulo: 'Mantenimiento',
            icon: 'tool',
            submenu: [
                { titulo: 'Tus Miembros', url: '/equipo' },
                { titulo: 'Tus Actividades', url: '/actividades' },
                { titulo: 'TTus Proyectos', url: '/proyecto' }
            ]
        }
    ];

    return menu;
}

module.exports = obtenerMenu;