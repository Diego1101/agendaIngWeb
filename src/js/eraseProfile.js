document.addEventListener('DOMContentLoaded', eraseA);
function eraseA(){
    const frmEraseA = document.getElementById('eraseAccount');
    frmEraseA.addEventListener('submit', function(e){
        e.preventDefault();
        let id = sessionStorage.getItem('id');
        let params = `op=eliminar&&id=${id.value}`;
        erase(params);
        //const data = new FormData(params);
    });
    let erase = (data)=>{
        fetch('../servicioWeb/contacto.php?'+data, {
            method:'GET'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        sessionStorage.clear('id');
        console.log(res);
        window.location.href = 'loginPMoviles.html';
    }
}