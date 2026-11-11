// Variables principales
let carrito = [];
let cantidadFavoritos = 0;

// 1. Menú adaptable para teléfono móvil
const btnMenu = document.getElementById('btn-menu');
const menuPrincipal = document.getElementById('menu-principal');

btnMenu.addEventListener('click', function () {
    menuPrincipal.classList.toggle('mostrar-menu');
});

// 2. Filtro de productos por categoría
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const productos = document.querySelectorAll('.tarjeta-producto');

botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {
        // Quitar clase activo a los demás botones
        botonesFiltro.forEach(function (b) {
            b.classList.remove('activo');
        });
        boton.classList.add('activo');

        const categoria = boton.getAttribute('data-categoria');

        productos.forEach(function (producto) {
            if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
                producto.style.display = 'flex';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

// 3. Función de Favoritos
const contadorFav = document.getElementById('contador-fav');
const btnFavoritos = document.getElementById('btn-favoritos');

function toggleFavorito(boton) {
    boton.classList.toggle('activo-fav');

    if (boton.classList.contains('activo-fav')) {
        boton.textContent = '♥ Favorito';
        cantidadFavoritos++;
    } else {
        boton.textContent = '♡ Favorito';
        cantidadFavoritos--;
    }

    contadorFav.textContent = cantidadFavoritos;
}

btnFavoritos.addEventListener('click', function () {
    alert('Tienes ' + cantidadFavoritos + ' producto(s) marcados como favoritos.');
});

// 4. Funciones del Carrito de Compras
const panelCarrito = document.getElementById('panel-carrito');
const btnCarrito = document.getElementById('btn-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-carrito');
const listaCarrito = document.getElementById('items-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const btnVaciar = document.getElementById('btn-vaciar');
const btnComprar = document.getElementById('btn-comprar');

// Mostrar y ocultar carrito
btnCarrito.addEventListener('click', function () {
    panelCarrito.classList.toggle('carrito-oculto');
});

btnCerrarCarrito.addEventListener('click', function () {
    panelCarrito.classList.add('carrito-oculto');
});

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarrito();
}

// Eliminar un producto del carrito por su posición
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Actualizar la lista y el total del carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let sumaTotal = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li>El carrito está vacío.</li>';
    } else {
        carrito.forEach(function (item, index) {
            sumaTotal += item.precio;
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${index})" style="color:red; border:none; background:none; cursor:pointer;">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
        });
    }

    totalCarrito.textContent = sumaTotal.toFixed(2);
    contadorCarrito.textContent = carrito.length;
}

// Vaciar todo el carrito
btnVaciar.addEventListener('click', function () {
    carrito = [];
    actualizarCarrito();
});

// Finalizar compra
btnComprar.addEventListener('click', function () {
    if (carrito.length === 0) {
        alert('El carrito está vacío. Agrega al menos un producto.');
    } else {
        alert('¡Gracias por tu compra en DogShop! Total pagado: $' + totalCarrito.textContent);
        carrito = [];
        actualizarCarrito();
        panelCarrito.classList.add('carrito-oculto');
    }
});

// 5. Envío del Formulario de Contacto
const formulario = document.getElementById('formulario-contacto');
const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const motivo = document.getElementById('motivo').value;

    mensajeConfirmacion.textContent = '¡Gracias ' + nombre + '! Hemos recibido tu solicitud (' + motivo + ') y te responderemos pronto.';
    formulario.reset();
});
