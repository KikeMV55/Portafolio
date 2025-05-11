


const menuBtn = document.querySelector(".header .menu-btn");
const menu = document.querySelector(".header .menu");


function toggleMenu(){
	menuBtn.classList.toggle("active");
	menu.classList.toggle("open");
}

menuBtn.addEventListener("click", toggleMenu);



document.addEventListener('DOMContentLoaded', function() {
	// Objeto para almacenar los pedidos
	const pedido = {};
            
	// Función para actualizar la cantidad
	function actualizarCantidad(platillo, cambio) {
		if (!pedido[platillo]) {
			pedido[platillo] = 0;
		}
                
		pedido[platillo] += cambio;
                
		// No permitir cantidades negativas
		if (pedido[platillo] < 0) {
			pedido[platillo] = 0;
		}
                
		// Actualizar visualización
		document.querySelector(`.cantidad[data-platillo="${platillo}"]`).textContent = pedido[platillo];
	}

	// Event listeners para los botones de suma
	document.querySelectorAll('.sumar').forEach(button => {
		button.addEventListener('click', function() {
			const platillo = this.parentElement.querySelector('.cantidad').dataset.platillo;
			actualizarCantidad(platillo, 1);
		});
	});
            
	// Event listeners para los botones de resta
	document.querySelectorAll('.restar').forEach(button => {
		button.addEventListener('click', function() {
			const platillo = this.parentElement.querySelector('.cantidad').dataset.platillo;
			actualizarCantidad(platillo, -1);
		});
	});
            
	// Finalizar pedido
	document.getElementById('finalizarPedido').addEventListener('click', function() {
		// Filtrar solo los platillos con cantidad > 0
		const pedidoFinal = Object.entries(pedido)
		.filter(([_, cantidad]) => cantidad > 0)
		.reduce((obj, [platillo, cantidad]) => {
			obj[platillo] = cantidad;
			return obj;
		}, {});

		// Generar el ticket
		if (Object.keys(pedidoFinal).length === 0) {
			alert('No has seleccionado ningún platillo.');
			return;
		}

		let ticket = '=======T I C K E T   D E   P E D I D O=======\n\n';
		ticket += 'Cocina Económica Doña Tere\n\n';
		ticket += 'Detalle del pedido\n\n';

		let totalPlatillos = 0;
		for (const [platillo, cantidad] of Object.entries(pedidoFinal)) {
			ticket += '	    - ';
			ticket += `${platillo}: ${cantidad}\n`;
			totalPlatillos += cantidad;
		}

		ticket += `\nTotal de platillos: ${totalPlatillos}\n`;
		ticket += '\n¡Gracias por su preferencia!';

		// Mostrar el ticket
		//alert(ticket);

		// Opcional: Aquí podrías enviar el pedido a un servidor
		//console.log('Pedido realizado:', pedidoFinal);


		var doc = new jsPDF();
		doc.setFontSize(20);
		doc.setTextColor(141,73,58);
		doc.text(30, 30, ticket);
		var string = doc.output('datauristring');
		$('iframe').attr('src', string);

		document.getElementById("pdf_ticket").style.display="block";

	});
});