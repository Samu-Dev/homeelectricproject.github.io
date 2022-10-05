$(document).ready(function() {
    $("#registro").click(function(){
        var nomUs = $("#username").val();
        var pass1 = $("#password").val();
        var pass2 = $("#password2").val();
        var mail = $("#email").val();
        var nom = $("#first_name").val();
        var ape = $("#last_name").val();

        const url = "https://homeelectricproject.herokuapp.com/perfil/registro/"

        var data = {
            "username": nomUs,
            "password": pass1,
            "password2": pass2,
            "email": mail,
            "first_name": nom,
            "last_name": ape
        }
        console.log(data)
        var fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
                }
        }

        fetch(url, fetchData)
        .then(response => response.json()) 
        .then(json => {
            alert('¡Registro de usuario exitoso!')
            window.location.href ="login.html" //Pendiente por revisar url
        })
        .catch(err => console.log(err))
    })
})