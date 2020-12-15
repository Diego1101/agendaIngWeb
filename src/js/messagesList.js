$(document).ready(function() { 
    let cId = sessionStorage.getItem('id');
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
        "<td><button class='btn btn-lg p-2' onclick='reponderMensaje("+mensaje.ID+", `" + mensaje.NOMBRE +"`)'><i class='fas fa-reply fa-lg'></i></button></td></tr>"
        );								
    });
}

function verMensaje(id, name){
    console.log('viendo '+ id);
    sessionStorage.setItem('idDes', id);
    sessionStorage.setItem('nameDes', name);
    let params = `op=crear&&id=`+id;
    window.location.href = 'sendMessPMoviles.html';
}

function reponderMensaje(id, name){
    console.log('respondiedo '+ id);
    sessionStorage.setItem('idDes', id);
    sessionStorage.setItem('nameDes', name);
    window.location.href = 'sendMessPMoviles.html';
}