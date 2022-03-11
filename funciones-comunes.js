function calcularPromedio(array) {
    let sumaTotal = 0;
    for (let i = 0; i < array.length; i++) {
        sumaTotal += array[i];
    }
    return (sumaTotal / array.length).toFixed(2);
};

function calcularNumeroMasPequenio(array) {
    let contador = 0;
    let numeroMasPequenio = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i] < numeroMasPequenio) {
            numeroMasPequenio = array[i]
        }
    }
    return numeroMasPequenio;
};

function calcularNumeroMasGrande(array) {
    let contador = 0;
    let numeroMasGrande = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i] > numeroMasGrande) {
            numeroMasGrande = array[i]
        }
    }
    return numeroMasGrande;
};


function borrarInputs(tipo) {
    let inputs = document.querySelectorAll(`.label-${tipo}`);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].remove();
    }
}