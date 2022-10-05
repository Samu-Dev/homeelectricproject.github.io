$(document).ready(function() {
    // Solicitud para obtener el id_herramienta a partir del nombre

    var id_tool = ""
    $("#herramienta").change( function(e) {
        var nomHerramienta = $("#herramienta").val()
        console.log(nomHerramienta);
        var url1 = "https://homeelectricproject.herokuapp.com/alquiler/tool_name/"+nomHerramienta

        fetch(url1)
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
            id_tool = json["id"];
            e.preventDefault();
        })
        .catch(err => console.log(err))
    })
    console.log(id_tool);

    // Solicitud que registra el alquiler
    $("#reg_alq").click(function(){
        
        if (window.localStorage.getItem('name') == undefined){
            alert("Por favor inicie sesión con su usuario")
        }else{
            var inicio = $("#inicio").val();
            var fin = $("#fin").val();
            var usuario = window.localStorage.getItem("user_id");
            
            const url2 = "https://homeelectricproject.herokuapp.com/alquiler/reg_rent/"

            var data = {
                "inicio": inicio,
                "fin": fin,
                "usuario": usuario,
                "herramienta": id_tool
            }
            console.log(data);
            var fetchData = {
                method: 'POST',
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
                console.log("Registro exitoso")
                var rent_id = json["id"];
                window.location.href ="confirmacion.html?rent_id="+ rent_id;
                alert("Alquiler registrado exitosamente")
            })
            .catch(err => console.log(err))
        }
    })
})