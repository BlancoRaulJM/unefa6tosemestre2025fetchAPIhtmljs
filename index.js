const BotonCargar = document.querySelector('#loadButton');
const BotonLimpiar = document.querySelector('#clearButton');
const SelectorCategoria = document.querySelector('#select');
BotonCargar.addEventListener('click', () =>{
	CargarDatosAPI();
})
const CargarDatosAPI = async () => {
	const URLc = 'https://unefa6tosemestre2025.onrender.com/api/articulos';
	const categoriaSeleccionada = SelectorCategoria.value;
	try
	{
		const respuesta = await fetch(URLc, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"ALUMNO": "14534467",
				"ARTCATEGO": categoriaSeleccionada
			})
		});
		const resultado = await respuesta.json();
		if (resultado.Resul){
			const ListaProductos = resultado.data;
			const tableBody = document.querySelector('#productTableBody');
			tableBody.innerHTML = '';
			ListaProductos.forEach( producto => {
				const row = document.createElement('tr');
				row.innerHTML = `
					<td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">${producto.ARTCATEGO}</td>
					<td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">${producto.ARTNUMERO}</td>
					<td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">${producto.ARTDESCRI}</td>
				`;
				tableBody.appendChild(row);
			});
		}
	}
	catch(error){
		console.error('Error en la consulta de la API: ', error);
	}
};
BotonLimpiar.addEventListener('click', () =>{
	const tableBody = document.querySelector('#productTableBody');
    tableBody.innerHTML = '';
});