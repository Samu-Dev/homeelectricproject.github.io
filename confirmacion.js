$(document).ready(function() {   
    // Solicitud que carga los datos del alquiler para mostrar en la confirmación

    var urlViene = window.location.search.substring(1);
    console.log(urlViene);
    var id_rent = urlViene.slice(8);

    var url = `https://homeelectricproject.herokuapp.com/alquiler/retrieve_rent/${id_rent}`

    fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        var id_tool = json["herramienta"]
        var fInicio = json["inicio"]
        var fFin = json["fin"]

        fetch("https://homeelectricproject.herokuapp.com/alquiler/retrieve_tool/"+id_tool)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            var tool= json["nombre"];
            var li = document.createElement("a")
            li.innerHTML = `${tool}`
            document.getElementById("producto_reservado").appendChild(li);
            var salto = document.createElement("br")
            document.getElementById("producto_reservado").appendChild(salto);
            var li2 = document.createElement("a")
            li2.innerHTML = `desde ${fInicio} hasta ${fFin}`
            document.getElementById("producto_reservado").appendChild(li2);
        })

        
    })
    .catch(err => console.log(err))
})