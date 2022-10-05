$(document).ready(function() {
    // nombre del ususario y cerrar sesión
    /*var userSession = window.localStorage.getItem('name')
    if (userSession) {
        //Crea el saludo al usuario con nombre propio
        var p = document.createElement("p");
        p.innerHTML = `Hola ${userSession}`;
        document.getElementById("logged").appendChild(p)

        // Agrega el botón para cerrar la sesión
        let btn = document.createElement("button");
        btn.innerHTML = "Cerrar sesión";
        btn.class = "btn btn-secondary"
        btn.onclick = function () {
            window.localStorage.clear();
            window.location.href ="#"; // Dirección del home
        }
        document.getElementById("logged").appendChild(btn);
    }*/
    
    // Solicitud que carga los datos del alquiler en el formulario

    var urlViene = window.location.search.substring(1);
    console.log(urlViene);
    var rent_id = urlViene.slice(3);
    const url = `https://homeelectricproject.herokuapp.com/alquiler/retrieve_rent/${rent_id}`
        fetch(url)
            .then(response => response.json()) 
            .then(json => {
                console.log(json)
                console.log(json["herramienta"])
                id_tool = json["herramienta"]
                fetch("https://homeelectricproject.herokuapp.com/alquiler/retrieve_tool/"+id_tool)
                    .then(response => response.json())
                    .then(json => {
                        nomTool = json["nombre"]
                        document.getElementById("herramienta").value = nomTool;
                    })
                document.getElementById("inicio").value = json["inicio"];
                document.getElementById("fin").value = json["fin"];
            })
            .catch(err => console.log(err))
            

    // Solicitud para obtener el id_herramienta a partir del nombre
    var id_tool = ""
    $("#herramienta").change( function() {
        var nomHerramienta = $("#herramienta").val()
        console.log(nomHerramienta);
        var url1 = `https://homeelectricproject.herokuapp.com/alquiler/tool_name/${nomHerramienta}`

        fetch(url1)
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            id_tool = json["id"];
        })
        .catch(err => console.log(err))
    })
    console.log(id_tool); 

    // Solicitud que actualiza los datos del alquiler
    $("#update").click(function(){
        const url2 = `https://homeelectricproject.herokuapp.com/alquiler/update_rent/${rent_id}`
        console.log(url2);
        id_tool = "";
        var herramienta = $("#herramienta").val()
        var inicio = $("#inicio").val();
        var fin = $("#fin").val();
        var usuario = window.localStorage.getItem('user_id');
        console.log(herramienta)
            
        var url1 = `https://homeelectricproject.herokuapp.com/alquiler/tool_name/${herramienta}`

        fetch(url1)
            .then(response => response.json()) 
            .then(json => {
                console.log(json)
                id_tool = json["id"];
                var data = {
                "inicio": inicio,
                "fin": fin,
                "usuario": usuario,
                "herramienta": id_tool
            }
            console.log(data)

            var fetchData = {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json'
                    }
            }
            
            fetch(url2, fetchData)
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

    // Solicitud que elimina el alquiler OK
    $("#delete").click(function(){
        var urlViene2 = window.location.search.substring(1);
        console.log(urlViene2);
        var rent_id2 = urlViene.slice(3);
        console.log(rent_id2)
        const url3 = `https://homeelectricproject.herokuapp.com/alquiler/delete_rent/${rent_id2}`
        console.log(url3);        
        fetch(url3, {method: 'DELETE',})
            .then(response => console.log(response)) 
            .then(json => {
                console.log(json)
                alert("Registro eliminado exitosamente")
                window.location.href = "perfil_user.html" //Reenviar a la página del perfil
            })
            .catch(err => {
                console.log(err)
                alert("Hubo un problema al tratar de eliminar su registro")
            })
    })
})