import { useEffect, useState } from "react";
import './style.css'; // Import the CSS file

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("/api/todo");
      const data = await response.json();
      if (Array.isArray(data)) {
        setTodos(data);
      }
    }
    getTodos();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/todo/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleCreate = async () => {
    const response = await fetch("/api/todo", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    });
    const createdTodo = await response.json();
    setTodos([...todos, createdTodo]);
    setNewTodo({ title: "", completed: false });
  };

  const handleUpdate = async (id, updatedFields) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    });
    const updatedTodo = await response.json();
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <main className="container">
      <h1 className="title">To-DO app</h1>
      <div className="todo">
        {todos.length > 0 && 
        todos.map((todo) => (
          <div key={todo._id}>
            <div>
              <button onClick={() => handleUpdate(todo._id, { completed: !todo.completed })}>
                {todo.completed ? "✅" : "❌"}
              </button>
              <p>{todo.title}</p>
            </div>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="create-todo">
        <input 
          type="text" 
          value={newTodo.title} 
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })} 
          placeholder="New Todo Title" 
        />
        <button onClick={handleCreate}>Add Todo</button>
      </div>
    </main>
  );
}