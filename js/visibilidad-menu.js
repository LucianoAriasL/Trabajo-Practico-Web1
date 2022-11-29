document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina(){
    "use strict";
    document.querySelector(".btn-menu").addEventListener("click", function(){
        document.querySelector(".navegador").classList.toggle("mostrar");
    });
}