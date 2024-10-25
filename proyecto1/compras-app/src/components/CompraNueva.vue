<script>
  import tablaProductos from "./PedidoProducto.vue";

  export default {
    name: 'CompraNueva',
    components: {
      tablaProductos, // Registrar el componente
    },
    data() {
      return {
        pedido: {
          codigo_pedido: null,
          codigo_producto: null,
          codigo_bodega: null,
          total_pedido: '',
          descuento: '',
          total_sin_descuento: '',
          codigo_cliente: null,
          nombre_empresa: '',
          tipo_cliente: '',
          nombre_producto: '',
          precio_unitario: '',
          subtotal: '',
          fecha_compra: '',
        },
        clientes: [],
        selectedCliente: '',
        fechaCompra: new Date().toISOString().split('T')[0],
        productosExportados: [], // Lista de productos exportados desde ProductoTabla

      };
    },
    methods: {
      cancelar() {
        this.$router.back(); // Navega a la página anterior en el historial
      },
      async crearPedidoDetalle() {

        // Crear el listado de pedidos en base a los productos exportados

        // console.log("Listado de pedidos generados:", this.productosExportados);
        const listadoDePedidos = this.productosExportados.map(producto => ({
          codigo_pedido: this.pedido.codigo_pedido,
          codigo_cliente: this.selectedCliente.codigo_cliente,
          nombre_empresa: this.selectedCliente.nombre_empresa,
          tipo_cliente: this.selectedCliente.tipo_cliente,
          descuento: this.selectedCliente.descuento,
          codigo_producto: producto.codigo_producto,
          nombre_producto: producto.nombre_producto,
          codigo_bodega: producto.codigo_bodega,
          precio_unitario: producto.precio_unitario,
          subtotal: producto.subtotal,
          fecha_compra: this.fechaCompra,
          total_sin_descuento: this.pedido.total_sin_descuento,
          total_pedido: this.pedido.total_pedido,
        }));

        // Mostrar el listado de pedidos en la consola

        //alert('Pedidos generados correctamente.');

        for (const pedido of listadoDePedidos) {
          try {
            const response = await fetch('http://localhost:3000/pedidodetalle', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(pedido),
            });

            if (!response.ok) {
              throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Pedido detalle creado exitosamente:', data);
            alert('Pedido detalle creado exitosamente.');
            // Redirigir o limpiar el formulario después de la creación exitosa
          } catch (error) {
            console.error('Error al crear el pedido detalle:', error);
            alert('Hubo un error al crear el pedido detalle.');
          }
        }
        this.$router.back();

      },
      async fetchClientes() {
        try {
          const response = await fetch('http://localhost:3000/cliente');
          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }
          this.clientes = await response.json();
        } catch (error) {
          console.error('Error al obtener la lista de clientes:', error);
        }
      },
      recibirProductosExportados(productos) {
        // Recibir el listado de productos exportados desde ProductoTabla
        this.productosExportados = productos;
      },

    },

    mounted() {
      this.fetchClientes();
    },

    computed: {
      calcularTotalSD() {
        // Calcular el total sumando los subtotales de todos los productos
        this.pedido.total_sin_descuento = this.productosExportados.reduce((total, producto) => {
          return total + parseFloat(producto.subtotal);
        }, 0).toFixed(2)
        return this.pedido.total_sin_descuento;
      },
      calcularTotal() {
        // Calcular el total sumando los subtotales de todos los productos
        let descuento = this.pedido.total_sin_descuento*this.selectedCliente.descuento/100;
        this.pedido.total_pedido = (this.pedido.total_sin_descuento - descuento) .toFixed(2);
        return this.pedido.total_pedido;
      },
    },

  };

</script>

<template>
  <div class="container">

    <div class="form-container">
      <h1>Crear Nuevo Pedido Detalle</h1>
      <form @submit.prevent="crearPedidoDetalle">
        <div class="form-grid">

          <div class="form-group">
            <label for="codigo_pedido">Código Pedido:</label>
            <input type="number" v-model="pedido.codigo_pedido" required />
          </div>
          <div class="form-group">
            <label for="fecha_compra">Fecha de Compra:</label>
            <input type="date" v-model="fechaCompra" required />
          </div>
          <div class="form-group"></div>

          <div class="form-group">
            <label for="codigo_cliente">Código Cliente:</label>
            <select v-model="selectedCliente" @change="onClienteChange" required>
              <option value="" disabled>Seleccione un cliente</option>
              <option v-for="cliente in clientes" :key="cliente.codigo_cliente" :value="cliente">
                {{ cliente.codigo_cliente }} - {{ cliente.nombre_empresa }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="tipo_cliente">Tipo Cliente:</label>
            <input type="text" readonly :value="selectedCliente.tipo_cliente">
          </div>
          <div class="form-group">
            <label for="descuento">Descuento:</label>
            <input type="text" :value="selectedCliente.descuento" readonly />
          </div>

          <div class="producto-tabla">
            <tablaProductos @exportar-productos="recibirProductosExportados"/>
          </div>

          <div class="form-group">
            <label for="total_sin_descuento">Total sin Descuento:</label>
            <input type="text" :value="calcularTotalSD" readonly />
          </div>

          <div class="form-group">
            <label for="total_pedido">Total Pedido:</label>
            <input type="text" :value="calcularTotal" readonly />
          </div>

        </div>
        <button type="submit" class="submit-btn">Aceptar</button>
      </form>
    </div>



  </div>
  <button @click="cancelar" class="hover">Cancelar</button>

</template>

<style scoped>

/* Contenedor principal del formulario */
.form-container {
  max-width: 1300px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Diseño de cuadrícula para los campos del formulario */
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Estilos de cada grupo de campos */
.form-group {
  display: flex;
  flex-direction: column;
}

.producto-tabla {
  flex: 4;
  grid-column: span 3;
}
/* Estilo de las etiquetas y entradas */
label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Botón de envío */
.submit-btn {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  display: block;
  width: 100%;
}

.submit-btn:hover {
  background-color: #45a049;
}
/* Estilo para el select */
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
p {
  font-size: 18px;
  color: #666;
  margin-top: 10px;
}
</style>