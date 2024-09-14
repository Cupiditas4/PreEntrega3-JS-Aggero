let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form-agregar-tarea').addEventListener('submit', (event) => {
        event.preventDefault();
        agregarTarea();
    });

    document.getElementById('btn-completada').addEventListener('click', tareaCompleta);
    document.getElementById('btn-buscar-estado').addEventListener('click', buscarPorEstado);
    document.getElementById('btn-buscar-prioridad').addEventListener('click', buscarPorPrioridad);
    document.getElementById('btn-buscar-nombre').addEventListener('click', buscarPorNombre);
    document.getElementById('btn-listar').addEventListener('click', listarTareas);
    document.getElementById('btn-nombres').addEventListener('click', nombresDeTareas);
    document.getElementById('btn-borrar').addEventListener('click', borrarTareas);
    document.getElementById('btn-salir').addEventListener('click', () => {
        window.close(); 
    });
});

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function agregarTarea() {
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let prioridad = document.getElementById('prioridad').value;
    
    if (!nombre || !descripcion || !prioridad) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    let nuevaTarea = {
        nombre: nombre,
        descripcion: descripcion,
        prioridad: prioridad,
        completada: false
    };
    tareas.push(nuevaTarea);
    guardarTareas();
    document.getElementById('form-agregar-tarea').reset();
    mostrarResultado("Tarea agregada.");
}

function tareaCompleta() {
    let nombre = prompt("Ingrese el nombre de la tarea a marcar como completada:");
    let tarea = tareas.find(tarea => tarea.nombre === nombre);
    if (tarea) {
        tarea.completada = true;
        guardarTareas();
        mostrarResultado(`Tarea "${nombre}" completada.`);
    } else {
        mostrarResultado(`Tarea "${nombre}" no encontrada.`);
    }
}

function buscarPorEstado() {
    let completadas = tareas.filter(tarea => tarea.completada === true);
    let resultado = "Tareas completadas:<br>";
    completadas.forEach(tarea => {
        resultado += `${tarea.nombre} - ${tarea.descripcion} - Prioridad: ${tarea.prioridad}<br>`;
    });
    mostrarResultado(resultado || "No hay tareas completadas.");
}

function buscarPorPrioridad() {
    let prioridad = prompt("Ingrese la prioridad para filtrar las tareas (baja, media, alta):");
    let filtradas = tareas.filter(tarea => tarea.prioridad === prioridad);
    let resultado = `Tareas con prioridad "${prioridad}":<br>`;
    filtradas.forEach(tarea => {
        resultado += `${tarea.nombre} - ${tarea.descripcion} - Completada: ${tarea.completada}<br>`;
    });
    mostrarResultado(resultado || "No hay tareas con esa prioridad.");
}

function buscarPorNombre() {
    let nombre = prompt("Ingrese el nombre de la tarea a buscar:");
    let tarea = tareas.find(tarea => tarea.nombre === nombre);
    if (tarea) {
        mostrarResultado(`${tarea.nombre} - ${tarea.descripcion} - Prioridad: ${tarea.prioridad} - Completada: ${tarea.completada}`);
    } else {
        mostrarResultado(`Tarea "${nombre}" no encontrada.`);
    }
}

function listarTareas() {
    if (tareas.length === 0) {
        mostrarResultado("No hay tareas.");
        return;
    }
    let resultado = "Todas las tareas:<br>";
    tareas.forEach(tarea => {
        resultado += `${tarea.nombre} - ${tarea.descripcion} - Prioridad: ${tarea.prioridad} - Completada: ${tarea.completada}<br>`;
    });
    mostrarResultado(resultado);
}

function nombresDeTareas() {
    let nombres = tareas.map(tarea => tarea.nombre);
    mostrarResultado("Nombres de las tareas:<br>" + nombres.join("<br>"));
}

function borrarTareas() {
        localStorage.removeItem('tareas');
        tareas = [];
        mostrarResultado("Todas las tareas han sido borradas.");
}

function mostrarResultado(mensaje) {
    document.getElementById('resultado').innerHTML = mensaje;
}