<script>
export default {
  name: 'Pedidos',

  data(){
    return{
      pedidos:[],
      filter: '',
    };
  },

  created(){
    this.consultarPedidos();
  },

  methods:{

    async  consultarPedidos(){
      try {
        const response = await fetch('http://localhost:3000/pedidodetalle/');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }

        this.pedidos = [];
        const data = await response.json();
        this.pedidos = data;
        // console.log(data);
        // console.log( this.pedidos);
      } catch (error) {
        console.error('Error al obtener la lista de pedidos:', error);      }
    },

  }


}

</script>

<template>
  <div class="container">
    <h2> Pedidos </h2>

<!--    <input v-model="filter" placeholder="Filtrar por nombre del producto" />-->
    <table>
      <thead>
      <tr>
        <th>Código Pedido</th>
        <th>Código Producto</th>
        <th>Código Bodega</th>
        <th>Nombre Producto</th>
        <th>Precio Unitario</th>
        <th>Subtotal</th>
        <th>Total Pedido</th>
        <th>Descuento</th>
        <th>Total sin Descuento</th>
        <th>Fecha de Compra</th>
        <th>Código Cliente</th>
        <th>Nombre Empresa</th>
        <th>Tipo Cliente</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="detalle in pedidos" :key="detalle.codigo_pedido">
        <td>{{ detalle.codigo_pedido }}</td>
        <td>{{ detalle.codigo_producto }}</td>
        <td>{{ detalle.codigo_bodega }}</td>
        <td>{{ detalle.nombre_producto }}</td>
        <td>{{ detalle.precio_unitario }}</td>
        <td>{{ detalle.subtotal }}</td>
        <td>{{ detalle.total_pedido }}</td>
        <td>{{ detalle.descuento }}</td>
        <td>{{ detalle.total_sin_descuento }}</td>
        <td>{{ detalle.fecha_compra }}</td>
        <td>{{ detalle.codigo_cliente }}</td>
        <td>{{ detalle.nombre_empresa }}</td>
        <td>{{ detalle.tipo_cliente }}</td>
        <td>
          <button> Ver </button>

        </td>
      </tr>
      </tbody>
    </table>

    <router-link to="/compraNueva" class="btn">Nuevo</router-link>


  </div>



</template>

<style scoped>
/* Estilo para el router-link para que se vea como un botón */
.btn {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 7px 7px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}
</style>