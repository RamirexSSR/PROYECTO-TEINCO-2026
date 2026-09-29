/* =========================================================
   TechNova - script.js
   Este archivo contiene TODA la lógica de la tienda:
   - Lista de productos (datos)
   - Menú responsive (hamburguesa)
   - Carrito de compras (usando localStorage)
   - Buscador y filtros del catálogo
   - Formularios (contacto, servicios, compra) con validaciones
   Está dividido por secciones con comentarios para que sea
   fácil de encontrar y modificar cada parte.
   ========================================================= */


/* =========================================================
   1. LISTA DE PRODUCTOS
   Aquí está toda la información de los productos de la tienda.
   Para AGREGAR un producto nuevo, copia un objeto { } completo,
   pégalo antes del cierre "];" y cambia sus datos.
   El "id" debe ser único (no repetir números).
   El "categoria" debe ser una de: "computadores", "componentes",
   "perifericos" o "monitores", para que los filtros funcionen.
   ========================================================= */
const productos = [
  {
    id: 1,
    nombre: "Lenovo IdeaPad 3",
    categoria: "computadores",
    precio: 2199900,
    icono: "laptop",
    descripcion: "Portátil liviano ideal para trabajo y estudio, con buena autonomía de batería."
  },
  {
    id: 2,
    nombre: "ASUS TUF Gaming F15",
    categoria: "computadores",
    precio: 4599900,
    icono: "laptop",
    descripcion: "Portátil gamer con tarjeta gráfica dedicada, pensado para diseño y videojuegos."
  },
  {
    id: 3,
    nombre: "PC Escritorio TechNova Office",
    categoria: "computadores",
    precio: 2899900,
    icono: "torre",
    descripcion: "Equipo de escritorio armado a la medida, perfecto para oficinas y pymes."
  },
  {
    id: 4,
    nombre: "Procesador Intel Core i5-13400F",
    categoria: "componentes",
    precio: 1199900,
    icono: "chip",
    descripcion: "Procesador de gama media-alta, gran rendimiento para multitarea y diseño."
  },
  {
    id: 5,
    nombre: "Procesador AMD Ryzen 5 7600",
    categoria: "componentes",
    precio: 1349900,
    icono: "chip",
    descripcion: "Procesador eficiente en consumo, ideal para equipos de trabajo y gaming."
  },
  {
    id: 6,
    nombre: "Tarjeta gráfica NVIDIA RTX 4060",
    categoria: "componentes",
    precio: 2199900,
    icono: "gpu",
    descripcion: "Tarjeta gráfica para edición de video, renderizado 3D y videojuegos exigentes."
  },
  {
    id: 7,
    nombre: "Memoria RAM Kingston Fury 16 GB",
    categoria: "componentes",
    precio: 289900,
    icono: "ram",
    descripcion: "Memoria RAM DDR4 de alto rendimiento para mejorar la velocidad de tu equipo."
  },
  {
    id: 8,
    nombre: "SSD Samsung 970 EVO 1 TB",
    categoria: "componentes",
    precio: 459900,
    icono: "disco",
    descripcion: "Disco de estado sólido NVMe, arranque y carga de programas mucho más rápidos."
  },
  {
    id: 9,
    nombre: "Tarjeta madre ASUS Prime B550",
    categoria: "componentes",
    precio: 649900,
    icono: "board",
    descripcion: "Tarjeta madre confiable, compatible con procesadores AMD de última generación."
  },
  {
    id: 10,
    nombre: "Fuente de poder EVGA 600W",
    categoria: "componentes",
    precio: 249900,
    icono: "fuente",
    descripcion: "Fuente de poder certificada 80+ Bronze, energía estable para tu equipo."
  },
  {
    id: 11,
    nombre: "Monitor LG 24 pulgadas Full HD",
    categoria: "monitores",
    precio: 649900,
    icono: "monitor",
    descripcion: "Monitor con buena calidad de color, ideal para oficina y uso diario."
  },
  {
    id: 12,
    nombre: "Teclado mecánico Redragon",
    categoria: "perifericos",
    precio: 189900,
    icono: "teclado",
    descripcion: "Teclado mecánico retroiluminado, resistente y cómodo para largas jornadas."
  },
  {
    id: 13,
    nombre: "Mouse Logitech G203",
    categoria: "perifericos",
    precio: 99900,
    icono: "mouse",
    descripcion: "Mouse óptico preciso, cómodo para trabajo de oficina y videojuegos."
  },
  {
    id: 14,
    nombre: "Audífonos HyperX Cloud Stinger",
    categoria: "perifericos",
    precio: 259900,
    icono: "audifonos",
    descripcion: "Audífonos livianos con buen sonido, ideales para llamadas y multimedia."
  },
  {
    id: 15,
    nombre: "Webcam Logitech C920 Full HD",
    categoria: "perifericos",
    precio: 349900,
    icono: "webcam",
    descripcion: "Cámara web Full HD, perfecta para reuniones virtuales y clases en línea."
  }
];


