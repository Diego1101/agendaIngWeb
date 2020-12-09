document.addEventListener('DOMContentLoaded', signUpF);
let r = 0;
function signUpF(){
    const frmSignUp = document.getElementById('signUp');
    frmSignUp.addEventListener('submit', function(e){
        e.preventDefault();
        let firstName = frmSignUp.getElementById('fName');
        let lastName = frmSignUp.getElementById('lName');
        let user = frmSignUp.getElementById('user');
        let pass = frmSignUp.getElementById('pass');
        let role;// = frmSignUp.getElementById('role');
        let phone = frmSignUp.getElementById('phone');
        let email = frmSignUp.getElementById('email');
        if(r==1){
            role = 2;
        }
        else{
            role = 1;
        }
        
        let params = `op=registrar&&usuario=${user.value}&&contra=${pass.value}&&nombre=${firstName.value}&&ap=${lastName.value}&&rol=${role.value}&&tel=${phone.value}&&email=${email.value}`;
        login(params);
        //const data = new FormData(params);
    });
    frmSignUp.addEventListener('blur',document.getElementById('email'), disableInputs());
    let login = (data)=>{
        fetch('../../servicioWeb/contacto.php?'+data, {
            method:'GET'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        console.log(res);
    }
}

function disableInputs(){
    if(email.includes(".edu.")){
        r = 1;
        document.getElementById('carrera').disabled = true;
    }
    else{
        r = 0;
        document.getElementById('carrera').disabled = false;
    }

}