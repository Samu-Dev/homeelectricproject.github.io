$(document).ready(function() {
    // Solicitud a la api que devuelve la info del usuario y la carga en el formulario
    var user_id = window.localStorage.getItem('user_id');
    var url = `https://homeelectricproject.herokuapp.com/perfil/info_user/${user_id}`
    fetch(url)
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            document.getElementById("username").value = json["username"]
            document.getElementById("email").value = json["email"]
            document.getElementById("first_name").value = json["first_name"]
            document.getElementById("last_name").value = json["last_name"]
        })
        .catch(err => console.log(err))
        
    // Solicitud de actualización de los datos del usuario
    $("#update_user").click(function(){
        var url3 = `https://homeelectricproject.herokuapp.com/perfil/update_user/${user_id}`
        console.log("hola");
        
        var nomUs = $("#username").val();
        var mail = $("#email").val();
        var nom = $("#first_name").val();
        var ape = $("#last_name").val();
        

        var data = {
            "username": nomUs,
            "email": mail,
            "first_name": nom,
            "last_name": ape
        }

        var fetchData = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
                }
        }
        
        fetch(url3, fetchData)
            .then(response => response.json()) 
            .then(json => {
                console.log(json)
                alert("Registro actualizado exitosamente")
                window.location.href = "perfil_user.html"
            })
            .catch(err => {
                console.log(err)
                alert("Hubo un problema al actualizar su registro")
            })
    })
})