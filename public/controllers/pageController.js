// Al cargar el DOM y la página realizar la funcionalidad
document.addEventListener("DOMContentLoaded", function () {
  // Datos que llenarán los select
  const datos = [
    {
      categorias: [
        {
          id: 1,
          nombre: "Comida",
          productos: [
            {
              id: 1,
              nombre: "Bebidas",
              marcas: [
                {
                  id: 1,
                  nombre: "Coca-Cola",
                  ventas: [
                    { mes: "enero", valor: 200 },
                    { mes: "febrero", valor: 150 },
                    { mes: "marzo", valor: 300 },
                    { mes: "abril", valor: 500 },
                  ],
                },
              ],
            },
            {
              id: 2,
              nombre: "Snacks",
              marcas: [
                {
                  id: 2,
                  nombre: "Zambos",
                  ventas: [
                    { mes: "enero", valor: 130 },
                    { mes: "febrero", valor: 140 },
                    { mes: "marzo", valor: 200 },
                    { mes: "abril", valor: 250 },
                  ],
                },
              ],
            },
            {
              id: 3,
              nombre: "Dulces",
              marcas: [
                {
                  id: 3,
                  nombre: "Snickers",
                  ventas: [
                    { mes: "enero", valor: 80 },
                    { mes: "febrero", valor: 300 },
                    { mes: "marzo", valor: 70 },
                    { mes: "abril", valor: 150 },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 2,
          nombre: "Ropa",
          productos: [
            {
              id: 1,
              nombre: "Camisas",
              marcas: [
                {
                  id: 4,
                  nombre: "Polo",
                  ventas: [
                    { mes: "enero", valor: 40 },
                    { mes: "febrero", valor: 30 },
                    { mes: "marzo", valor: 70 },
                    { mes: "abril", valor: 80 },
                  ],
                },
              ],
            },
            {
              id: 2,
              nombre: "Jeans",
              marcas: [
                {
                  id: 5,
                  nombre: "Levi's",
                  ventas: [
                    { mes: "enero", valor: 100 },
                    { mes: "febrero", valor: 120 },
                    { mes: "marzo", valor: 180 },
                    { mes: "abril", valor: 90 },
                  ],
                },
              ],
            },
            {
              id: 3,
              nombre: "Tenis",
              marcas: [
                {
                  id: 6,
                  nombre: "Nike",
                  ventas: [
                    { mes: "enero", valor: 200 },
                    { mes: "febrero", valor: 300 },
                    { mes: "marzo", valor: 180 },
                    { mes: "abril", valor: 150 },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 3,
          nombre: "Tecnología",
          productos: [
            {
              id: 1,
              nombre: "Celulares",
              marcas: [
                {
                  id: 7,
                  nombre: "Apple",
                  ventas: [
                    { mes: "enero", valor: 20 },
                    { mes: "febrero", valor: 15 },
                    { mes: "marzo", valor: 70 },
                    { mes: "abril", valor: 30 },
                  ],
                },
              ],
            },
            {
              id: 2,
              nombre: "Laptops",
              marcas: [
                {
                  id: 8,
                  nombre: "Dell",
                  ventas: [
                    { mes: "enero", valor: 110 },
                    { mes: "febrero", valor: 275 },
                    { mes: "marzo", valor: 195 },
                    { mes: "abril", valor: 220 },
                  ],
                },
              ],
            },
            {
              id: 3,
              nombre: "Audífonos",
              marcas: [
                {
                  id: 9,
                  nombre: "Razer",
                  ventas: [
                    { mes: "enero", valor: 30 },
                    { mes: "febrero", valor: 75 },
                    { mes: "marzo", valor: 75 },
                    { mes: "abril", valor: 80 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  // Obtener los selects desde el DOM
  const categoriaSelect = document.getElementById("categoriaSelect"); // Select de Categorías
  const productoSelect = document.getElementById("productoSelect"); // Select de Productos
  const marcaSelect = document.getElementById("marcaSelect"); // Select de Marcas

  // Función para llenar un select con los datos enviados
  function llenarSelect(selectElement, data) {
    selectElement.innerHTML = "";

    data.forEach((item) => {
      // Llenar el select con cada elemento existente en los datos
      const option = document.createElement("option"); // Crear opciones en el select
      option.value = item.id; // Agrega el id de la opción
      option.textContent = item.nombre; // Agrega el nombre de la opción
      selectElement.appendChild(option); // Agregar al select
    });
  }

  // Función para actualizar select de productos
  function actualizarProductos() {
    // Llenar select de productos de acuerdo a la categoría la que pertenecen
    const categoriaId = parseInt(categoriaSelect.value);

    const categoria = datos[0].categorias.find(
      (item) => item.id === categoriaId
    );

    productoSelect.innerHTML = "";
    marcaSelect.innerHTML = "";

    if (categoria) {
      llenarSelect(productoSelect, categoria.productos); // Llenar el select de productos
      actualizarMarcas(); // Actualizar el select de las marcas automáticamente
    }
  }

  // Función para actualizar el select de marcas
  function actualizarMarcas() {
    // Llenar select de marcas de acuerdo a la categoría y el producto al que pertenecen
    const categoriaId = parseInt(categoriaSelect.value);
    const productoId = parseInt(productoSelect.value);

    const categoria = datos[0].categorias.find(
      (item) => item.id === categoriaId
    );

    if (categoria) {
      const producto = categoria.productos.find(
        (item) => item.id === productoId
      );

      if (producto) {
        llenarSelect(marcaSelect, producto.marcas); // Llenar el select de marcas
        actualizarGrafico(); // Actualizar el gráfico al seleccionar una marca
      }
    }
  }

  marcaSelect.removeEventListener("change", actualizarGrafico);
  marcaSelect.addEventListener("change", () => {
    actualizarGrafico(); // Actualizar el gráfico al seleccionar una marca
  });

  // Función para generar y actualizar gráfico de barras
  function actualizarGrafico() {
    // Generar el gráfico de acuerdo a los datos seleccionados
    const categoriaId = parseInt(categoriaSelect.value);
    const productoId = parseInt(productoSelect.value);
    const marcaId = parseInt(marcaSelect.value);

    const categoria = datos[0].categorias.find(
      (item) => item.id === categoriaId // Obtener la categoría para generar el gráfico
    );

    if (categoria) {
      const producto = categoria.productos.find(
        (item) => item.id === productoId // Obtener el producto para generar el gráfico
      );

      if (producto) {
        const marca = producto.marcas.find((item) => item.id === marcaId); // Obtener la marca para generar el gráfico

        if (marca) {
          const ventas = marca.ventas;
          const valoresVentas = ventas.map((venta) => venta.valor);
          const meses = ventas.map((venta) => venta.mes);

          const ctx = document.getElementById("graficoVentas").getContext("2d");

          // Verificar si el gráfico ya existe y destruirlo si es necesario para que no se visualice el mismo gráfico siempre
          if (
            window.graficoVentas &&
            typeof window.graficoVentas.destroy === "function"
          ) {
            window.graficoVentas.destroy();
          }

          // Generar el gráfico usando los datos de ventas
          window.graficoVentas = new Chart(ctx, {
            type: "bar",
            data: {
              labels: meses,
              datasets: [
                {
                  label: "Ventas",
                  data: valoresVentas,
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      }
    }
  }

  categoriaSelect.addEventListener("change", actualizarProductos); // Al seleccionar una categoría, actualizar el select de los productos
  productoSelect.addEventListener("change", actualizarMarcas); // Al seleccionar un producto, actualizar el select de las marcas

  llenarSelect(categoriaSelect, datos[0].categorias); // Llenar select de categorías al cargar la página

  actualizarProductos(); // Actualizar el select de productos

  actualizarGrafico(); // Generar el gráfico al cargar la página
});
