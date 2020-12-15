document.addEventListener('DOMContentLoaded', mainMessage);
function mainMessage(){
    let us
    $('#loader').hide();
    //document.getElementById('to').removeAttribute("disabled");
    var cId = sessionStorage.getItem('id');
    var idDes = sessionStorage.getItem('idDes');
    var nameDes = sessionStorage.getItem('nameDes');
    if (nameDes != "" && nameDes != null){
        document.getElementById('to').setAttribute("value", nameDes);
        document.getElementById('to').setAttribute("disabled", "true");
    }
    //$('#tableMessages tbody').append("<tr><th scope=row'>" + mensaje.ID + "</th>";
    const frmNewMess = document.getElementById('newMessage');
    frmNewMess.addEventListener('submit', function(e){
        e.preventDefault();
        let mess = document.getElementById('mess');
        
        let career = "" /*document.getElementById('career')*/;
        let group = ""/*document.getElementById('group')*/;
        let semester = ""/*document.getElementById('semester')*/;
        let params = `op=crear&&mensaje=${mess.value}&&id=${cId}&&us=${idDes}`;
        message(params);
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
            sessionStorage.clear('idDes');
            sessionStorage.clear('nameDes');
            window.location.href = 'myMessagesPMoviles.html';
        }
        else{
            alert("Ocurrió un error al enviar el mensaje a :" + nameDes);
        }
        
    }
}

/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&amp;amp;]" + name + "=([^&amp;amp;#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/