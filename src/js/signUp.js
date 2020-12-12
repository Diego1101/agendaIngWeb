document.addEventListener('DOMContentLoaded', signUpF);
let r = 0;
function signUpF(){
    const frmSignUp = document.getElementById('signUp');
    let email = document.getElementById('email');
    frmSignUp.addEventListener('submit', function(e){
        e.preventDefault();
        let firstName = frmSignUp.getElementById('fName');
        let lastName = frmSignUp.getElementById('lName');
        let user = frmSignUp.getElementById('user');
        let pass = frmSignUp.getElementById('pass');
        let role;// = frmSignUp.getElementById('role');
        let phone = frmSignUp.getElementById('phone');

        let career = frmSignUp.getElementById('career');
        let semester = frmSignUp.getElementById('semester');
        let group = frmSignUp.getElementById('group');
        email = frmSignUp.getElementById('email');
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
        fetch('../../servicioWeb/contacto.php?'+data, {
            method:'GET'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        console.log(res);
    }
}