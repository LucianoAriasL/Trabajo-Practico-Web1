document.addEventListener("DOMContentLoaded",iniciarPagina);
function iniciarPagina(){
    "use strict";
    const url = "https://62bcb0866b1401736cff4fb0.mockapi.io/api/v1/cartas"; //Guardo la url de la api en una constante 
    let contenedor= document.querySelector("#table");  
    let msjError= document.querySelector("#msj-error");
    mostrarTabla();
    document.querySelector("#formulario").addEventListener("submit",tomarDatosdelForm); //Escucha el boton que agrega una nueva carta a la tabla
    document.querySelector("#btn_agregar_cartas_random").addEventListener("click",agregarCartasRandom);
    function mostrarTabla(){  //Traigo los datos de la url, los convierto en formato json y los cargo en la tabla creada    
        contenedor.innerHTML=`
                                <thead>
                                <tr>
                                    <th>Tipo de Cartas</th>
                                    <th>Fernet</th>
                                    <th>Vodka</th>
                                    <th>Ron</th>
                                    <th>Gin</th>
                                    <th>Aperitivo</th>
                                    <th>Whisky</th>
                                    <th>Cerveza</th>
                                    <th>Champagne</th>
                                    <th>Editor de tabla</th>
                                </tr>  
                                </thead>
        `
        cargarCuerpoTabla();
    }
    async function cargarCuerpoTabla(){ //Carga y crea el cuerpo de la tabla con los datos del json objetoCartas
        let cuerpoTabla= document.createElement("tbody");
        try {
            let response=await fetch(url); 
            let objetoCartas= await response.json();             
                for (const dato of objetoCartas){
                    let carta = document.createElement("tr");            
                    let tituloCarta = document.createElement("td");
                    tituloCarta.innerHTML=dato.Carta;
                    tituloCarta.classList.add("cartas_titulo");
                    carta.appendChild(tituloCarta);
                    carta.innerHTML+=` 
                                        <td>${dato.marcaFernet}</td>
                                        <td>${dato.marcaVodka}</td>
                                        <td>${dato.marcaRon}</td>
                                        <td>${dato.marcaGin}</td>
                                        <td>${dato.marcaAperitivo}</td>
                                        <td>${dato.marcaWhisky}</td>
                                        <td>${dato.marcaCerveza}</td>
                                        <td>${dato.marcaChampagne}</td>        
                    `
                    let botonesEdicion= document.createElement("td");
                    botonesEdicion.classList.add("btns-editor");
                    let botonEditar=document.createElement("button");
                    botonEditar.innerHTML="Editar";
                    botonEditar.classList.add("btn-editar");
                    botonEditar.addEventListener("click",()=>{   //El boton va a escuchar un evento con una funcion anonima (unica para este boton) que contiene la funcion editarCarta
                        editarCarta(dato);                      //y le paso por parametro dato que seria la fila donde se toco
                    })
                    let botonEliminar=document.createElement("button");
                    botonEliminar.innerHTML="Eliminar";
                    botonEliminar.classList.add("btn-eliminar");
                    botonEliminar.addEventListener("click",()=>{    //El boton va a escuchar un evento con una funcion anonima (unica para este boton) que contiene la funcion eliminarCarta
                        eliminarCarta(dato);                        //y le paso por parametro dato que seria la fila donde se toco
                    })
                    botonesEdicion.appendChild(botonEditar);
                    botonesEdicion.appendChild(botonEliminar);
                    carta.appendChild(botonesEdicion);
                    cuerpoTabla.appendChild(carta);
                    contenedor.appendChild(cuerpoTabla);
                }           
        }
        catch (e){
            console.log(e);
            let error="carga de Tabla";
            mensajeError(error);
        }
    }  
    function editarCarta(fila){ //Agarra los datos para el form en la fila que se hizo click editar y edito la carta en la api y la tabla
        let divformEditar=document.querySelector("#formularioEdit");
        let form=document.createElement("form");
        form.id="formularioEditar";
        form.classList.add("formularioEditar");
        form.innerHTML=` 
                        <div>
                            <label for="">Nuevo nombre de carta</label>
                            <input type="text" name="nombre_carta" value="${fila.Carta}">
                        </div>
                        <div>
                            <label for="">Fernet</label>
                            <input type="text" name="marca_fernet" value="${fila.marcaFernet}">
                        </div>
                        <div>
                            <label for="">Vodka</label>
                            <input type="text" name="marca_vodka" value="${fila.marcaVodka}">
                        </div>
                        <div>
                            <label for="">Ron</label>
                            <input type="text" name="marca_ron" value="${fila.marcaRon}">
                        </div>
                        <div>
                            <label for="">Gin</label>
                            <input type="text" name="marca_gin" value="${fila.marcaGin}">
                        </div>
                        <div>
                            <label for="">Aperitivo</label>
                            <input type="text" name="marca_aperitivo" value="${fila.marcaAperitivo}">
                        </div>
                        <div>
                            <label for="">Whisky</label>
                            <input type="text" name="marca_whisky" value="${fila.marcaWhisky}">
                        </div>
                        <div>
                            <label for="">Cerveza</label>
                            <input type="text" name="marca_cerveza" value="${fila.marcaCerveza}">
                        </div>
                        <div>
                            <label for="">Champagne</label>
                            <input type="text" name="marca_champagne" value="${fila.marcaChampagne}">
                        </div>
            `
            
        let btnCargar= document.createElement("button");
        btnCargar.innerHTML="Cargar Edicion";
        form.appendChild(btnCargar);
        divformEditar.appendChild(form);
        btnCargar.addEventListener("click",()=>{
            tomarDatosdelFormEditar(fila);
            form.remove(); //Remuevo el objeto form del DOM
            });
    }
    function tomarDatosdelFormEditar(fila){ //Tomo los datos del form y los convierto formato json para llevarlos a la api
        let form = document.querySelector("#formularioEditar");
        let formData = new FormData(form);
        let nombre_carta = formData.get("nombre_carta");
        let marca_fernet = formData.get("marca_fernet");
        let marca_vodka = formData.get("marca_vodka");
        let marca_ron = formData.get("marca_ron");
        let marca_gin = formData.get("marca_gin");
        let marca_aperitivo = formData.get("marca_aperitivo");
        let marca_whisky = formData.get("marca_whisky");
        let marca_cerveza = formData.get("marca_cerveza");
        let marca_champagne = formData.get("marca_champagne");
        let marcas_bebidas = {
            "Carta": nombre_carta,
            "marcaFernet": marca_fernet,
            "marcaVodka": marca_vodka,
            "marcaRon": marca_ron,
            "marcaGin": marca_gin,
            "marcaAperitivo": marca_aperitivo,
            "marcaWhisky": marca_whisky,
            "marcaCerveza": marca_cerveza,
            "marcaChampagne": marca_champagne
        }
        agregarEdicionCarta(fila,marcas_bebidas);
        
    }
    async function agregarEdicionCarta(fila,marcas){ //Actualizo en la api la fila que edite usando la accion PUT
        try {
            let response = await fetch(url + "/" + fila.id,{ //le paso la id de la fila en la url para que sepa donde hacer la accion
                "method":"PUT",
                "headers": {"Content-type":"application/json"},
                "body": JSON.stringify(marcas)
            });
            if (response.status===200){ 
               mostrarTabla();    
            }
        }
        catch(e){
            console.log(e);
            let error="edicion de carta";
            mensajeError(error);
        }
    }
    async function eliminarCarta(fila){ //Elimino la fila a la cual se hizo click eliminar con la accion DELETE
        try {
            let response= await fetch (url + "/" + fila.id,{//le paso la id de la fila en la url para que sepa donde hacer la accion
                method:"DELETE"
            });
            if (response.status===200){   
                mostrarTabla();
            }
        }
        catch (e){
            console.log(e);
            let error="eliminar carta";
            mensajeError(error);
        }   
    }
    function tomarDatosdelForm(e){ //Tomo los datos del formulario para cargar una nueva carta a la tabla
        e.preventDefault();
        let form = document.querySelector("#formulario");
        let formData = new FormData(form);
        let nombre_carta = formData.get("nombre_carta");
        let marca_fernet = formData.get("marca_fernet");
        let marca_vodka = formData.get("marca_vodka");
        let marca_ron = formData.get("marca_ron");
        let marca_gin = formData.get("marca_gin");
        let marca_aperitivo = formData.get("marca_aperitivo");
        let marca_whisky = formData.get("marca_whisky");
        let marca_cerveza = formData.get("marca_cerveza");
        let marca_champagne = formData.get("marca_champagne");
        let marcas_bebidas = {
            "Carta": nombre_carta,
            "marcaFernet": marca_fernet,
            "marcaVodka": marca_vodka,
            "marcaRon": marca_ron,
            "marcaGin": marca_gin,
            "marcaAperitivo": marca_aperitivo,
            "marcaWhisky": marca_whisky,
            "marcaCerveza": marca_cerveza,
            "marcaChampagne": marca_champagne
        }
        agregarCarta(marcas_bebidas);
        form.reset();
    } 
    async function agregarCarta(marcas){ //Agrega en la api la nueva carta que se obtuvo del formulario a traves de la accion POST
        try {
            let response = await fetch(url,{
                "method":"POST",
                "headers": {"Content-type":"application/json"},
                "body": JSON.stringify(marcas)
            });
            if (response.status===201){
                mostrarTabla()    
            }
        }
        catch(e){
            console.log(e);
            let error="agregar carta";
            mensajeError(error);
        }
    }
    async function agregarCartasRandom(e){ //Agrega en la api la cantidad que puso el usuario de cartas random a traves de la accion POST
        e.preventDefault();             
        let numeroCarta=1; 
        let cantCartas=document.querySelector("#cantidadCartas").value;
        let marcasFernet=["Branca","Buho","Vittone"];
        let marcasVodka=["Skyy","Sernova","Smirnoff","Absolut"];
        let marcasRon=["Havana","Bacardi Blanco","Barcelo","Bacardi Dorado","Havana añejo"];
        let marcasGin=["Heraclito","Beefeater","Beefeater Pink","Merle"];
        let marcasAperitivo=["Campari","Martini Rosso","Martini Bianco","Martini Dry","Cynar","Aperol"];
        let marcasWhisky=["Red Label","Black Label","Blue Label","Green Label","Chivas","Jack Daniels"];
        let marcasCerveza=["Brahama","Quilmes","Antares","Schneider","Imperial","Andes"];
        let marcasChampagne=["Baron","Dada","Chandon"];
        let response;
        try { 
            while (numeroCarta<=cantCartas){
                let carta={
                    "marcaFernet": marcasFernet[Math.floor(Math.random()*marcasFernet.length)],
                    "marcaVodka": marcasVodka[Math.floor(Math.random()*marcasVodka.length)],
                    "marcaRon": marcasRon[Math.floor(Math.random()*marcasRon.length)],
                    "marcaGin": marcasGin[Math.floor(Math.random()*marcasGin.length)],
                    "marcaAperitivo": marcasAperitivo[Math.floor(Math.random()*marcasAperitivo.length)],
                    "marcaWhisky": marcasWhisky[Math.floor(Math.random()*marcasWhisky.length)],
                    "marcaCerveza": marcasCerveza[Math.floor(Math.random()*marcasCerveza.length)],
                    "marcaChampagne": marcasChampagne[Math.floor(Math.random()*marcasChampagne.length)]
                    };
                response = await fetch(url,{
                    "method":"POST",
                    "headers": {"Content-type":"application/json"},
                    "body": JSON.stringify(carta)
                });
                numeroCarta++;
            }
            if (response.status===201){
                mostrarTabla()    
            }
        }
        catch(e){
            console.log(e);
            let error="agregar cartas nuevas";
            mensajeError(error);
        }
    }

    function mensajeError(tipoDeError){ //Muestra en pantalla el tipo de error por 3seg
        msjError.innerHTML= "Error en " + tipoDeError;
        msjError.classList.add("mostrar");
        setTimeout(()=>{
            msjError.classList.remove("mostrar");
        },3000)
    }
}
 