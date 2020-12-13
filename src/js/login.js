document.addEventListener('DOMContentLoaded', mainLogin);
function mainLogin(){
    const frmLogin = document.getElementById('login');
    frmLogin.addEventListener('submit', function(e){
        e.preventDefault();
        let name = document.getElementById('user');
        let pass = document.getElementById('pass');
        let params = `op=acceso&&usuario=${name.value}&&contra=${pass.value}`;
        login(params);
        //const data = new FormData(params);
    });
    let login = (data)=>{
        fetch('../servicioWeb/contacto.php?'+data, {
            method:'GET'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        sessionStorage.setItem('id', res.ID);
        console.log(res);
    }
}
