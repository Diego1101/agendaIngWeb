document.addEventListener('DOMContentLoaded', mainMessage);
function mainMessage(){
    let op = '';
    $('#loader').hide();
    //document.getElementById('to').removeAttribute("disabled");
    var cId = sessionStorage.getItem('id');
    var idDes = sessionStorage.getItem('idDes');
    var nameDes = sessionStorage.getItem('nameDes');
    if (nameDes != "" && nameDes != null && idDes != "" && idDes != null){
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
            $('#ddlTo').append("<option value='"+userTo.ID+"'>"+ userTo.NOMBRE +"</option>")	
        });
        }).fail(function() {
            alert('Error');
        });
        op = '2';
    }
    //$('#tableMessages tbody').append("<tr><th scope=row'>" + mensaje.ID + "</th>";
    const frmNewMess = document.getElementById('newMessage');
    frmNewMess.addEventListener('submit', function(e){
        $('#loader').show();
        e.preventDefault();
        let mess = document.getElementById('mess');
        let idDest = document.getElementById('ddlTo');
        if(op == '1'){
            if(cId != 0 && cId != null){
                let params = `op=crear&&mensaje=${mess.value}&&id=${cId}&&us=${idDes}`;
                message(params);
            }
        }
        else if(op == '2'){
            idDes = $('#ddlTo option:selected').val();
            nameDes = $('#ddlTo option:selected').text();
            if(cId != 0 && cId != null){
                if(idDest != 0 && idDest != null){
                    idDest = document.getElementById('ddlTo');
                    let params = `op=crear&&mensaje=${mess.value}&&id=${cId}&&us=${idDest.value}`;
                    message(params);
                    sessionStorage.setItem('idDes', idDest.value);
                    sessionStorage.setItem('nameDes', idDest.options[idDest.selectedIndex].text);
                    nameDes = sessionStorage.getItem('nameDes');
                }
                else{
                    alert("Se debe seleccionar un usuario, por favor, revise su selección.");
                }
            }
            else{
                alert("Su sesión ha caducado, por favor inicie sesión de nuevo.");
                window.location.href = 'loginPMoviles.html';
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
            sessionStorage.setItem('idDes', '');
            sessionStorage.setItem('nameDes', '');
            window.location.href = 'myMessagesPMoviles.html';
        }
        else{
            alert("Ocurrió un error al enviar el mensaje a: " + nameDes);
            sessionStorage.setItem('idDes', '');
            sessionStorage.setItem('nameDes', '');
            window.location.href = 'myMessagesPMoviles.html';
        }
        $('#loader').hide();
        
    }
}

/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&amp;amp;]" + name + "=([^&amp;amp;#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/