import { useEffect , useState} from "react";
//userEffect is used to make api calls from the frontend to the backend
  //useState is used to store the data

export default function App() {
  const[message, setMessage] = useState("");

  useEffect(() =>{
    async function getTodos(){ //@async keyword used to make the function asynchronous
      const response = await fetch("/api/todo"); //fetching the data
        //no need to put the link because proxy is doing the work

//@ await keyword is used to wait for the data to be fetched (blocked)
      const todos = await response.json(); //storing data in json format
      // console.log(todos); //printing the data
      setMessage(todos.mssg); //storing the data in the message
        //mssg is from the todo-routes.js
    }
    getTodos(); //$calling the function
  }, []);
  //empty array means it runs one time 

  return (
    <main className="container">
      <h1>To-DO app </h1>
      <p>{message}</p> {/*displaying the useState data */}
      
    </main>
  );
}
