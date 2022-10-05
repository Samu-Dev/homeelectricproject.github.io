$(document).ready(function() {
    // Solicitud de datos p
    var user_id = window.localStorage.getItem('user_id');
    var url1 = "https://homeelectricproject.herokuapp.com/perfil/info_user/" + user_id
    fetch(url1)
        .then(response => response.json())
        .then(json => {
            var nombre = json["first_name"];
            var usuario = json["username"];
            var correo = json["email"];

            var nombre_perfil = document.createElement("H2");
            nombre_perfil.innerHTML = "- "+ nombre;
            nombre_perfil.className = "fw-bold"
            document.getElementById("nombre_perfil").appendChild(nombre_perfil)

            var usuario_perfil = document.createElement("H5");
            usuario_perfil.innerHTML = "- "+ usuario;
            usuario_perfil.className = "fw-bold"
            document.getElementById("usuario_perfil").appendChild(usuario_perfil)

            var correo_perfil = document.createElement("H5");
            correo_perfil.innerHTML = "- "+ correo;
            correo_perfil.className = "fw-bold"
            document.getElementById("correo_perfil").appendChild(correo_perfil)
        })
        .catch(err => console.log(err))

    // Solicitud a la api que devuelve todos los alquileres del usuario
    var url2 = `https://homeelectricproject.herokuapp.com/alquiler/rents_user/${user_id}`
    fetch(url2)
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            for (let i in json){
                let rent_id = json[i]["id"];
                let inicio = json[i]["inicio"];
                let fin = json[i]["fin"];
                let herramienta = json[i]["herramienta"];
                let usuario = window.localStorage.getItem('user_id');
                console.log(rent_id, inicio, fin, herramienta, usuario);

                let rent = document.createElement("a");
                rent.innerHTML = inicio
                rent.className = "list-group-item";
                rent.href = `alquilerUpdate.html?id=`+ rent_id
                document.getElementById("rent").appendChild(rent)

                let linebrake = document.createElement("br");
                document.getElementById("rent").appendChild(linebrake);
            }
        })
        .catch(err => console.log(err))
})