/* =========================================================
   2. FORMATEAR PRECIOS EN PESOS COLOMBIANOS
   ========================================================= */
function formatearPrecio(numero) {
  // toLocaleString con "es-CO" pone los puntos de miles como en Colombia
  return "$" + numero.toLocaleString("es-CO");
}


/* =========================================================
   3. ÍCONOS SVG PARA CADA PRODUCTO
   En lugar de fotos, usamos íconos simples dibujados en SVG.
   Así el catálogo se ve ordenado sin depender de imágenes externas.
   Si más adelante quieren usar fotos reales, solo reemplacen esta
   función por: return `<img src="img/producto${id}.jpg" alt="">`;
   ========================================================= */
function obtenerIcono(tipo) {
  const iconos = {
    laptop: '<path d="M4 6h16v10H4z"/><path d="M2 19h20l-2-3H4z"/>',
    torre: '<rect x="7" y="3" width="10" height="18" rx="1"/><circle cx="12" cy="7" r="0.6"/><line x1="9" y1="15" x2="15" y2="15"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="1"/><line x1="9" y1="2" x2="9" y2="6"/><line x1="15" y1="2" x2="15" y2="6"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="2" y1="9" x2="6" y2="9"/><line x1="2" y1="15" x2="6" y2="15"/><line x1="18" y1="9" x2="22" y2="9"/><line x1="18" y1="15" x2="22" y2="15"/>',
    gpu: '<rect x="3" y="7" width="18" height="10" rx="1"/><circle cx="8" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>',
    ram: '<rect x="4" y="8" width="16" height="8" rx="1"/><line x1="7" y1="16" x2="7" y2="19"/><line x1="11" y1="16" x2="11" y2="19"/><line x1="15" y1="16" x2="15" y2="19"/>',
    disco: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/>',
    board: '<rect x="3" y="3" width="18" height="18" rx="1"/><rect x="7" y="7" width="5" height="5"/><line x1="15" y1="7" x2="18" y2="7"/><line x1="15" y1="11" x2="18" y2="11"/><line x1="7" y1="15" x2="17" y2="15"/>',
    fuente: '<rect x="4" y="5" width="16" height="14" rx="1"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="12" y2="13"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="1"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/>',
    teclado: '<rect x="2" y="7" width="20" height="10" rx="1"/><line x1="5" y1="10" x2="5" y2="10"/><line x1="19" y1="14" x2="15" y2="14"/>',
    mouse: '<rect x="8" y="3" width="8" height="14" rx="4"/><line x1="12" y1="3" x2="12" y2="9"/>',
    audifonos: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2" y="13" width="4" height="6" rx="1"/><rect x="18" y="13" width="4" height="6" rx="1"/>',
    webcam: '<circle cx="12" cy="10" r="5"/><circle cx="12" cy="10" r="1.5"/><path d="M8 20l1.5-4h5L16 20"/>'
  };
  const contenido = iconos[tipo] || iconos["chip"];
  return `<svg viewBox="0 0 24 24" class="icono-producto" fill="none" stroke="currentColor" stroke-width="1.4">${contenido}</svg>`;
}


/* =========================================================
   4. CARRITO DE COMPRAS (usa localStorage)
   El carrito se guarda como una lista de objetos:
   [ { id: 1, cantidad: 2 }, { id: 4, cantidad: 1 } ]
   Así, aunque el usuario cambie de página o recargue, el
   carrito sigue guardado en el navegador.
   ========================================================= */

