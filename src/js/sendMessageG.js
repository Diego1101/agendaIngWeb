let carreras = [];
let grupos = [];
let semestres = [];
let roles = [];

$(document).ready(function() {
    $.get("https://agendaing.one-2-go.com/servicioWeb/catalogos.php",{op: 'carrera'}, function(data) {
        carreras = data;
        fillDrops()
    }).fail(function() {
        alert('Error');
    });

    $.get("https://agendaing.one-2-go.com/servicioWeb/catalogos.php",{op: 'semestre'}, function(data) {
        semestres = data;
        fillDrops()
    }).fail(function() {
        alert('Error');
    });

    $.get("https://agendaing.one-2-go.com/servicioWeb/catalogos.php",{op: 'grupo'}, function(data) {
        grupos = data;
        fillDrops()
    }).fail(function() {
        alert('Error');
    });

    $.get("https://agendaing.one-2-go.com/servicioWeb/catalogos.php",{op: 'rol'}, function(data) {
        roles = data;
        fillDrops()
    }).fail(function() {
        alert('Error');
    });
});

function fillDrops(){
    if(carreras.length > 0 && grupos.length > 0 && semestres.length > 0 && roles.length > 0) {

        carreras.forEach(carrera => {
            $('#dropCarreras').append("<option value='"+carrera.ID+"'>"+carrera.NOMBRE+"</option>")	
        });
        grupos.forEach(grupo => {
            $('#dropGrupo').append("<option value='"+grupo.ID+"'>"+grupo.NOMBRE+"</option>")	
        });
        semestres.forEach(semestre => {
            $('#dropSemestre').append("<option value='"+semestre.ID+"'>"+semestre.NOMBRE+"</option>")	
        });
        roles.forEach(rol => {
            $('#dropRol').append("<option value='"+rol.ID+"'>"+rol.NOMBRE+"</option>")	
        });

        $('#loader').hide();
    }
}

function enviarMensaje() {
    const car = $('#dropCarreras option:selected').val();
    const gru = $('#dropGrupo option:selected').val();
    const rol = $('#dropRol option:selected').val();
    const sem = $('#dropSemestre option:selected').val();
    const mensaje = $('#mess').val();
    const idUs = sessionStorage.getItem('id');
    
    if(!(car === '-1' && gru === '-1' && rol === '-1' && sem === '-1') && mensaje !== '' ) {
        $.get("https://agendaing.one-2-go.com/servicioWeb/mensaje.php",{op: 'crear', id: idUs, mensaje: mensaje, rol: rol, carrera: car, grupo: gru, semestre: sem}, function(data) {
            if( data.RES === '1'){
                alert('Mensaje creado');
                document.location.href = 'myMessagesPMoviles.html';
            } else console.log('Error');
        }).fail(function() {
            alert('Error');
        });
    } else {
        alert('Seleccionar por lo menos un remitente y el mensaje');
    }

}