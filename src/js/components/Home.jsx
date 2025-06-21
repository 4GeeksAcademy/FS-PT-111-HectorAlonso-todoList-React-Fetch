import React, {useState, useEffect} from "react";

const Home = () => {
	/*Usestae para generar el todos y el nombre que damos desde la api y la lista de tareas
	con metodo asincorno para traer los datos de la api 
	impime en consola los datos, y estos mismos los utilizamos para que se repesenten en la web*/
	const[todos, setTodos]= useState([]);
	const[nombre, setNombre] = useState("")
	const[tarea, setTarea] = useState("");
	const getTodos = async () => {
		let result = await fetch("https://playground.4geeks.com/todo/users/Hector");
		let data = await result.json();
		console.log(data);
		setTodos(data.todos);
		setNombre(data.name);
	}
	useEffect(() =>{
		getTodos();
	},[]);
//funcion post todos, asincrona con la api, se genera una nueva tarea con el label y el is done por defecto
//se enlaza con el fetch y se convierte a json.strigify para que la api pueda reconocerlo
//el gettodos final, hace que llame a la funcion para recargar la pagina, sin necesidad de recargar manualmente
	const postTodos = async ()=> {
		const nuevaTarea = 
		{
  			"label": tarea,
  			"is_done": false,
		}
		
		await fetch("https://playground.4geeks.com/todo/todos/Hector",{
			method: "POST",
			body: JSON.stringify(nuevaTarea),
			headers: {"content-type":"application/json"}
		});
		getTodos();
	}
	//funcion borrar, en esencia misma funcion que post,pero ce cambia el metodo
	//esta funcion recibe por parametro item, que nos hace traer el objeto(tarea) y de ahi extrae el id
	//que lo llevaa la URL de la api para eliminarlo
	const deleteTodos = async (item)=>{
		const idTarea = item.id;
		console.log(`Eliminando tarea ${idTarea}`);
		await fetch(`https://playground.4geeks.com/todo/todos/${idTarea}`,{
			method: "DELETE",
		});
		getTodos();
	}
	//parte html, sencilla, sin tocar css, un h1 que da el nombre asignado desde la api
	//un p que "presenta" tu nueva tarea, input de entrada de texto y el boton para enviar la tarea a lalista
	//despues, un.map para recorrer los objetos del usuario y que los imprima en la web a traves de unos p
	//cada uno con su boton que lo elimina
	return (
		<div className="text-center">
			<h1>lista de tareas de {nombre}</h1>
			<p>tu nueva tarea es:</p>
			<input type="text" value={tarea} onChange={(e) => setTarea(e.target.value)} />
			<button onClick={postTodos}>añadir tarea</button>
			{todos.map((item,index)=>{
				return(
					<div>
					<p>{item.label}</p>
					<button onClick={()=> deleteTodos(item)}>x</button>
				</div>
				)
			})}
		</div>
	);
};

export default Home;
