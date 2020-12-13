$(document).ready(function() { 
    let cId = 1;
    $.get("https://agendaing.one-2-go.com/servicioWeb/mensaje.php",{op: 'listar', id: cId}, function(data) {
        showData(data);
    }).fail(function() {
        alert('Error');
    });
});

function showData(data) {
    $('#loader').hide();
    if(data.length>0) $('#tableMessages tbody').html('');
    data.forEach(mensaje => {
        $('#tableMessages tbody').append("<tr><th scope=row'>" + mensaje.ID + "</th>"+
        "<td>" + mensaje.REMITENTE.Nombre + "</td>"+
        "<td class='text-left'>" + mensaje.MENSAJE+ "</td>"+
        "<td><button class='btn btn-lg p-2' onclick='reponderMensaje("+mensaje.ID+")'><i class='fas fa-envelope-open fa-lg'></i></button>"+
        "<button class='btn btn-lg p-2' onclick='reponderMensaje("+mensaje.ID+")'><i class='fas fa-reply fa-lg'></i></button>"+
        "<button class='btn btn-lg p-2' onclick='reponderMensaje("+mensaje.ID+")'><i class='fas fa-trash fa-lg'></i></button></td></tr>"
        );								
    });
}

function reponderMensaje(id){
    console.log('respondiedo '+ id);
}
