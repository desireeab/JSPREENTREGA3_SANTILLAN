class Producto {
    constructor(id, nombre, precio, imagen){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.imagen=imagen;
    }
}

const alimentoGatito = new Producto (0, "Alimento Gatito", 500, "alimento.jpg");
const alimentoAdulto = new Producto (1, "Alimento Adulto", 800, "alimento.jpg");
const collarGatito = new Producto (2, "Collar Gatito", 200, "collar.jpg");
const collarAdulto = new Producto (3, "Collar Adulto", 300, "collar.jpg");
const juguete = new Producto (4, "Juguete", 500, "juguete.jpg");
const comedero = new Producto (5, "Comedero", 300, "comedero.jpg");
const pretalS = new Producto (6, "Pretal talle S", 700, "pretal.jpg");
const pretalM = new Producto (7, "Pretal talle M", 800, "pretal.jpg");
const pretalL = new Producto (8, "Pretal talle L", 900, "pretal.jpg");

const arrayProductos = [alimentoGatito,alimentoAdulto,collarGatito,collarAdulto,juguete,comedero, pretalS, pretalM,pretalL]

const cardProducto = (listaProductos) => {
    for (e of listaProductos){
        let card = document.createElement("div")
        card.innerHTML = `<div class="card" style="width: 18rem;">
                            <img src="./img/${e.imagen}" class="card-img-top" alt="${e.nombre}">
                            <div class="card-body">
                            <h5 class="card-title">${e.nombre}</h5>
                            <p class="card-text">Compralo por $${e.precio}</p>
                            <input type="button" onclick="agregaCarrito(${e.id})" class="btn btn-info" value="Agregar al 🛒">
                            </div>
                        </div>`
        document.body.append(card);
    }
}
cardProducto(arrayProductos)

const arrayCarrito = []

class ObjCarrito{
    constructor(producto, cant){
        this.producto = producto;
        this.cantidad = cant;
    }
    sumaStock(){
        this.cantidad = this.cantidad + 1
    }
}

function agregaCarrito(prod){
    let existeEnCarrito = arrayCarrito.find(e => e.producto == prod)
    if(existeEnCarrito != undefined){
        let posicion = arrayCarrito.findIndex(elem => elem.producto == existeEnCarrito.producto);
        arrayCarrito[posicion].sumaStock();    
        console.table(arrayCarrito)
    }else{
        const prodCarrito = new ObjCarrito (prod, 1)
        arrayCarrito.push(prodCarrito)
        console.table(arrayCarrito)
    }
}

function verCarrito(){
    document.body.innerHTML = ""

    for (item of arrayCarrito) {
        let card = document.createElement("div")
        let datosProd = arrayProductos.find(elem => elem.id == item.producto)

        card.innerHTML = `<div class = "card" style="width: 18rem">
            <img src="./img/${datosProd.imagen}" class = "card-img-top" alt="Acá va la imagen de ${datosProd.nombre}">
            <div class = "card-body">
            <h5 class = "card-title"> Estás llevando ${datosProd.nombre}</h5>
            <p class = "card-text"> ${item.cantidad} unidad/es</p>
            </div>
            </div>`
        document.body.append(card)
    }
}

localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito))

