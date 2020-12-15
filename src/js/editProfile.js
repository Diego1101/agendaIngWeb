//document.addEventListener('DOMContentLoaded', editP);
let id = '';
let fname = '';
let lname = '';
let career = '';
let phone = '';
let email = '';
let semester = '';
let group = '';

$(document).ready(function() { 
    
    let cId = sessionStorage.getItem('id');
    if(cId!=null && cId!=0){
        $.get("https://agendaing.one-2-go.com/servicioWeb/contacto.php",{op: 'detalle', id: cId}, function(data) {
            showData(data);
            editP();
        }).fail(function() {
            alert('Error');
        });
    }
    else{
        alert("La sesión expiró, inicie sesión nuevamente.")
        window.location.href = 'index.html';
    }
    
});

function showData(user) {
    $('#loader').hide();
    if(user!=null){
        id = user.ID;
        fname = user.NOM;
        lname = user.AP;
        career = user.CARRERA;
        phone = user.TELEFONO;
        email = user.EMAIL;
        semester = user.SEMESTRE;
        group = user.GRUPO;
        document.getElementById('name').value = fname + ' ' + lname;
        document.getElementById('phone').setAttribute("value", phone);
        document.getElementById('email').setAttribute("value", email);
        document.getElementById('career').value = career;
        document.getElementById('semester').value = semester;
        document.getElementById('group').value = group;			
       
    }
}

function editP(){

    const frmEditP = document.getElementById('editProfile');
    frmEditP.addEventListener('submit', function(e){
        e.preventDefault();
        let nameE = fname;
        let lNameE = lname;
        let phoneE = document.getElementById('phone');
        let emailE = document.getElementById('email');
        let careerE = document.getElementById('career');
        let semesterE = document.getElementById('semester');
        let groupE = document.getElementById('group');
        let passE = document.getElementById('pass');
        let params = `op=modificar&&id=${id}&&contra=${passE.value}&&nombre=${nameE}&&ap=${lNameE}&&tel=${phoneE.value}&&email=${emailE.value}&&carrera=${careerE.value}&&grupo=${groupE.value}&&semestre=${semesterE.value}`;
        edit(params);
        //const data = new FormData(params);
    });

    let edit = (dat)=>{
        fetch('https://agendaing.one-2-go.com/servicioWeb/contacto.php?'+dat, {
            method:'POST'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        console.log(res);
        alert("Su información fue modificada con éxito.")
        window.location.href = 'myProfilePMoviles.html';
    }
}