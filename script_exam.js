function calcularPago() {
    const horas = document.getElementById('horas').value;
    const tipoAuto = document.getElementById('auto').value;
    const resultado = document.getElementById('resultado');

    if (!horas || !tipoAuto) {
        resultado.textContent = "Completa todos los campos";
        return;
    }

    const precios = {
        auto_chico: 20.0,
        camioneta: 30.0,
        camion: 40.0
    };

    const precioPorHora = precios[tipoAuto];
    const total = precioPorHora * parseFloat(horas);

    resultado.textContent = `Total a pagar: $${total.toFixed(2)}`;
    document.getElementById("imagen").style.visibility = "visible";
}
