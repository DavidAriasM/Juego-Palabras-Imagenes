const imagen = document.querySelector('.img-fluid');
const divRespuestas = document.querySelector('.div-respuestas');
const inputRespuesta = document.querySelector('.input-respuesta');
const btnProbar = document.querySelector('#btn-probar');
const btnSiguiente = document.querySelector('.btn-success')
let contadorRespuestas = 0;
let verificadorRespuestas = []
let respuestasJson = {}
let contadorJugada = 0;
let inputOpciones = '';
var div;
let largoResultado = 0;

function cargarJuego() {
    fetch('json/opciones.json')
        .then(response => response.json())
        .then(data => {
            cargarPartidaDatos(data[contadorJugada])
        });
}

function siguienteJugada(contadorJugada) {
    if (contadorJugada !== largoResultado) {
        fetch('json/opciones.json')
            .then(response => response.json())
            .then(data => {
                //console.log('Jugada nueva: ', data[contadorJugada])
                divRespuestas.removeChild(div)
                largoResultado = data.length;
                cargarPartidaDatos(data[contadorJugada])
            });
    } else {
        console.log('Terminado');
    }

}

function cargarPartidaDatos(data) {
    imagen.setAttribute('src', `${data.imagen}`)
    respuestasJson = data.respuestas;
    div = document.createElement('div');
    divRespuestas.appendChild(div)
    for (i = 1; i <= Object.keys(data.respuestas).length; i++) {
        inputOpciones = document.createElement('input');
        inputOpciones.type = 'text';
        inputOpciones.className = 'col-8 my-2 input-correctas text-center';
        inputOpciones.value = data.respuestas[i];
        inputOpciones.disabled = true;
        inputOpciones.style.color = 'transparent'
        div.appendChild(inputOpciones)
    }
    verificadorRespuestas = [];
    btnSiguiente.style.display = 'none';

}

btnProbar.addEventListener('click', () => {
    comprobarRespuesta()
})

function comprobarRespuesta() {

    for (item in respuestasJson) {
        if (inputRespuesta.value === respuestasJson[item]) {
            console.log('Correcta');
            habilitarInputCorrecto(inputRespuesta.value);
            inputRespuesta.value = ''
            inputRespuesta.focus()
            return
        } else {
            console.log('Incorrecta');
        }
    }

    inputRespuesta.value = ''
    inputRespuesta.focus()
}

function habilitarInputCorrecto(respuesta) {
    const inputs = document.querySelectorAll('.input-correctas');
    for (i = 0; i < inputs.length; i++) {
        if (respuesta === inputs[i].value) {
            if (!verificadorRespuestas.includes(respuesta)) {
                verificadorRespuestas.push(respuesta);
                inputs[i].style.color = '#000';
            }
        }
    }
    validarBtnSiguiente(verificadorRespuestas.length)
}

validarBtnSiguiente = (respuestasCantidad) => {
    if (respuestasCantidad === 5) {
        btnSiguiente.style.display = 'block'
    }
}

btnSiguiente.addEventListener('click', () => {
    siguienteJugada(contadorJugada = contadorJugada + 1)
})

window.addEventListener('load', () => {
    cargarJuego();
})