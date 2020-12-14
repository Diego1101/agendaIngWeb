document.addEventListener('DOMContentLoaded', editP);


function editP(data) {
    $(document).ready(function() { 
        let cId = sessionStorage.getItem('id');
        $.get("https://agendaing.one-2-go.com/servicioWeb/contacto.php",{op: 'detalle', id: cId}, function(data) {
            showData(data);
        }).fail(function() {
            alert('Error');
        });
    });
}

function showData(data){
    
    $('#loader').hide();

    let id = '';
    let name = '';
    let career = '';
    let phone = '';
    let email = '';
    let semester = '';
    let group = '';
    
    if(data.length>0) data.forEach(user => {
        id = user.ID;
        name = user.NOMBRE;
        career = user.CARRERA;
        phone = user.TELEFONO;
        email = user.EMAIL;
        semester = user.SEMESTRE;
        group = user.GRUPO;
    });
        document.getElementById('name').value = name;
        document.getElementById('phone').setAttribute("value", phone);
        document.getElementById('email').setAttribute("value", email);
        document.getElementById('career').value = career;
        document.getElementById('semester').value = semester;
        document.getElementById('group').value = group;
    
    const frmEditP = document.getElementById('editProfile');
    frmEditP.addEventListener('submit', function(e){
        e.preventDefault();
        
        let nameE = frmSignUp.getElementById('fName');
        let phoneE = frmSignUp.getElementById('phone');
        let emailE = frmSignUp.getElementById('email');
        let careerE = document.getElementById('career');
        let semesterE = document.getElementById('semester');
        let groupE = document.getElementById('group');
        let passE = frmSignUp.getElementById('pass');
        $renglon = mysqli_query($conn, "CALL tspModConta($id, '$nom', '$ap', '$contra', '$tel', '$email', '$carrera', '$semestre', '$grupo');");
        let params = `op=modificar&&id=${id.value}&&contra=${passE.value}&&nombre=${nameE.value}&&tel=${phoneE.value}&&email=${emailE.value}&&carrera=${careerE.value}&&grupo=${groupE.value}&&semestre=${semesterE.value}`;
        edit(params);
        //const data = new FormData(params);
    });

    let edit = (data)=>{
        fetch('../servicioWeb/contacto.php?'+data, {
            method:'POST'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        sessionStorage.clear('id');
        console.log(res);
        alert("Su información fue modificada con éxito.")
        window.location.href = 'myProfilePMoviles.html';
    }
}