document.addEventListener('DOMContentLoaded', mainMessage);
function mainMessage(){
    let op = '';
    $('#loader').hide();
    //document.getElementById('to').removeAttribute("disabled");
    var cId = sessionStorage.getItem('id');
    var idDes = sessionStorage.getItem('idDes');
    var nameDes = sessionStorage.getItem('nameDes');
    if (nameDes != "" && nameDes != null){
        document.getElementById('to').setAttribute("value", nameDes);
        document.getElementById('to').setAttribute("disabled", "true");
        document.getElementById('divddlTo').style.display = 'none';
        document.getElementById('divTo').style.display = 'fluid';
        op = '1';
    }
    else{
        document.getElementById('divddlTo').style.display = 'fluid';
        document.getElementById('divTo').style.display = 'none';
        $.get("https://agendaing.one-2-go.com/servicioWeb/contacto.php",{op: 'listar'}, function(data) {
        users = data;
        users.forEach(userTo => {
            $('#ddlTo').append("<option value='"+userTo.ID+"'>"+userTo.NOMBRE+"</option>")	
        });
        }).fail(function() {
            alert('Error');
        });
        op = '2';
    }
    //$('#tableMessages tbody').append("<tr><th scope=row'>" + mensaje.ID + "</th>";
    const btnEnviar = document.getElementById('btnEnviarMensaje');
    btnEnviar.addEventListener('click', function(){
        let mess = document.getElementById('mess');
        if(op == '1'){
            if(cId != 0 && cId != null){
                let params = `op=crear&&mensaje=${mess.value}&&id=${cId}&&idDes=${idDes}`;
                message(params);
            }
        }
        else if(op == '2'){
            nameDes = $('#ddlTo option:selected').text();
            if(cId != 0 && cId != null) {
                if($('#ddlTo').val() != 0 && $('#ddlTo option:selected').val() != null){
                    let idDest = document.getElementById('ddlTo');
                    let params = `op=crear&&mensaje=${mess.value}&&id=${cId}&&idDes=${idDest.value}`;
                    message(params);
                }
                else{
                    alert("Se debe seleccionar un usuario, por favor, revise su selección.");
                }
            }
            else{
                alert("Su sesión ha caducado, por favor inicie sesión de nuevo.");
            }
        }
        else{
            alert("Alo salió mal, por favor intenta más tarde");
        }
        
        
        //const data = new FormData(params);
    });
    let message = (data)=>{
        fetch('https://agendaing.one-2-go.com/servicioWeb/mensaje.php?'+data, {
            method:'POST'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        console.log(res);
        if(res.RES == 1){
            alert("Se envió el mensaje a: " + nameDes);
            sessionStorage.setItem('idDes', null);
            sessionStorage.setItem('nameDes', null);
            window.location.href = 'myMessagesPMoviles.html';
        }
        else{
            alert("Ocurrió un error al enviar el mensaje a: " + nameDes);
        }
        
    }
}

/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&amp;amp;]" + name + "=([^&amp;amp;#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/