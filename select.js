document.addEventListener('DOMContentLoaded', function(){
const precio = document.querySelector('#price');
const categoria = document.querySelector('#category');
const marca = document.querySelector('#brand');
const contenedor = document.querySelector('#contenedor-cartas');
const listul = document.querySelector('#carrito-lista');
let lista = [];

//para que los select vuelvan a su parte inicial
let inicialprecio;
let inicialcategoria;
let inicialmarca;

axios.get('https://dummyjson.com/products')
    .then(function(response){
        const productos = response.data.products;

inicialprecio = precio.value;
inicialcategoria = categoria.value;
inicialmarca = marca.value;

precio.addEventListener('change', (e) => {
    actualizar('price');
    filtrarProductos();
});
categoria.addEventListener('change', (e) => {
    actualizar('category');
    filtrarProductos();
});
marca.addEventListener('change', (e) => {
    actualizar('brand');
    filtrarProductos();
});

function filtrarProductos(){
const valorprecio = parseFloat(precio.value);
const valorcategoria = categoria.value;
const valormarca = marca.value;

    const filtro = productos.filter(producto => {
        let siprecio = true;
        let sicategoria = true;
        let simarca = true;

        if( valorprecio !== 0){
            siprecio = producto.price <= (valorprecio);
        }
        if( valorcategoria !== ""){
            sicategoria = producto.category === valorcategoria;
        }
        if(valormarca !== "") {
            simarca = producto.brand === valormarca;
        }
        return siprecio && sicategoria && simarca;
    });
    if (filtro.length === 0){
       "<p>No hay producto</p>"
  
    } else {
        contenedor.innerHTML = "";
        filtro.forEach(producto2 => {
        const carta = `<div class="col">
        <div class="card m-4" style="width: 18rem">
            <img src="${producto2.thumbnail}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${producto2.title}</h5>
                <p class="card-text">${producto2.brand} Precio ${producto2.price} euros</p>
                <p class="card-text">Categoría: ${producto2.category}</p>
                <p class="card-text">Descripción: ${producto2.description}</p>
                <p class="card-text">Descuento: ${producto2.discountPercentage}</p>
                <p class="card-text">Calificación: ${producto2.rating}</p>
                <p class="card-text">Valores: ${producto2.stock}</p>       
                <a href="#" class="btn btn-primary">Ver detalles</a>
                <button class="btn btn-success agregar-carrito" data-id="${producto2.id}">Añadir al carrito</button>
            </div>
        </div>
    </div>`;
    contenedor.innerHTML += carta;
});
const botones = document.querySelectorAll('.agregar-carrito');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const idproducto = parseInt(boton.getAttribute('data-id'));
            const productoseleccionado = productos.find(producto3 => producto3.id === idproducto);
            if(productoseleccionado) {
              agregarAlalista(productoseleccionado);
            }
        });
    
    });
}

}


    function agregarAlalista(producto){
        lista.push(producto);
        actualizarLista();
        
    }
    function actualizarLista(){
        listul.innerHTML = "";
        lista.forEach(element => {
            const itemcarrito = `<li>${element.title} - ${element.brand} - ${element.price}euros</li>`;
            listul.innerHTML += itemcarrito;
        });
    }
    function actualizar(select){
        if(select !== 'price'){
            precio.value = inicialprecio;
        }
        if(select !== 'category'){
            categoria.value = inicialcategoria;
        }
        if(select !== 'brand'){
            marca.value = inicialmarca;
        }
    }

})
    .catch(function(error){
        console.error('Error al obtener datos del json', error)
    });
});









    