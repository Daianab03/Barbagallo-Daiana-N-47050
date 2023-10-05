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


// Cargar Bebidas

const contenedorBebidas = document.querySelector("#gridBebidas");
let botonAgregar = document.querySelectorAll(".btn-agregar");

function cargarBebidas(bebidasSelec) {

    contenedorBebidas.innerHTML = "";

    bebidasSelec.forEach(bebida => {

        const article = document.createElement("article");
        article.classList.add('col-12');
        article.classList.add('col-sm-3');
        article.classList.add('card');
        article.classList.add('mb-4');
        article.innerHTML = `
                <img src="${bebida.imagen}" class="card-img-top mt-5" alt="${bebida.imagen}">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${bebida.titulo}</h5>
                    <p class="card-precio">$${bebida.precio}</p>
                    <button id="${bebida.id}" class="btn btn-dark btn-agregar">Comprar</button>
                </div>
            </article>

        `;

        contenedorBebidas.append(article);
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
    botonAgregar = document.querySelectorAll(".btn-agregar");

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
    mostrarCarrito();
}




// Carrito

// Contenedor del carrito
const contenedorCarrito = document.getElementById("modalShop-container");

// Mostrar los bebidas en el carrito
function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    bebidasEnCarrito.forEach(bebida => {
        const div = document.createElement("div");
        div.className = "infoShop";
        div.innerHTML = `
            <img class="imgShop" src="${bebida.imagen}" alt="${bebida.titulo}">
            <div class="infoShop bebidaShop d-flex flex-column">
                <h5 class="bebidaTitulo">${bebida.titulo}</h5>
                <h5 class="infoBebida">Cantidad: ${bebida.cantidad}</h5>
                <h5 class="infoBebida">Precio: $${bebida.precio}</h5>
                <h5 class="infoBebida">Subtotal: $${bebida.cantidad * bebida.precio}</h5>
            </div>
            <a class="delItem bi bi-trash pe-2" id="${bebida.id}"></a>
        `;
        contenedorCarrito.appendChild(div);
    });

    // Calcular y mostrar el total del carrito
    const divTotal = document.querySelector(".divTotal");
    const totalElement = document.querySelector(".total");

    // Verificar si hay elementos en el carrito
    if (bebidasEnCarrito.length > 0) {
        divTotal.innerText = "Total:";
        const total = bebidasEnCarrito.reduce((acc, bebida) => acc + bebida.cantidad * bebida.precio, 0);
        totalElement.innerText = `$${total}`;
    } else {
        divTotal.innerText = "Carrito Vacío";
        totalElement.innerText = "";
    }
}

// Eliminar bebidas del carrito 
contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("delItem")) {
        const idBebidaAEliminar = e.target.id;
        const bebidaAEliminar = bebidasEnCarrito.find(bebida => bebida.id === idBebidaAEliminar);

        if (bebidaAEliminar.cantidad > 1) {
            bebidaAEliminar.cantidad--;
        } else {
            bebidasEnCarrito = bebidasEnCarrito.filter(bebida => bebida.id !== idBebidaAEliminar);
        }

        mostrarCarrito();
        localStorage.setItem("bebidas_en_carrito", JSON.stringify(bebidasEnCarrito));
        actualizarContador();
    }
});

// Vaciar completamente el carrito
const btnVaciarCarrito = document.querySelector(".clearShop");

btnVaciarCarrito.addEventListener("click", () => {
    bebidasEnCarrito = [];
    mostrarCarrito();
    localStorage.removeItem("bebidas_en_carrito");
    modalCarrito.style.display = "none";
    actualizarContador();
});

const btnPay = document.querySelector(".btnPay");
btnPay.addEventListener("click", finalizarCompra);
function finalizarCompra() {
    bebidasEnCarrito = [];
    mostrarCarrito();
    
    localStorage.removeItem("bebidas_en_carrito");

    modalCarrito.style.display = "none";

    actualizarContador();
}


// Obtener ícono y contenedor del carrito desde el HTML
const iconoCarrito = document.querySelector(".carrito-icon");
const modalCarrito = document.getElementById("modalCarrito");
const btnCerrarCarrito = document.querySelector(".btnClose");

// Abrir el carrito
iconoCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "block";
});

// Cerrar el carrito
btnCerrarCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});


// Atualizar el contador del carrito
function actualizarContador() {
    const contadorActual = bebidasEnCarrito.reduce((acc, bebida) => acc + bebida.cantidad, 0);
    contador.innerText = contadorActual;
    contador.style.visibility = contadorActual > 0 ? 'visible' : 'hidden';

}