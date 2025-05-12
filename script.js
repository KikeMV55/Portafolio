document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("comprobar").addEventListener("click", function() {
        let correctas = 0;
        const respuestas = {
            p1: "B", // 1985
            p2: "B", // Manchester United
            p3: "C", // 5
            p4: "B", // Portugal
            p5: "B"  // Delantero
        };

        const puntos = [0, 0, 0, 0, 0]; // Array para almacenar los puntos por pregunta

        for (let pregunta in respuestas) {
            let opciones = document.getElementsByName(pregunta);
            for (let i = 0; i < opciones.length; i++) {
                if (opciones[i].checked && opciones[i].value === respuestas[pregunta]) {
                    correctas++;
                    puntos[parseInt(pregunta.substring(1)) - 1] = 1;
                    break;
                }
            }
        }

        let mensaje = "";
        if (correctas === 1) {
            mensaje = "Solo acertaste una... ¿Seguro que sigues el fútbol?";
        } else if (correctas === 2) {
            mensaje = "Acertaste 2. Conoces lo básico de CR7.";
        } else if (correctas === 3) {
            mensaje = "Acertaste 3. Buen conocimiento sobre Cristiano.";
        } else if (correctas === 4) {
            mensaje = "Acertaste 4. ¡Eres un buen fan de CR7!";
        } else if (correctas === 5) {
            mensaje = "Acertaste todas ¡Eres un experto en Cristiano Ronaldo!";
        } else {
            mensaje = "No acertaste ninguna... ¿Conoces a Cristiano Ronaldo?";
        }

        document.getElementById("mensaje").innerHTML = `<p>${mensaje}</p>`;

        // Generar el gráfico
        generarGrafico(puntos);
    });

    document.getElementById("generarPdf").addEventListener("click", function() {
        generarPDF();
    });

    function generarPDF() {
        try {
            const doc = new jsPDF();

            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(26, 62, 114);
            doc.text("Respuestas Correctas - Cristiano Ronaldo", doc.internal.pageSize.width / 2, 15, { align: "center" });

            doc.setTextColor(58, 110, 165);
            doc.setFont("helvetica", "normal");

            const contenido = [
                { pregunta: "1. ¿En qué año nació Cristiano Ronaldo?", respuesta: "1985", correcta: "B" },
                { pregunta: "2. ¿Con qué club ganó su primer Balón de Oro?", respuesta: "Manchester United", correcta: "B" },
                { pregunta: "3. ¿Cuántos Balones de Oro tiene Cristiano Ronaldo?", respuesta: "5", correcta: "C" },
                { pregunta: "4. ¿Cuál es el país de origen de Cristiano Ronaldo?", respuesta: "Portugal", correcta: "B" },
                { pregunta: "5. ¿En qué posición juega principalmente Cristiano Ronaldo?", respuesta: "Delantero", correcta: "B" }
            ];

            let posY = 30;
            contenido.forEach((item) => {
                doc.setFont("helvetica", "bold");
                doc.setTextColor(26, 62, 114);
                doc.text(item.pregunta, 14, posY);
                posY += 8;

                doc.setFont("helvetica", "normal");
                doc.setTextColor(58, 110, 165);
                doc.text(`Respuesta correcta: ${item.respuesta}`, 20, posY);
                posY += 10;
            });

            const pdfData = doc.output("datauristring");
            const iframe = document.getElementById("pdfIframe");
            iframe.style.display = "block";
            iframe.src = pdfData;
        } catch (error) {
            console.error("Error al generar PDF:", error);
            alert("Error al generar PDF. Ver consola para detalles.");
        }
    }

    function generarGrafico(puntos) {
        const ctx = document.getElementById('grafico').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (window.myChart) {
            window.myChart.destroy();
        }
        
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5'],
                datasets: [{
                    label: 'Puntos obtenidos',
                    data: puntos,
                    backgroundColor: '#3a6ea5',
                    borderColor: '#1a3e72',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
});