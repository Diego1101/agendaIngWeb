$(document).ready(function() {
    $.get("https://agendaing.one-2-go.com/servicioWeb/contacto.php",{op: 'listar'}, function(data) {
        console.log(data);
        showData(data);
    }).fail(function() {
        alert('Error');
    });
});

function showData(data) {
    $('#loader').hide();
    if(data.length>0) $('#tableContactos tbody').html('');
    data.forEach(mensaje => {
        $('#tableContactos tbody').append("<tr><th scope=row'>" + mensaje.ID + "</th>"+
        "<td>" + mensaje.NOMBRE + "</td>"+
        "<td>" + mensaje.CARRERA + "</td>"+
        "<td>" + mensaje.EMAIL + "</td>"+
        "<td><button class='btn btn-lg p-2' onclick='enviarMensaje("+mensaje.ID+")'><i class='fas fa-comments fa-lg'></i></button></td></tr>"
        );								
    });
}

function enviarMensaje(id){
    console.log('respondiedo '+ id);
}
