import classes from './Body.module.css';
import ModalNewTask from '../Tasks/ModalNewTask.tsx';
import Task from '../Tasks/Task.tsx';

import { useEffect, useState } from "react";
import { supabase } from '../../api/config';
import { Button/*, Box, Flex, Heading, Text*/ } from '@chakra-ui/react'
import { TodoListTypes } from '../type/collection.ts';
import ModalDeleteTask from '../Tasks/ModalDeleteTask.tsx';

export type TaskProps = {
  task_name: string;
  tag: string;
  when: string;
  priority: string;
  date: string;
  checked: boolean;
};

export const logout = async () => {
  const result = await supabase.auth.signOut()
  return result
}


export default function Body () {
  const [isNewTask, setIsNewTask] = useState(false);
  const [isDeleteTask, setIsDeleteTask] = useState(false);
  const [todos, setTodos] = useState<Array<TodoListTypes>>([]);
  
  function handleStartNewTask() {
    setIsNewTask(true);
  }

  function handleStopNewTask() {
    setIsNewTask(false);
    setSelectedTodo(null);
  }

  const [selectedTodo, setSelectedTodo] = useState<TodoListTypes | null>(null); // Tarea seleccionada para editar

  const handleEditTodo = (todo: TodoListTypes) => {
    setSelectedTodo(todo);
    setIsNewTask(true); // Abrir el modal con la tarea seleccionada para editar
  };

  //DELETE TASK
  const [isDeleteNameTask, setIsDeleteNameTask] = useState('');
  const [isDeleteIdTask, setIsDeleteIdTask] = useState('');

  function handleStartDeleteTask(task_name: string, task_id: string) {
    setIsDeleteTask(true);
    // console.log(task_name)
    setIsDeleteNameTask(task_name);
    setIsDeleteIdTask(task_id);
  }

  function handleStopDeleteTask() {
    setIsDeleteTask(false);
  }

  // /////Opcion de Ordenar columnas////////////
  const [sortConfig, setSortConfig] = useState<{ key: keyof TaskProps; direction: string }>({ key: 'date', direction: '' });

  const sortBy = (key: keyof TaskProps) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTask = [...todos].sort((a, b) => {
    if (sortConfig.direction === 'desc') {
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return -1;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return 1;
      }
      return 0;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return -1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return 1;
      }
      return 0;
    }
  });

  const [session, setSession] = useState(null)

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session)
    // })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  let userID: string;
  if (session) {
    let { user } = session
    userID = user.id
  }
  // console.log(userID);
  // console.log(sortedTask);
  // console.log(sortedTask.map(task => task.user_id));
  // console.log(sortedTask.filter((task) => task.user_id === userID));

  const taskFilterId = sortedTask.filter((task) => task.user_id === userID);

  const completedTodos = taskFilterId.filter(todo => !todo.checked);
  const uncompletedTodos = taskFilterId.filter(todo => todo.checked);
  const pendingTasks = completedTodos.filter(todo => !todo.checked).length;


  const handleLogout = async () => await logout()

  useEffect(() => {
    fetchTodos()  
  }, [])

  const fetchTodos = async () => {
    const { data: list, error } = await supabase
      .from('todolist')
      .select('*')
    if (error) console.log('error', error)
    else setTodos(list);
  }

  // console.log(isDeleteToTask);

  return (
    <>
      {isNewTask && (
        <ModalNewTask onDone={handleStopNewTask} /*onAdd={()=>{console.log('boton add')}}*/ selectedTodo={selectedTodo} />
      )}
      {isDeleteTask && (
       <ModalDeleteTask onDone={handleStopDeleteTask} task_name={isDeleteNameTask} task_id={isDeleteIdTask}/>
      )}
      <article>
        <Button onClick={handleLogout}>Logout</Button>
        <p>Pending Tasks: {pendingTasks}  </p>
        <button onClick={handleStartNewTask} className={classes.buttonAddTask}>Add Task</button>
        <table >
            <thead className="head-table">
                <tr>
                    <th className={classes.widthTaskAction} >Check</th>
                    <th onClick={() => sortBy('task_name')} className={classes.widthTaskName}>Task Name</th>
                    <th onClick={() => sortBy('tag')} className="width-task-desc"><i className="fas fa-tag"></i> Tag</th>
                    <th onClick={() => sortBy('when')}>Status</th>
                    <th onClick={() => sortBy('priority')}>Priority</th>
                    <th onClick={() => sortBy('date')}>Dateline</th>
                    <th className={classes.widthTaskAction}>Edit</th>
                    <th className={classes.widthTaskAction}>Remove</th>
                </tr>
            </thead>
            <tbody>
              {completedTodos.map((todo, index) => (
                <Task 
                  key={todo.id}
                  keyTr={index}
                  {...todo}
                  onEdit={() => handleEditTodo(todo)}
                  onDelete={() =>handleStartDeleteTask(todo.task_name, todo.id)}
                  todo={todo} 
                />
              ))}
              {uncompletedTodos.map((todo, index) => (
                <Task 
                  key={todo.id}
                  keyTr={index}
                  {...todo}
                  onEdit={() => handleEditTodo(todo)}
                  onDelete={() =>handleStartDeleteTask(todo.task_name, todo.id)}
                  todo={todo} 
                />
              ))}
            </tbody>
        </table>
      </article>
    </>
  );
}