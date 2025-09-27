// Arreglo inicial de tareas.
let tareas = [
    { id: 1, descripcion: "Hacer mercado", completado: false },
    { id: 2, descripcion: "Estudiar métodos de arreglos", completado: true },
    { id: 3, descripcion: "Sacar a pasear a Zuki", completado: false }
];
let nextId = 4; // Para asegurar IDs únicos para nuevas tareas

// 1. Obtención de elementos del DOM
const inputTarea = document.querySelector("#inputTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const totalTareasSpan = document.querySelector("#totalTareas");
const realizadasSpan = document.querySelector("#tareasRealizadas");

// ----------------------------------------------------------------------
// Función principal para renderizar la lista y actualizar contadores.
// ----------------------------------------------------------------------
function renderTareas() {
    let html = "";
    
    // Iteración y Construcción del HTML
    tareas.forEach((tarea) => { // Uso de forEach para generar la vista 
        const claseCompletada = tarea.completado ? "completed" : "";
        const estadoBtn = tarea.completado ? "Deshacer" : "Completar";

        // Se usa el ID en onclick para identificar la tarea
        html += `
            <li class="task-row">
                <span class="${claseCompletada}">
                    ${tarea.id} - ${tarea.descripcion}
                </span>
                <div>
                    <button onclick="cambiarEstado(${tarea.id})">${estadoBtn}</button>
                    <button onclick="borrarTarea(${tarea.id})">X</button>
                </div>
            </li>
        `;
    });
    
    listaTareas.innerHTML = html;

    // Actualizar contadores
    // Contar total de tareas con .length
    totalTareasSpan.textContent = tareas.length;

    // Contar tareas realizadas con .filter y .length
    const tareasCompletadas = tareas.filter(t => t.completado === true); // Uso de filter
    realizadasSpan.textContent = tareasCompletadas.length;
}

// ----------------------------------------------------------------------
// Función para Agregar Tarea
// Utiliza el método push.
// ----------------------------------------------------------------------
btnAgregar.addEventListener("click", () => {
    const descripcion = inputTarea.value.trim();

    if (descripcion === "") {
        alert("La descripción de la tarea no puede estar vacía.");
        return;
    }

    const nuevaTarea = { // La tarea se guarda como un objeto 
        id: nextId++,
        descripcion: descripcion,
        completado: false // Iniciar tareas con completado: false 
    };

    tareas.push(nuevaTarea); // Uso del método push para agregar al final 
    inputTarea.value = ""; // Limpiar input
    renderTareas(); // Actualizar lista
});

// ----------------------------------------------------------------------
// Función para Borrar Tarea.
// Utiliza findIndex y splice.
// ----------------------------------------------------------------------
function borrarTarea(id) {
    // 1. Buscar el índice por ID (Necesario para usar splice) 
    const index = tareas.findIndex((tarea) => tarea.id === id); // Uso de findIndex en arreglo de objetos [cite: 118]

    // 2. Eliminar el elemento del arreglo con splice
    if (index !== -1) {
        tareas.splice(index, 1); // splice(indice, cantidad a borrar)
    }

    // 3. Actualizar lista
    renderTareas(); // Actualizar lista
}

// ----------------------------------------------------------------------
// Función para Marcar como Completada
// Utiliza findIndex para encontrar y modificar el objeto.
// ----------------------------------------------------------------------
function cambiarEstado(id) {
    // 1. Buscar el índice (o el objeto mismo) por ID
    const index = tareas.findIndex((tarea) => tarea.id === id); // Uso de findIndex

    // 2. Modificar el estado 'completado' del objeto (Pista)
    if (index !== -1) {
        // Al encontrar el índice, modificamos la propiedad del objeto
        tareas[index].completado = !tareas[index].completado; 
    }

    // 3. Actualizar lista
    renderTareas(); // Actualizar lista
}

// Renderizar la lista al cargar la página
renderTareas();