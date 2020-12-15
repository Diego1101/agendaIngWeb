document.addEventListener('DOMContentLoaded', signUpF);
let r = 0;
function signUpF(){
    const frmSignUp = document.getElementById('signUp');
    let email = document.getElementById('email');
    frmSignUp.addEventListener('submit', function(e){
        e.preventDefault();
        let firstName = document.getElementById('fName');
        let lastName = document.getElementById('lName');
        let user = document.getElementById('user');
        let pass = document.getElementById('pass');
        let role;// = document.getElementById('role');
        let phone = document.getElementById('phone');

        let career = document.getElementById('career');
        let semester = document.getElementById('semester');
        let group = document.getElementById('group');
        email = document.getElementById('email');
        if(r==1){
            role = 2;
            let params = `op=registrar&&usuario=${user.value}&&contra=${pass.value}&&nombre=${firstName.value}&&ap=${lastName.value}&&rol=${role.value}&&tel=${phone.value}&&email=${email.value}&&carrera=""&&grupo="&&semestre=""`;
        }
        else{
            role = 1;
            let params = `op=registrar&&usuario=${user.value}&&contra=${pass.value}&&nombre=${firstName.value}&&ap=${lastName.value}&&rol=${role.value}&&tel=${phone.value}&&email=${email.value}&&carrera=${career.value}&&grupo=${group.value}&&semestre=${semester.value}`;
        }
        
        
        register(params);
        //const data = new FormData(params);
    });
        console.log(email.value);
        email.addEventListener('focusout', function(){
            console.log(email.value);
            if(email.value.includes(".edu.")){
                r = 1;
                console.log("Desactivar");
                document.getElementById('career').setAttribute("disabled", "true");
                document.getElementById('semester').setAttribute("disabled", "true");
                document.getElementById('group').setAttribute("disabled", "true");
            }
            else{
                r = 0;
                console.log("Activar");
                document.getElementById('career').removeAttribute("disabled");
                document.getElementById('semester').removeAttribute("disabled");
                document.getElementById('group').removeAttribute("disabled");
            }
        });
    let register = (data)=>{
        fetch('https://agendaing.one-2-go.com/servicioWeb/contacto.php?'+data, {
            method:'POST'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        console.log(res);
        alert("Tu perfil ha sido creado, ya puedes iniciar sesión.");
        window.location.href = 'loginPMoviles.html';
    }
}