"use strict";
let nodo_enviar = document.querySelector("#enviar")


crearCaptcha();
nodo_enviar.addEventListener("click", validarCaptcha);

function crearCaptcha() {
    let arregloABC123=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0];
    let primerCaracter=arregloABC123[Math.floor(Math.random()*arregloABC123.length)];
    let segundoCaracter=arregloABC123[Math.floor(Math.random()*arregloABC123.length)];
    let tercerCaracter=arregloABC123[Math.floor(Math.random()*arregloABC123.length)];
    let cuartoCaracter=arregloABC123[Math.floor(Math.random()*arregloABC123.length)];
    let quintoCaracter=arregloABC123[Math.floor(Math.random()*arregloABC123.length)];
    let captcha= (primerCaracter+segundoCaracter+tercerCaracter+cuartoCaracter+quintoCaracter)
    let nodoCaptcha=document.querySelector("#captcha_test");
    nodoCaptcha.innerHTML=captcha;
}

function validarCaptcha(ev) {
    ev.preventDefault();
    let nodo_captcha =document.querySelector("#captcha_test").innerHTML;
    let nodo_respuesta =document.querySelector("#respuesta_captcha").value;
    if (nodo_captcha == nodo_respuesta) {
        let nodo_confirmacion = document.querySelector("#mensaje_confirmacion");
        nodo_confirmacion.src= "imagenes/Inicio/valido.jpg";
        enviarFormulario();   
    }
    else { 
        let nodo_confirmacion = document.querySelector("#mensaje_confirmacion");
        document.querySelector("#respuesta_captcha").value=("");
        nodo_confirmacion.src= "imagenes/Inicio/no_validado.jpg"; 
        crearCaptcha();
    }  
}

function enviarFormulario(){
    console.log("informacion enviada");
}