// Lee el carrito guardado en localStorage (o devuelve una lista vacía)
function obtenerCarrito() {
  const datos = localStorage.getItem("technovaCarrito");
  return datos ? JSON.parse(datos) : [];
}

// Guarda la lista del carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("technovaCarrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Agrega un producto al carrito (o aumenta su cantidad si ya está)
function agregarAlCarrito(idProducto) {
  const carrito = obtenerCarrito();
  const item = carrito.find(p => p.id === idProducto);

  if (item) {
    item.cantidad = item.cantidad + 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  mostrarMensajeFlotante("Producto agregado al carrito");
}

// Cambia la cantidad de un producto específico en el carrito
function cambiarCantidad(idProducto, nuevaCantidad) {
  let carrito = obtenerCarrito();

  if (nuevaCantidad <= 0) {
    carrito = carrito.filter(p => p.id !== idProducto);
  } else {
    const item = carrito.find(p => p.id === idProducto);
    if (item) item.cantidad = nuevaCantidad;
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}

// Elimina un producto completamente del carrito
function eliminarDelCarrito(idProducto) {
  const carrito = obtenerCarrito().filter(p => p.id !== idProducto);
  guardarCarrito(carrito);
  renderizarCarrito();
}

// Vacía todo el carrito
function vaciarCarrito() {
  localStorage.removeItem("technovaCarrito");
  actualizarContadorCarrito();
  renderizarCarrito();
}

// Actualiza el número que aparece junto al ícono del carrito en el menú
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const contador = document.getElementById("contador-carrito");
  if (contador) contador.textContent = totalUnidades;
}

// Dibuja la tabla del carrito en carrito.html
function renderizarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  if (!contenedor) return; // si no estamos en carrito.html, no hace nada

  const carrito = obtenerCarrito();
  const carritoVacio = document.getElementById("carrito-vacio");
  const resumenCarrito = document.getElementById("resumen-carrito");

  if (carrito.length === 0) {
    contenedor.innerHTML = "";
    if (carritoVacio) carritoVacio.style.display = "block";
    if (resumenCarrito) resumenCarrito.style.display = "none";
    return;
  }

  if (carritoVacio) carritoVacio.style.display = "none";
  if (resumenCarrito) resumenCarrito.style.display = "block";

  let html = "";
  let total = 0;

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (!producto) return;

    const subtotal = producto.precio * item.cantidad;
    total += subtotal;

    html += `
      <div class="fila-carrito">
        <div class="fila-carrito__info">
          <div class="fila-carrito__icono">${obtenerIcono(producto.icono)}</div>
          <div>
            <p class="fila-carrito__nombre">${producto.nombre}</p>
            <p class="fila-carrito__precio">${formatearPrecio(producto.precio)} c/u</p>
          </div>
        </div>

        <div class="fila-carrito__cantidad">
          <button onclick="cambiarCantidad(${producto.id}, ${item.cantidad - 1})" aria-label="Restar">−</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad(${producto.id}, ${item.cantidad + 1})" aria-label="Sumar">+</button>
        </div>

        <p class="fila-carrito__subtotal">${formatearPrecio(subtotal)}</p>

        <button class="fila-carrito__eliminar" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
      </div>
    `;
  });

  contenedor.innerHTML = html;

  const totalTexto = document.getElementById("total-carrito");
  if (totalTexto) totalTexto.textContent = formatearPrecio(total);
}


/* =========================================================
   5. CATÁLOGO: mostrar productos, buscador y filtros
   ========================================================= */

