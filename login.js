$(document).ready(function() {
    $("#iniciar").click(function(){
        var nomUs = $("#username").val();
        var pass = $("#password").val();

        console.log(nomUs);
        console.log("hola");
        
        const url = "https://homeelectricproject.herokuapp.com/perfil/login/"

        var data = {
            "username": nomUs,
            "password": pass,
        }

        var fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
                }
        }
        // Solicitud para inciar sesión
        fetch(url, fetchData)
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            // Solicitud para obtener el id y nombre del usuario para almacenarlo en el localstorage
            fetch(`https://homeelectricproject.herokuapp.com/perfil/username/${nomUs}`)
            .then(response => response.json()) 
            .then(json => {
                console.log(json)
                var user_id = json["id"];
                console.log(`El id del usuario es ${user_id}`)
                var user_name =json["first_name"];
                console.log(`El nombre del usuario es ${user_name}`)
                window.localStorage.setItem('name', user_name)
                window.localStorage.setItem("user_id", user_id)
                window.location.href ="tienda.html"; // Dirección de la tienda
            })
            .catch(err => console.log(err))
        }) 
            
        .catch(err => console.log(err))

        
    })
})