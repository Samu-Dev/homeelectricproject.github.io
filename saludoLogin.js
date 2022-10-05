$(document).ready(function() {
    var userSession = window.localStorage.getItem('name')
        if (userSession) {
            //Crea el saludo al usuario con nombre propio
            var p = document.createElement("a");
            p.innerHTML = `Hola ${userSession}`;
            document.getElementById("saludo").appendChild(p)

            // Agrega el botón para cerrar la sesión
            var btn = document.createElement("a");
            btn.innerHTML = "Cerrar sesión";
            btn.onclick = function () {
                window.localStorage.clear();
                window.location.href ="index.html"; // Dirección del home
            }
            document.getElementById("cerrar").appendChild(btn);
        }else{
            var btn_login = document.createElement("a");
            btn_login.innerHTML = "Login";
            btn_login.className = "nav-link scrollto";
            btn_login.href = "login.html";
            document.getElementById("btn_login").appendChild(btn_login);
        }
})