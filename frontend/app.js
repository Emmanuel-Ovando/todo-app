

const d = document;
const w = window;



//Botones para redireccionar
const $verTareasBtn = d.querySelector(".ver-btn");
const $regresarBtn = d.querySelector(".regresar-btn");
const $volverBtn = d.querySelector(".volver-btn");
const $formulario = d.getElementById("formulario-tarea")


//Funciones para hacer fetch a la API

//GET
const obtenerTareas = ()=>{
    const $tbody = d.querySelector(".tbody");

    if (!$tbody) return; 

    fetch('http://localhost:3000/tareas')
      .then(res => res.json())
      .then(tareas => {

        $tbody.innerHTML = '';
        
        tareas.forEach(tarea => {
            
            const tr = d.createElement("tr");

            tr.innerHTML = `<td>${tarea.id}</td>
                            <td>${tarea.title}</td>
                            <td><input type="checkbox" ${tarea.completed ? "checked" : ""} data-id= ${tarea.id}/></td>
                            <td class = "operacion"><button class = "eliminar-btn" data-id = ${tarea.id}>
                                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                                                         <path d="M4 7l16 0"></path>
                                                         <path d="M10 11l0 6"></path>
                                                         <path d="M14 11l0 6"></path>
                                                         <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                         <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                       </svg>
                                                    </button>
                            </td>`;
            
            $tbody.appendChild(tr);
        });
      });
}

//POST

const agregarTarea = (e)=>{
  e.preventDefault();

  const $tareaInput = d.querySelector(".tarea-input");
  const titulo = $tareaInput.value.trim();

  if (!titulo) return alert("Escribe una tarea");

  fetch('http://localhost:3000/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({ titulo })
  })
  .then(res => res.json())
  .then(data => {
    alert('Tarea creada');
    $tareaInput.value = "";
    obtenerTareas();
  })

}

//PATCH

const marcarCompletada = (id, completed)=>{

  fetch(`http://localhost:3000/tareas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify({ completed })
  })
    .then(req => req.json())
    .then(data => {

      alert('Tarea Actualizada');
      obtenerTareas();
    })
    .catch(err=> alert("Error al actualizar la tarea: "));
}

//DELETE

const eliminarTarea = (id)=>{

  fetch(`http://localhost:3000/tareas/${id}`, {

    method: 'DELETE'

  })

  .then(req => req.json())
  .then(data => {
    alert("Tarea Eliminada");

    obtenerTareas();
  })

  .catch(err=> alert("Error al eliminar la tarea"))
}


//Eventos
d.addEventListener("DOMContentLoaded", ()=>{
  obtenerTareas();
  if($formulario) $formulario.addEventListener("submit", agregarTarea)
});
d.addEventListener("click", (e)=>{
    if(e.target === $verTareasBtn) w.location.href = "tareas.html";
    if(e.target === $regresarBtn) w.location.href = "index.html";

    if(e.target.matches('input[type="checkbox"]')){
      const id = e.target.dataset.id;
      const completed = e.target.checked;

      marcarCompletada(id, completed);
    }

    if(e.target.closest(".eliminar-btn")){
      const confirmar = confirm("Esta seguro que desea elimnar la tarea");
      
      if(confirmar){
        const id = e.target.closest(".eliminar-btn").dataset.id;
        eliminarTarea(id);
      }else{
        alert("Accion cancelada");
      }
    }
});


