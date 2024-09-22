<script>
  export default {
    name: 'App',
  };
</script>

<template>
  <div id="app">

    <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/compras" class="nav-link">Pedidos</router-link>
  </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>


<style>
.navbar {
  background-color: #057ba6;
  padding: 10px 20px;
  display: flex;
  flex-direction: row; /* Mantiene los elementos en fila, uno al lado del otro */
  justify-content: center;
  gap: 15px;
  border-radius: 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Asegura que la barra esté por encima del contenido */
}

/* Estilo para los enlaces de navegación */
.nav-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 8px 12px;
  transition: background-color 0.3s ease;
  border-radius: 4px;
}

/* Efecto hover para los enlaces de navegación */
.nav-link:hover {
  background-color: #02445e;
}

.content {
  margin-top: 60px; /* Agregar un margen superior para compensar la altura de la barra de navegación */
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #2486C4;
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* Estilo básico para el botón */
button {
  background-color: #0181A8; /* Verde */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}



/* Efecto hover para el botón */
button:hover {
  background-color: #45a049;
  transform: scale(1.05); /* Aumenta el tamaño del botón ligeramente */
}

/* Efecto activo cuando se presiona el botón */
button:active {
  background-color: #3e8e41;
  transform: scale(0.95); /* Reduce el tamaño ligeramente */
}

/* Desactivar el botón */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

container {
  container-type: inline-size;
}


</style>