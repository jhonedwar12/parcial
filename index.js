var express = require('express');
var router = express();
var port=3000


router.get('/',(req, res) =>{
  res.send('index');
})

router.listen(port,()=>{
  console.log ( `http://localhost:${port}`);
})

////////////////////////////////////////pre_parcial/////////////////////////////////////////////////////
router.get('/Productos_categoria/:tipo', (req, res) => {
  const tipo = req.params.tipo;


const productos = require('./database/datos_productos');
const producto = new productos();
const listaDeproductos = producto.lista;

const producto_tipo = listaDeproductos.filter(producto => (producto.categoria_producto=== tipo));

res.send(producto_tipo);

});

router.get('/Productos_lista', (req, res) => {

const productos = require('./database/datos_productos');
const producto = new productos();
const listaDeproductos = producto.lista;

res.send(listaDeproductos);

});

router.get('/Productos_precio/:precio', (req, res) => {
const productos = require('./database/datos_productos');
const producto = new productos();
const listaDeproductos = producto.lista;

const precio = req.params.precio;
const producto_tipo = listaDeproductos.filter(producto => (producto.valor_producto> precio));

res.send(producto_tipo);

});

router.get('/Productos_lista_iva', (req, res) => {

  const productos = require('./database/datos_productos');
  const producto = new productos();
  const listaDeProductos = producto.lista;

  for (let i = 0; i < listaDeProductos.length; i++) {
    listaDeProductos[i].valor_producto -= listaDeProductos[i].valor_producto * 0.19;
  }

  res.send(`los productos descontandoles el 19% ${listaDeProductos}`);

});

router.get('/Vehiculos_lista/:marca', (req, res) => {

  const vehiculos = require('./database/datos_automoviles');
  const vehiculo = new vehiculos();
  const listaDeVehiculos = vehiculo.lista;
  const marca=req.params.marca;
 const vehiculo_marca= listaDeVehiculos.filter(vehiculo => vehiculo.marca===marca )

  res.send(vehiculo_marca);

});


router.get('/Vehiculos_lista_impuesto', (req, res) => {

  const vehiculos = require('./database/datos_automoviles');
  const vehiculo = new vehiculos();
  const listaDeVehiculos = vehiculo.lista;
  const impuestos=[];

  for (let i = 0; i < listaDeVehiculos.length; i++) {
    if (listaDeVehiculos[i].tipo='Gasolina'){

        if (listaDeVehiculos[i].precio<=50000000 ){
              impuestos.push({impuesto:listaDeVehiculos[i].precio*.01,
                vehiculo:listaDeVehiculos[i]})
        }else if (listaDeVehiculos[i].precio>50000000 && listaDeVehiculos[i].precio <= 100000000){
              impuestos.push({impuesto: listaDeVehiculos[i].precio*.015,vehiculo:listaDeVehiculos[i]})
        }else if (listaDeVehiculos[i].precio>100000001 && listaDeVehiculos[i].precio <= 150000000){
              impuestos.push({impuesto:listaDeVehiculos[i].precio*.025,vehiculo:listaDeVehiculos[i]})
        }else {
              impuestos.push({impuesto: listaDeVehiculos[i].precio*.035,vehiculo:listaDeVehiculos[i]})
        }

   }else{impuestos.push({impuesto:listaDeVehiculos[i].precio*.01,vehiculo:listaDeVehiculos[i]})
  }
}
  res.send(impuestos);
});

////1 de productos/utiles
router.get('/Productos_por_nombre/:nombre', (req, res) => {
  const nombre =req.params.nombre;

  const productos = require('./database/datos_productos');
  const producto = new productos();
  const listaDeProductos = producto.lista;

  const producto_nombre=listaDeProductos.filter(producto=> producto.nombre_producto=nombre);

  res.send(producto_nombre);

});
////2
router.get('/Productos_por_valor/:valor', (req, res) => {
  const valor_producto =req.params.valor_producto;

  const productos = require('./database/datos_productos');
  const producto = new productos();
  const listaDeProductos = producto.lista;

  const producto_valor_producto=listaDeProductos.filter(producto=> producto.valor_producto<=valor_producto);

  res.send(producto_valor_producto);

});
////3
router.get('/Productos_por_id/:id', (req, res) => {
  const id =req.params.id;

  const productos = require('./database/datos_productos');
  const producto = new productos();
  const listaDeProductos = producto.lista;

  const producto_id=listaDeProductos.filter(producto=> producto.id==id);

  res.send(producto_id);

});
////4
router.get('/Productos_por_primera_letra/:letra', (req, res) => {
  const letra =req.params.letra;

  const productos = require('./database/datos_productos');
  const producto = new productos();
  const listaDeProductos = producto.lista;
  let vect;
  let imprimir=[];

  for (let i = 0; i < listaDeProductos.length; i++) {

      vect=listaDeProductos[i].nombre_producto;

    if (vect[0]===letra){
      imprimir.push(listaDeProductos[i])
     }
   }
   res.send(imprimir);
});
////5
router.get('/Productos_lista_por_fecha_exp/:fecha', (req, res) => {
  const fecha=req.params.fecha;

  const productos = require('./database/datos_productos');
  const producto = new productos();
  const listaDeproductos = producto.lista;

  const Productos_lista_por_fecha_exp= listaDeproductos.filter(producto=> producto.expiracion_producto==fecha)
  res.send(Productos_lista_por_fecha_exp);

  });

////1 de automoviles
router.get('/Automoviles_por_id/:id', (req, res) => {
  const id =req.params.id;

  const automoviles = require('./database/datos_automoviles');
  const automovil = new automoviles();
  const listaDeAutomoviles = automovil.lista;

  const automovil_id=listaDeAutomoviles.filter(automovil=> automovil.id==id);

  res.send(automovil_id);

});
////2
router.get('/Automoviles_por_valor/:valor', (req, res) => {
  const valor_producto =req.params.valor_producto;

  const productos = require('./database/datos_automoviles');
  const producto = new productos();
  const listaDeProductos = producto.lista;

  const producto_valor_producto=listaDeProductos.filter(producto=> producto.valor_producto<=valor_producto);

  res.send(producto_valor_producto);

});
////3
router.get('/Automoviles_por_primera_letra/:letra', (req, res) => {
  const letra =req.params.letra;

  const productos = require('./database/datos_automoviles');
  const producto = new productos();
  const listaDeProductos = producto.lista;
  let vect;
  let imprimir=[];

  for (let i = 0; i < listaDeProductos.length; i++) {

      vect=listaDeProductos[i].marca;

    if (vect[0]==letra){
      imprimir.push(listaDeProductos[i])
     }
   }
   res.send(imprimir);
});
/////4
router.get('/Automoviles_lista_por_fecha_exp/:fecha', (req, res) => {
  const fecha=req.params.fecha;

  const productos = require('./database/datos_automoviles');
  const producto = new productos();
  const listaDeproductos = producto.lista;

  const Productos_lista_por_fecha_exp= listaDeproductos.filter(producto=> producto.expiracion_producto==fecha)
  res.send(Productos_lista_por_fecha_exp);

  });

/////5
router.get('/Automoviles_precio/:precio', (req, res) => {
  const productos = require('./database/datos_automoviles');
  const producto = new productos();
  const listaDeproductos = producto.lista;

  const precio = req.params.precio;
  const producto_tipo = listaDeproductos.filter(producto => (producto.valor_producto> precio));

  res.send(producto_tipo);

  });

