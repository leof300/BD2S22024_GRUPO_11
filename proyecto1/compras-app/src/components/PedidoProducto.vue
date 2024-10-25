<!-- src/views/ProductoTabla.vue -->
<template>
  <div>
    <h1>Agregar Productos</h1>
    <div>
      <label for="producto">Seleccione un producto:</label>
      <select v-model="productoSeleccionado" @change="agregarProducto">
        <option value="" disabled>Seleccione un producto</option>
        <option v-for="producto in productos" :key="producto.codigo_producto" :value="producto.codigo_producto">
          {{ producto.codigo_producto }} - {{ producto.nombre_producto }}
        </option>
      </select>
    </div>

    <table>
      <thead>
      <tr>
        <th>Código</th>
        <th>Nombre</th>
        <th>Marca</th>
        <th>Fabricante</th>
        <th>Precio</th>
        <th>Código Bodega</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
        <th>Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="producto in productosSeleccionados" :key="producto.codigo_producto">
        <td>{{ producto.codigo_producto }}</td>
        <td>{{ producto.nombre_producto }}</td>
        <td>{{ producto.marca }}</td>
        <td>{{ producto.fabricante }}</td>
        <td>{{ producto.precio }}</td>
        <td>{{ producto.codigo_bodega }}</td>
        <td>
          <input type="number" v-model.number="producto.cantidad" @input="actualizarSubtotal(producto)" min="1" />
        </td>
        <td>{{ calcularSubtotal(producto) }}</td>
        <td>
          <button @click="eliminarProducto(producto.codigo_producto)">Eliminar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductoTabla',
  data() {
    return {
      productos: [], // Lista de productos obtenidos del servicio
      productoSeleccionado: '', // Código del producto seleccionado
      productosSeleccionados: [], // Lista de productos agregados a la tabla
    };
  },
  mounted() {
    this.fetchProductos();
  },
  methods: {
    async fetchProductos() {
      try {
        const response = await fetch('http://localhost:3000/producto');
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        this.productos = await response.json();
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    },
    agregarProducto() {
      const producto = this.productos.find(p => p.codigo_producto === this.productoSeleccionado);
      if (producto && !this.productosSeleccionados.find(p => p.codigo_producto === producto.codigo_producto)) {
        this.productosSeleccionados.push({ ...producto, cantidad: 1 });
      }
      this.productoSeleccionado = '';
      this.exportarProductos();
    },
    eliminarProducto(codigo_producto) {
      this.productosSeleccionados = this.productosSeleccionados.filter(
          p => p.codigo_producto !== codigo_producto
      );
      this.exportarProductos();
    },
    actualizarSubtotal(producto) {
      this.exportarProductos();
    },
    calcularSubtotal(producto) {
      return (producto.cantidad * producto.precio).toFixed(2); // Multiplicación de la cantidad por el precio
    },
    exportarProductos() {
      // Crear un arreglo con los atributos requeridos
      const productosParaExportar = this.productosSeleccionados.map(p => ({
        codigo_producto: p.codigo_producto,
        codigo_bodega: p.codigo_bodega,
        nombre_producto: p.nombre_producto,
        precio_unitario: p.precio,
        subtotal: this.calcularSubtotal(p),
      }));
      // Emitir el evento 'exportar-productos' con los datos
      this.$emit('exportar-productos', productosParaExportar);
    },
  },
};
</script>

<style scoped>
/* Estilos básicos */
select, button {
  margin-top: 10px;
  padding: 10px;
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

table {
  width: 75%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #ddd;
  padding: 6px;
  text-align: left;
}

th {
  background-color: #4CAF50;
  color: white;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #e53935;
}

input[type="number"] {
  width: 60px;
}
</style>
