import { useEffect, useState } from "react";
// useEffect is used to make api calls from the frontend to the backend
// useState is used to store the data

export default function App() {
const [todos, setTodos] = useState([]);

useEffect(() => {
async function getTodos() { // @async keyword used to make the function asynchronous
    const response = await fetch("/api/todo"); // fetching the data
    // no need to put the link because proxy is doing the work

    // @await keyword is used to wait for the data to be fetched (blocked)
    const data = await response.json(); // storing data in json format
    // console.log(data); // printing the data
    if (Array.isArray(data)) { // check if data is an array
    setTodos(data); // storing the data in the todos
    // todos is from the todo-routes.js
    }
}
getTodos(); // $calling the function
}, []);
// empty array means it runs one time 

return (
  <main className="container">
    <h1 className="title">To-DO app</h1>
    <div className="todo">
      {todos.length > 0 && 
      todos.map((todo) => (
        <div key={todo._id}>
          <p>{todo.title}</p>
          <div>
            <button>
              {todo.completed ? "✅" : "❌"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </main>
);
}