let bebidas = [];

// Fetch + carga desde Json

fetch("./js/bebidas.json")
    .then(response => response.json())
    .then(data => {
        bebidas = data;
        cargarBebidas(bebidas);
    })



// Elementos del DOM

const contenedorBebidas = document.querySelector("#gridBebidas");
const botonCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonAgregar = document.querySelectorAll(".btn-agregar");
const contador = document.querySelector("#contador");
const contenedorCarrito = document.getElementById("modalShop-container");
const btnVaciarCarrito = document.querySelector(".clearShop");
const iconoCarrito = document.querySelector(".carrito-icon");
const modalCarrito = document.getElementById("modalCarrito");
const btnCerrarCarrito = document.querySelector(".btnClose");


// Cargar Bebidas

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


// Cargar bebidas por categoria

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


    // Alert de bebida agregada

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Bebida agregada'
    })

}



// Carrito

// Cargar bebidas en el carrito después de recuperar datos del LS

window.addEventListener("load", () => {
    mostrarCarrito();
    actualizarContador();
});

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

    // Calcular y mostrar el total de bebidas en el carrito
    const divTotal = document.querySelector(".divTotal");
    const totalElement = document.querySelector(".total");

    // Verificar si hay bebidas en el carrito
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


        // Alert de bebida eliminada

        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Bebida eliminada'
        })
    }
});


// Vaciar completamente las bebidas del carrito + Alert

btnVaciarCarrito.addEventListener("click", () => {
    if (bebidasEnCarrito.length !== 0) {
        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar carrito!'
        }).then((result) => {

            if (result.isConfirmed) {

                // Vaciar el carrito y actualizar el DOM
                bebidasEnCarrito.length = 0;
                localStorage.removeItem("bebidas_en_carrito");
                modalCarrito.style.display = "none";
                mostrarCarrito();
                actualizarContador();
                
                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Carrito Vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    } else {

        // Si no hay bebidas en el carrito
        Swal.fire({
            icon: 'warning',
            title: 'No hay bebidas seleccionadas!',
            showConfirmButton: false,
            timer: 1500
        });
    }
});

// Realizar compra de las bebidas del carrito + Alert

const btnPay = document.querySelector(".btnPay");
btnPay.addEventListener("click", finalizarCompra);

async function finalizarCompra() {
    if (bebidasEnCarrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No hay bebidas seleccionadas!',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        const { value: email } = await Swal.fire({
            title: 'Ingrese su correo electrónico:',
            input: 'email',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Si, comprar!',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return email;
            },

            allowOutsideClick: () => !Swal.isLoading()
        });

        if (email) {
            Swal.fire(`${email}`);

            // Mensaje de compra exitosa + enlace de pago
            Swal.fire({
                title: 'Revisa tu casilla de email. <br> <br> Te hemos enviado un link de pago. <br> <br> Una vez realizado el mismo, podrás disfrutar de tus bebidas. 😉',
                icon: 'success'
            }).then(() => {
                // Vaciar el carrito y actualizar el DOM
                bebidasEnCarrito = [];
                mostrarCarrito();
                localStorage.removeItem("bebidas_en_carrito");
                modalCarrito.style.display = "none";
                actualizarContador();
            });
        }
    }
}


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