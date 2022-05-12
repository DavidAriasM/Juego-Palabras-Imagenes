const imagen = document.querySelector('.img-fluid');
const divRespuestas = document.querySelector('.div-respuestas');
const inputRespuesta = document.querySelector('.input-respuesta');
const btnProbar = document.querySelector('#btn-probar');
let respuestasJson = {}

function cargarJuego() {
    fetch('json/opciones.json')
        .then(response => response.json())
        .then(data => {
            cargarPartidaDatos(data[0])
        });
}

function cargarPartidaDatos(data) {
    imagen.setAttribute('src', `img/${data.imagen}`)
    respuestasJson = data.respuestas;
    for (i = 1; i <= Object.keys(data.respuestas).length; i++) {
        let inputOpciones = document.createElement('input');
        inputOpciones.type = 'text';
        inputOpciones.className = 'col-8 my-2 input-correctas';
        inputOpciones.value = data.respuestas[i];
        inputOpciones.disabled = true;
        inputOpciones.style.color = 'transparent'
        divRespuestas.appendChild(inputOpciones)
    }

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
    const inputs = document.querySelectorAll('.input-correctas')
    for (i = 0; i < inputs.length; i++) {
        if (respuesta === inputs[i].value) {
            inputs[i].style.color = '#000'
        }
    }
}
cargarJuego()