// Dibuja una lista de productos dentro del contenedor del catálogo
function renderizarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return;

  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="sin-resultados">No encontramos productos con esos criterios de búsqueda.</p>`;
    return;
  }

  contenedor.innerHTML = lista.map(producto => `
    <article class="tarjeta-producto">
      <div class="tarjeta-producto__imagen">${obtenerIcono(producto.icono)}</div>
      <p class="tarjeta-producto__categoria">${nombreCategoria(producto.categoria)}</p>
      <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
      <p class="tarjeta-producto__descripcion">${producto.descripcion}</p>
      <p class="tarjeta-producto__precio">${formatearPrecio(producto.precio)}</p>
      <div class="tarjeta-producto__botones">
        <button class="boton boton--borde" onclick="verDetalles(${producto.id})">Ver detalles</button>
        <button class="boton boton--relleno" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      </div>
    </article>
  `).join("");
}

// Convierte el valor de categoría (ej "componentes") en un texto más bonito
function nombreCategoria(valor) {
  const nombres = {
    computadores: "Computadores",
    componentes: "Componentes",
    perifericos: "Periféricos",
    monitores: "Monitores"
  };
  return nombres[valor] || valor;
}

// Muestra un detalle rápido del producto (usamos una alerta sencilla,
// pensada para que el proyecto sea fácil de explicar en la exposición)
function verDetalles(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;
  alert(
    `${producto.nombre}\n\n` +
    `Categoría: ${nombreCategoria(producto.categoria)}\n` +
    `Precio: ${formatearPrecio(producto.precio)}\n\n` +
    `${producto.descripcion}`
  );
}

// Aplica el buscador + el filtro de categoría + el orden de precio, todo junto
function aplicarFiltros() {
  const campoBusqueda = document.getElementById("buscador");
  const selectCategoria = document.getElementById("filtro-categoria");
  const selectOrden = document.getElementById("filtro-orden");

  let resultado = [...productos];

  // 1. Filtrar por texto escrito en el buscador
  if (campoBusqueda && campoBusqueda.value.trim() !== "") {
    const texto = campoBusqueda.value.trim().toLowerCase();
    resultado = resultado.filter(p => p.nombre.toLowerCase().includes(texto));
  }

  // 2. Filtrar por categoría seleccionada
  if (selectCategoria && selectCategoria.value !== "todas") {
    resultado = resultado.filter(p => p.categoria === selectCategoria.value);
  }

  // 3. Ordenar por precio
  if (selectOrden) {
    if (selectOrden.value === "menor-mayor") {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (selectOrden.value === "mayor-menor") {
      resultado.sort((a, b) => b.precio - a.precio);
    }
  }

  renderizarProductos(resultado);
}

// Muestra solo los productos destacados en la página de inicio
function renderizarDestacados() {
  const contenedor = document.getElementById("lista-destacados");
  if (!contenedor) return;

  const idsDestacados = [2, 6, 8, 11]; // productos elegidos para mostrar en inicio
  const destacados = productos.filter(p => idsDestacados.includes(p.id));

  contenedor.innerHTML = destacados.map(producto => `
    <article class="tarjeta-producto">
      <div class="tarjeta-producto__imagen">${obtenerIcono(producto.icono)}</div>
      <p class="tarjeta-producto__categoria">${nombreCategoria(producto.categoria)}</p>
      <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
      <p class="tarjeta-producto__precio">${formatearPrecio(producto.precio)}</p>
      <div class="tarjeta-producto__botones">
        <button class="boton boton--relleno" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      </div>
    </article>
  `).join("");
}


/* =========================================================
   6. MENSAJE FLOTANTE DE CONFIRMACIÓN
   Aviso pequeño que aparece abajo cuando se agrega algo al carrito
   ========================================================= */
function mostrarMensajeFlotante(texto) {
  let aviso = document.getElementById("aviso-flotante");

  if (!aviso) {
    aviso = document.createElement("div");
    aviso.id = "aviso-flotante";
    document.body.appendChild(aviso);
  }

  aviso.textContent = texto;
  aviso.classList.add("aviso-flotante--visible");

  setTimeout(() => {
    aviso.classList.remove("aviso-flotante--visible");
  }, 2200);
}


/* =========================================================
   7. MENÚ RESPONSIVE (hamburguesa para celulares)
   ========================================================= */
function iniciarMenuResponsive() {
  const boton = document.getElementById("boton-menu");
  const menu = document.getElementById("menu-navegacion");

  if (!boton || !menu) return;

  boton.addEventListener("click", () => {
    menu.classList.toggle("menu-navegacion--abierto");
  });
}


/* =========================================================
   8. VALIDACIÓN DE FORMULARIOS
   Función genérica que revisa campos obligatorios, formato de
   correo y de teléfono. Se usa en contacto, servicios y compra.
   ========================================================= */
function validarFormulario(formulario) {
  let esValido = true;

  // Limpiar errores anteriores
  formulario.querySelectorAll(".mensaje-error").forEach(el => el.remove());
  formulario.querySelectorAll(".campo--error").forEach(el => el.classList.remove("campo--error"));

  function marcarError(campo, texto) {
    campo.classList.add("campo--error");
    const error = document.createElement("p");
    error.className = "mensaje-error";
    error.textContent = texto;
    campo.insertAdjacentElement("afterend", error);
    esValido = false;
  }

  // Revisar todos los campos obligatorios (marcados con required)
  formulario.querySelectorAll("[required]").forEach(campo => {
    if (campo.value.trim() === "") {
      marcarError(campo, "Este campo es obligatorio.");
    }
  });

  // Revisar formato de correo
  const campoCorreo = formulario.querySelector('input[type="email"]');
  if (campoCorreo && campoCorreo.value.trim() !== "") {
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(campoCorreo.value.trim())) {
      marcarError(campoCorreo, "Escribe un correo válido, ejemplo: nombre@correo.com");
    }
  }

  // Revisar formato de teléfono (solo números, entre 7 y 10 dígitos)
  const campoTelefono = formulario.querySelector('input[type="tel"]');
  if (campoTelefono && campoTelefono.value.trim() !== "") {
    const formatoTelefono = /^[0-9]{7,10}$/;
    if (!formatoTelefono.test(campoTelefono.value.trim())) {
      marcarError(campoTelefono, "Escribe un teléfono válido (solo números, 7 a 10 dígitos).");
    }
  }

  return esValido;
}

// Prepara un formulario para validar al enviarlo y mostrar un mensaje de éxito
// "alExito" es una función opcional que se ejecuta si el formulario es válido
// (la usamos, por ejemplo, para vaciar el carrito después de registrar un pedido)
function iniciarFormulario(idFormulario, idMensajeExito, alExito) {
  const formulario = document.getElementById(idFormulario);
  if (!formulario) return;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    if (validarFormulario(formulario)) {
      formulario.style.display = "none";
      const mensaje = document.getElementById(idMensajeExito);
      if (mensaje) mensaje.style.display = "block";
      if (typeof alExito === "function") alExito();
    }
  });
}


/* =========================================================
   9. INICIO GENERAL
   Esta parte se ejecuta apenas carga cualquier página del sitio.
   Cada función revisa primero si los elementos existen, así que
   es seguro llamarlas aunque no estemos en esa página.
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
  actualizarContadorCarrito();
  iniciarMenuResponsive();

  renderizarDestacados();      // solo hace algo en index.html
  renderizarCarrito();          // solo hace algo en carrito.html

  // Catálogo de productos (productos.html)
  const listaProductos = document.getElementById("lista-productos");
  if (listaProductos) {
    aplicarFiltros();

    document.getElementById("buscador")?.addEventListener("input", aplicarFiltros);
    document.getElementById("filtro-categoria")?.addEventListener("change", aplicarFiltros);
    document.getElementById("filtro-orden")?.addEventListener("change", aplicarFiltros);

    // Si llegamos desde un link de categoría (ej: productos.html?categoria=monitores)
    const parametros = new URLSearchParams(window.location.search);
    const categoriaUrl = parametros.get("categoria");
    if (categoriaUrl) {
      const selectCategoria = document.getElementById("filtro-categoria");
      if (selectCategoria) {
        selectCategoria.value = categoriaUrl;
        aplicarFiltros();
      }
    }
  }

  // Botón para vaciar el carrito
  document.getElementById("boton-vaciar-carrito")?.addEventListener("click", vaciarCarrito);

  // Formularios de cada página (si existen en la página actual)
  iniciarFormulario("formulario-contacto", "mensaje-exito-contacto");
  iniciarFormulario("formulario-servicio", "mensaje-exito-servicio");
  iniciarFormulario("formulario-empresas", "mensaje-exito-empresas");
  iniciarFormulario("formulario-compra", "mensaje-exito-compra", vaciarCarrito);
});
