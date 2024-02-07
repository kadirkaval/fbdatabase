import { useEffect, useState } from "react";
import "./App.css";
import { ref, set, onValue,off } from "firebase/database";
import { db } from "./firebase";

function App() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const qr = "1002";

  //create data
  function writeUserData() {
    let date = new Date();
    let d = date.getTime();

    set(ref(db, `${qr}/` + d), {
      //qr,
      todo: todo,
      //icerik: "icerik",
      date: d,
    });
    setTodo("");
  }

  // read data
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = [];
        for (const key in data) {
          const taskValues = Object.values(data[key]);
          if (taskValues.length > 0) {
            const maxDateTask = taskValues.reduce((maxDateTask, currentTask) => {
              return currentTask.date > maxDateTask.date ? currentTask : maxDateTask;
            });
            tasksArray.push(maxDateTask);
          }
        }
        setTasks(tasksArray.reverse());
      } else {
        setTasks([]);
      }
    });
  
    // Cleanup function
    return () => off(ref(db));
  
  }, []);
  return (
    <div className="w-96 shadow-lg m-4 p-4 mx-auto">
    <h1 className="text-2xl underline">Todo Listesi</h1>
    <div className="flex items-center border-b border-teal-500 py-2">
    <input 
    value={todo}
    onChange={(e)=>setTodo(e.target.value)}
    className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" aria-label="Full name"/>
    <button 
    onClick={writeUserData}
    className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
      ADD
    </button>
    
  </div>
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className="p-1 border text-xl rounded bg-gray-200 mb-1">
          <h3>{task.todo}</h3>
          <p className="text-sm">{new Date(task.date).toLocaleString()}</p>
          
        </li>
      ))}
    </ul>
  </div>
  );
}

export default App;
