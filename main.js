/*
#####TAREA 6.1#####
Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN). */

function crearInputIntegrantes(cantidadIntegrantes) {
    let $divIntegrantes = document.querySelector("#div-integrantes");
    for (let i = 0; i < cantidadIntegrantes; i++) {
        let $labelIntegrantes = document.createElement('label');
        $labelIntegrantes.innerText = `Edad integrante #${i+1}: `
        $labelIntegrantes.setAttribute("class", "label-integrantes")

        let $inputIntegrantes = document.createElement('input');
        $inputIntegrantes.type = "number"
        $inputIntegrantes.setAttribute("class", "input-integrantes")


        $labelIntegrantes.appendChild($inputIntegrantes);
        $divIntegrantes.appendChild($labelIntegrantes);
    }
}


document.querySelector("#boton-siguiente").onclick = function() {
    let cantidadIntegrantes = document.querySelector("#cantidad-integrantes").value;
    borrarInputs("integrantes");
    crearInputIntegrantes(cantidadIntegrantes);
    let $botonCalcularEdades = document.querySelector("#boton-calcular-edades")
    if (cantidadIntegrantes > 0) {
        $botonCalcularEdades.style.display = "block"
    } else {
        $botonCalcularEdades.style.display = "none"
    }
}

function obtenerEdades() {
    let $integrantes = document.querySelectorAll(".input-integrantes");
    let array = [];
    for (let i = 0; i < $integrantes.length; i++) {
        array.push(Number($integrantes[i].value));
    }
    return array;
};

document.querySelector("#boton-calcular-edades").onclick = function() {
    let edades = obtenerEdades();
    document.querySelector("#mayor-edad").innerText = `${calcularNumeroMasGrande(edades)}`;
    document.querySelector("#menor-edad").innerText = `${calcularNumeroMasPequenio(edades)}`;
    document.querySelector("#promedio-edad").innerText = `${calcularPromedio(edades)}`;
    document.querySelector("#resultados-edades").style.display = "block";
    let $divTarea2 = document.querySelector("#div-tarea2");
    $divTarea2.style.display = "block";
}


document.querySelector("#boton-reinicio").onclick = function() {
    borrarInputs("integrantes");
    borrarInputs("salarios");
    document.querySelector("#cantidad-integrantes").value = "";
    document.querySelector("#resultados-edades").style.display = "none";
    document.querySelector("#resultados-salarios").style.display = "none";
    document.querySelector("#boton-calcular-edades").style.display = "none";
    document.querySelector("#div-tarea2").style.display = "none";
    cantidadDeInputs = 0;
}


/*
#####TAREA 6.2##### 

Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).

*/


function cambiarDisabledBotonAgregar() {
    let cantidadIntegrantes = document.querySelector("#cantidad-integrantes").value;
    if (cantidadDeInputs == cantidadIntegrantes) {
        $botonAgregar.disabled = true;
    } else {
        $botonAgregar.disabled = false;
    }
}

function pasarSalariosAnualesAMensuales(salariosAnuales) {
    const MESES_EN_UN_ANIO = 12;
    let salariosMensuales = []
    for (let i = 0; i < salariosAnuales.length; i++) {
        salariosMensuales.push((salariosAnuales[i] / MESES_EN_UN_ANIO));
    }
    return salariosMensuales;
}

function obtenerSalarios() {
    let $salarios = document.querySelectorAll(".input-salarios");
    let array = [];
    for (let i = 0; i < $salarios.length; i++) {
        if ($salarios[i].value != 0) {
            array.push(Number($salarios[i].value));
        }
    }
    return array;
};

let $botonAgregar = document.querySelector("#agregar-salario");
let $divInputSalarios = document.querySelector("#div-salarios");
let cantidadDeInputs = 0;

$botonAgregar.onclick = function() {
    cantidadDeInputs += 1;
    let $labelSalarios = document.createElement('label');
    $labelSalarios.innerText = `Salario anual integrante #${cantidadDeInputs}: `
    $labelSalarios.setAttribute("class", "label-salarios")

    let $inputSalarios = document.createElement('input');
    $inputSalarios.type = "number"
    $inputSalarios.setAttribute("class", "input-salarios")

    $labelSalarios.appendChild($inputSalarios);
    $divInputSalarios.appendChild($labelSalarios);
    cambiarDisabledBotonAgregar()
}

document.querySelector("#quitar-salario").onclick = function() {
    $divInputSalarios.removeChild($divInputSalarios.lastChild)
    cantidadDeInputs -= 1;
    cambiarDisabledBotonAgregar()
}

document.querySelector("#boton-calcular-salarios").onclick = function() {
    let salarios = obtenerSalarios();
    document.querySelector("#mayor-anual").innerText = `${calcularNumeroMasGrande(salarios)}`;
    document.querySelector("#menor-anual").innerText = `${calcularNumeroMasPequenio(salarios)}`;
    document.querySelector("#promedio-anual").innerText = `${calcularPromedio(salarios)}`;
    document.querySelector("#promedio-mensual").innerText = `${calcularPromedio(pasarSalariosAnualesAMensuales(salarios))}`;
    document.querySelector("#resultados-salarios").style.display = "block";
}