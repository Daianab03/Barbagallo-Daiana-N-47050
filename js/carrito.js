let bebidasEnCarrito = (localStorage.getItem("bebidas_en_carrito"));
bebidasEnCarrito = JSON.parse(bebidasEnCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoBebidas = document.querySelector("#carrito-bebidas");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoCompra = document.querySelector("#carrito-compra");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const carritoTotal = document.querySelector("#total");
let botonEliminar = document.querySelectorAll(".carrito-bebida-eliminar");
const botonCompra = document.querySelector("#carrito-acciones-comprar");


// Bebidas en Carrito

function cargarbebidasCarrito() {

    if (bebidasEnCarrito && bebidasEnCarrito.length > 0) {

        carritoVacio.classList.add("disable");
        carritoBebidas.classList.remove("disable");
        carritoAcciones.classList.remove("disable");
        carritoCompra.classList.add("disable");

        carritoBebidas.innerHTML = "";

        bebidasEnCarrito.forEach(bebida => {

            const div = document.createElement("div");
            div.classList.add("carrito-bebida");
            div.innerHTML = `
            <img class="carrito-bebida-imagen" src="${bebida.imagen}" alt="${bebida.titulo}">
               <div class="carrito-bebida-titulo">
                    <small>Bebida</small>
                    <h3>${bebida.titulo}</h3>
                </div>
                <div class="carrito-bebida-cantidad">
                    <small>Cantidad</small>
                    <p>${bebida.cantidad}</p>
                </div>
                <div class="carrito-bebida-precio">
                    <small>Precio</small>
                    <p>$${bebida.precio}</p>
                </div>
                <div class="carrito-bebida-sutbotal">
                    <small>Subtotal</small>
                    <p>$${bebida.precio * bebida.cantidad}</p>
                </div>
                <button class="carrito-bebida-eliminar" id="${bebida.id}"><i class="bi bi-trash3-fill"></i></button>
                
        `;

            carritoBebidas.append(div);

        })

    } else {

        carritoVacio.classList.remove("disable");
        carritoBebidas.classList.add("disable");
        carritoAcciones.classList.add("disable");
        carritoCompra.classList.add("disable");
    }

    actualizarbotonEliminar();
    actualizarTotal();

}

cargarbebidasCarrito();


// Actualizar Elimnar

function actualizarbotonEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-bebida-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Elimnar del carrito

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoEnCarrito = bebidasEnCarrito.find(bebida => bebida.id === idBoton);

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--; 
        } else {
            const indice = bebidasEnCarrito.indexOf(productoEnCarrito);
            bebidasEnCarrito.splice(indice, 1); 
        }

        cargarbebidasCarrito();
        localStorage.setItem("bebidas_en_carrito", JSON.stringify(bebidasEnCarrito));
    }
}



// Vaciar carrito

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    bebidasEnCarrito.length = 0;
    localStorage.setItem("bebidas_en_carrito", JSON.stringify(bebidasEnCarrito));
    cargarbebidasCarrito();

}


function actualizarTotal() {
    const calculoTotal = bebidasEnCarrito.reduce((acc, bebida) => acc + (bebida.cantidad * bebida.precio), 0);
    total.innerHTML = `$${calculoTotal}`;

}

// Comprar Carrito

botonCompra.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    bebidasEnCarrito.length = 0;
    localStorage.setItem("bebidas_en_carrito", JSON.stringify(bebidasEnCarrito));

    carritoVacio.classList.add("disable");
    carritoBebidas.classList.add("disable");
    carritoAcciones.classList.add("disable");
    carritoCompra.classList.remove("disable");

}



