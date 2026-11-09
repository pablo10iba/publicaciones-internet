let publicaciones = [];
let cantidadVisible = 10;
let publicacionesFiltradas = [];
const filtroUsuario = document.querySelector("#filtro-usuario");
async function obtenerPublicacion() {
    try {
        const mensajeError = document.querySelector("#error");
        const titulo = document.querySelector("#titulo");
        const contenido = document.querySelector("#contenido");
        const listaPublicaciones = document.querySelector("#lista-publicaciones");
        const botonCargar = document.querySelector("#cargar-mas");
        botonCargar.disabled = true;
        

        mensajeError.textContent = "";
        listaPublicaciones.innerHTML = "";

        titulo.textContent = "Cargando publicaciones...";
        contenido.textContent = "";

        const respuesta = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la publicación");
        }

        const datos = await respuesta.json();

        publicaciones = datos;

        mostrarPublicaciones();
        botonCargar.disabled = publicaciones.length <= cantidadVisible;

        titulo.textContent = "Primeras 10 publicaciones";

    } catch (error) {
        const mensajeError = document.querySelector("#error");
        const titulo = document.querySelector("#titulo");
        const contenido = document.querySelector("#contenido");

        titulo.textContent = "No se pudieron cargar las publicaciones";
        contenido.textContent = "";
        mensajeError.textContent = error.message;
        document.querySelector("#cargar-mas").disabled = true;
    }
}

obtenerPublicacion();


function mostrarPublicaciones() {
    const listaPublicaciones = document.querySelector("#lista-publicaciones");
    const buscador = document.querySelector("#buscador");
    const botonCargar = document.querySelector("#cargar-mas");

  
const texto = buscador.value.toLowerCase().trim();
const usuarioSeleccionado = filtroUsuario.value;

const listaBase = publicaciones.filter(function(publicacion) {
    const coincideTexto =
        publicacion.title.toLowerCase().includes(texto) ||
        publicacion.body.toLowerCase().includes(texto);

    const coincideUsuario =
        usuarioSeleccionado === "todos" ||
        publicacion.userId === Number(usuarioSeleccionado);

    return coincideTexto && coincideUsuario;
});


const selectorOrden = document.querySelector("#ordenar");

const listaActual = [...listaBase];

if (selectorOrden.value === "az") {
    listaActual.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });
} else if (selectorOrden.value === "za") {
    listaActual.sort(function(a, b) {
        return b.title.localeCompare(a.title);
    });
}

    // Limpiamos los resultados anteriores
    listaPublicaciones.innerHTML = "";

    // Mostramos solamente la cantidad permitida
   
const primerasPublicaciones = listaActual.slice(0, cantidadVisible);

if (listaActual.length === 0) {
    listaPublicaciones.textContent = "No se encontraron publicaciones.";
} else {
    
for (const publicacion of primerasPublicaciones) {
    const nuevoTitulo = document.createElement("h3");
    nuevoTitulo.textContent = publicacion.title;

    const nuevoContenido = document.createElement("p");
    nuevoContenido.textContent = publicacion.body;

    const botonDetalles = document.createElement("button");
    botonDetalles.textContent = "Ver detalles";
    botonDetalles.addEventListener("click", function() {
    const detalles = document.querySelector("#detalles-publicacion");

    const tituloDetalle = document.querySelector("#detalle-titulo");
    const contenidoDetalle = document.querySelector("#detalle-contenido");
    const usuarioDetalle = document.querySelector("#detalle-usuario");

    tituloDetalle.textContent = publicacion.title;
    contenidoDetalle.textContent = publicacion.body;
    usuarioDetalle.textContent = `Publicado por el usuario ${publicacion.userId}`;

    detalles.hidden = false;
});

    listaPublicaciones.appendChild(nuevoTitulo);
    listaPublicaciones.appendChild(nuevoContenido);
    listaPublicaciones.appendChild(botonDetalles);
}

}


    // Actualizamos el contador
    document.querySelector("#titulo").textContent =
        buscador.value.trim() !== ""
            ? "Resultados de búsqueda"
            : "Publicaciones de internet";

    document.querySelector("#contador").textContent =
        `${primerasPublicaciones.length} de ${listaActual.length} publicaciones`;

    // Actualizamos la barra de progreso
    const porcentaje = listaActual.length > 0
        ? (primerasPublicaciones.length / listaActual.length) * 100
        : 0;

    document.querySelector("#progreso").style.width = `${porcentaje}%`;

    // Controlamos el botón Cargar más
    botonCargar.disabled =
        primerasPublicaciones.length >= listaActual.length;
}
   
const botonCargar = document.querySelector("#cargar-mas");


botonCargar.addEventListener("click", function() {
    cantidadVisible += 10;
    mostrarPublicaciones();
});

const buscador = document.querySelector("#buscador");

buscador.addEventListener("input", function() {
    cantidadVisible = 10;
    mostrarPublicaciones();
});

const botonlimpiar = document.querySelector("#limpiar");
botonlimpiar.addEventListener("click", function() {
       buscador.value  = "";
   cantidadVisible = 10;

    mostrarPublicaciones();
   
});

const selectorOrden = document.querySelector("#ordenar");

selectorOrden.addEventListener("change", function() {
    mostrarPublicaciones();
});
console.log(filtroUsuario.value);

filtroUsuario.addEventListener("change", function() {
    cantidadVisible = 10;
    mostrarPublicaciones();
});
const botonCerrarDetalles = document.querySelector("#cerrar-detalles");
const detallesPublicacion = document.querySelector("#detalles-publicacion");

botonCerrarDetalles.addEventListener("click", function() {
    detallesPublicacion.hidden = true;
});