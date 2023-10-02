let bebidas = [

    // Vinos

    {
        id: "vino-1",
        titulo: "Rutini",
        imagen: "./assets/vinos/1rutini_cabmal.webp",
        categoria: {
            nombre: "Vinos",
            id: "vinos",
        },
        precio: 5480,

    },
    {
        id: "vino-2",
        titulo: "Dv Catena",
        imagen: "./assets/vinos/2dvcatena.webp",
        categoria: {
            nombre: "Vinos",
            id: "vinos",
        },
        precio: 3870,

    },
    {
        id: "vino-3",
        titulo: "Luigi Bosca",
        imagen: "./assets/vinos/3luigiboscas.webp",
        categoria: {
            nombre: "Vinos",
            id: "vinos",
        },
        precio: 9345,

    },
    {
        id: "vino-4",
        titulo: "Trumpeter",
        imagen: "./assets/vinos/4trumpeter.webp",
        categoria: {
            nombre: "Vinos",
            id: "vinos",
        },
        precio: 3068,
    },
    {
        id: "vino-5",
        titulo: "Nicasia",
        imagen: "./assets/vinos/5nicasia.webp",
        categoria: {
            nombre: "Vinos",
            id: "vinos",
        },
        precio: 3124,
    },
    {
        id: "vino-6",
        titulo: "Santa Julia",
        imagen: "./assets/vinos/6santajulia.webp",
        categoria: {
            nombre: "Vinos",
            id: "vinos",
        },
        precio: 1900,
    },


    // Cervezas

    {
        id: "cerveza-1",
        titulo: "Andes Rubia",
        imagen: "./assets/cervezas/andesrubia.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas",
        },
        precio: 2700,
    },
    {
        id: "cerveza-2",
        titulo: "Corona",
        imagen: "./assets/cervezas/corona.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas",
        },
        precio: 3350,
    },

    {
        id: "ceveza-3",
        titulo: "Heineken",
        imagen: "./assets/cervezas/heineken.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas",
        },
        precio: 2800,
    },
    {
        id: "ceveza-4",
        titulo: "Imperial Gold",
        imagen: "./assets/cervezas/imperialgold.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas",
        },
        precio: 2400,
    },
    {
        id: "ceveza-5",
        titulo: "Patagonia",
        imagen: "./assets/cervezas/patagoniabohemia.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas",
        },
        precio: 3600,
    },
    {
        id: "ceveza-6",
        titulo: "Stella",
        imagen: "./assets/cervezas/stella.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas",
        },
        precio: 3000,
    },

    // Gins

    {
        id: "gin-1",
        titulo: "Bombay",
        imagen: "./assets/gin/1bombay.webp",
        categoria: {
            nombre: "Gins",
            id: "gins",
        },
        precio: 10200,
    },
    {
        id: "gin-2",
        titulo: "London",
        imagen: "./assets/gin/2london.webp",
        categoria: {
            nombre: "Gins",
            id: "gins",
        },
        precio: 15300,
    },
    {
        id: "gin-3",
        titulo: "Aconcagua",
        imagen: "./assets/gin/3aconcagua.webp",
        categoria: {
            nombre: "Gins",
            id: "gins",
        },
        precio: 6780,
    },
    {
        id: "gin-4",
        titulo: "Sevilla",
        imagen: "./assets/gin/4sevilla.jpg",
        categoria: {
            nombre: "Gins",
            id: "gins",
        },
        precio: 9784,
    },
    {
        id: "gin-5",
        titulo: "Beefeter",
        imagen: "./assets/gin/5beefeter.jpg",
        categoria: {
            nombre: "Gins",
            id: "gins",
        },
        precio: 19243,
    },
    {
        id: "gin-6",
        titulo: "Gordon",
        imagen: "./assets/gin/6gordon.jpg",
        categoria: {
            nombre: "Gins",
            id: "gins",
        },
        precio: 3093,
    },
];




const contenedorBebidas = document.querySelector("#contenedor-bebidas");
let botonAgregar = document.querySelectorAll(".bebida-comprar");


// Cargar Bebidas

function cargarBebidas(bebidasSelec) {

    contenedorBebidas.innerHTML = "";

    bebidasSelec.forEach(bebida => {

        const div = document.createElement("div");
        div.classList.add("bebida");
        div.innerHTML = `
            <img class="bebida-imagen" src="${bebida.imagen}" alt="${bebida.titulo}">
            <div class="bebida-detalles">
                <h3 class="bebida-titulo">${bebida.titulo}</h3>
                <p class="bebida-precio">$${bebida.precio}</p>
                <button class="bebida-comprar" id="${bebida.id}">Comprar</button>
            </div>

        `;

        contenedorBebidas.append(div);
    })

    actualizarbotonAgregar();

}

cargarBebidas(bebidas);


// Cargar bebidas por categoria

const botonCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal")


botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todas") {
            const bebidaCategoria = bebidas.find(bebida => bebida.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = bebidaCategoria.categoria.nombre;

            const bebidasElegidas = bebidas.filter(bebida => bebida.categoria.id === e.currentTarget.id);
            cargarBebidas(bebidasElegidas);

        } else {
            tituloPrincipal.innerText = "Todas las bebidas";
            cargarBebidas(bebidas);
        }

    })

});



function actualizarbotonAgregar() {
    botonAgregar = document.querySelectorAll(".bebida-comprar");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);

    });
}



// Agregar Bebidas

const contador = document.querySelector("#contador");
let bebidasEnCarrito;

let bebidasEnCarritolS = localStorage.getItem("bebidas_en_carrito");

if (bebidasEnCarritolS) {
    bebidasEnCarrito = JSON.parse(bebidasEnCarritolS);
    actualizarContador();
} else {
    bebidasEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const bebidaAgregada = bebidas.find(bebida => bebida.id === idBoton);

    if (bebidasEnCarrito.some(bebida => bebida.id === idBoton)) {
        const inicio = bebidasEnCarrito.findIndex(bebida => bebida.id === idBoton);
        bebidasEnCarrito[inicio].cantidad++;

    } else {
        bebidaAgregada.cantidad = 1;
        bebidasEnCarrito.push(bebidaAgregada);
    }

    actualizarContador();

    localStorage.setItem("bebidas_en_carrito", JSON.stringify(bebidasEnCarrito));

}


// Contador carrito

function actualizarContador() {
    let contadorActual = bebidasEnCarrito.reduce((acc, bebida) => acc + bebida.cantidad, 0);
    contador.innerText = contadorActual;

}





