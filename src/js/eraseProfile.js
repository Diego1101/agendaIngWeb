document.addEventListener('DOMContentLoaded', eraseA);
function eraseA(){
    const frmEraseA = document.getElementById('eraseAccount');
    frmEraseA.addEventListener('submit', function(e){
        e.preventDefault();
        let id = sessionStorage.getItem('id');
        let params = `op=eliminar&&id=${id}`;
        erase(params);
        //const data = new FormData(params);
    });
    let erase = (data)=>{
        fetch('https://agendaing.one-2-go.com/servicioWeb/contacto.php?'+data, {
            method:'GET'
        }).then(respon=>respon.json())
        .then(respon=>verify(respon))
    }
    let verify = (res)=>{
        console.log(res);
        if(res.ID == 1){
            sessionStorage.clear('id');
            window.location.href = 'index.html';
        }
        
    }
}