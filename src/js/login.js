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
        fetch('https://agendaing.one-2-go.com/servicioWeb/contacto.php?'+data, {
            method:'GET'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        
        console.log(res);
        if(res.ID != 0){
            sessionStorage.setItem('id', res.ID);
            window.location.href = 'myMessagesPMoviles.html';
        }
        else{
            alert("El usuario o contraseña son incorrectos, verifica los datos.");
        }
        
    }
}
