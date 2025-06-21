import { useEffect, useState } from 'react';
import './App.css'

function codigoClase() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("")
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    let result = await fetch("https://playground.4geeks.com/todo/users/test111");
    let data = await result.json();
    setState(data.todos)
  }
  const postTodos = async () => {
    await fetch("https://playground.4geeks.com/todo/todos/test111", {
      method: "POST",
      body: JSON.stringify(
        {
          "label": "TAREA CREADA",
          "is_done": false
        }
      ),
      headers: { "Content-type": "application/json"}
    });
  }
   const putTodos = async () => {
    await fetch("https://playground.4geeks.com/todo/todos/148", {
      method: "PUT",
      body: JSON.stringify(
        {
          "label": "TAREA ACTUALIZADA",
          "is_done": true
        }
      ),
      headers: { "Content-type": "application/json"}
    })
  }
  const deleteTodos = async () => {
    await fetch("https://playground.4geeks.com/todo/todos/146", {
      method: "DELETE",
    });
  }
  return (
    <main>
      <button onClick={()=> postTodos()}>
        subir tarea
      </button>
      <button onClick={()=> deleteTodos()}>
        ELIMINAR tarea
      </button>
       <button onClick={()=> putTodos()}>
        actualizar tarea
      </button>
    </main>
  )
}
export default App

