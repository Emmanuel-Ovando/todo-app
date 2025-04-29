
//Mandamos a llamar las dependencias que necitamos

const express = require('express');
const cors = require('cors');

//Inicializamos las aplicaciones y el puerto

const app = express();
const puerto = 3000;

//Inicializamos cors y hacemos que express guarde los archivos en formato jsno

app.use(express.json());
app.use(cors());

//Declaramos un arreglo para las tareas y una variable para los ids

let ids = 1;
let tareas = [];


// Rutas para la API

//GET

app.get('/tareas', (req, res)=>{

    //Mostramos la respuesta en un arrglo en formato json

    res.json(tareas);

});

//POST (Crear)

app.post('/tareas', (req, res)=>{

    const { titulo } = req.body;

    if(!titulo){ //Si no hay titulo

        return res.status(400).json({ message: 'Se requiere el titulo de la tarea' });

    }

    //Se crea una tarea nueva

    const nuevaTarea = {id : ids++, title : titulo, completed : false};

    tareas.push(nuevaTarea); // Si todo esta bien, la tarea se crea y se guarda en el arreglo

    res.status(201).json(nuevaTarea);

});


//Marcar tarea como completada

app.patch('/tareas/:id', (req, res)=>{

    const tareaId = parseInt(req.params.id); // Se alamacena el ID
    const tarea = tareas.find((t) => t.id === tareaId); // Va a buscar la taarea con el id

    if(!tarea){

        return res.status(404).json({ message: 'Tarea no encontrada'});
    }



    if(typeof req.body.completed === 'boolean'){

        tarea.completed = req.body.completed; // Tarea completada
        
    }

    res.json(tarea); // Se manda la tarea completada 
});


// Eliminar tarea

app.delete('/tareas/:id', (req, res)=>{

    const tareaId = parseInt(req.params.id);
    const indice = tareas.findIndex((t)=> t.id === tareaId);

    if(indice === -1){

        return res.status(404).json({ message : "Tarea no encontrada" });
    }

    const tareasEliminadas = tareas.splice(indice, 1)[0]; // Elimina la tarea del arreglo

    res.json(tareasEliminadas)


});




app.listen(puerto, ()=>{

    console.log(`El servidor esta funcionando en el puerto ${puerto}`);

});
