import { /*FormEvent,*/ useEffect, useRef } from 'react';
import { useState, ChangeEvent  } from 'react';

import Modal, { ModalHandle } from '../UI/Modal.tsx';
import Input from '../UI/Input.tsx';
import {TaskProps} from '../pages/Body.tsx'
import { supabase } from '../../api/config.ts';
import { TodoListTypes } from '../type/collection.ts';

type NewTaskProps = {
  onDone: () => void; // onDone will "tell" the parent component that the BookSession component should be removed from the DOM
  // onAdd: (data: TaskProps) => void;
  selectedTodo: TodoListTypes | null;
};

// const optionsWhen = ['Today', 'Tomorrow', 'This Week', 'This Month','Later'];
// const optionsPriority = ['Very High', 'High', 'Medium', 'Low','Very Low'];

const initialState = {
  checked: false,
  date: '',
  priority: '',
  when: '',
  tag: '',
  task_name: ''
}

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export default function ModalNewTask({/*task, onAdd,*/ onDone, selectedTodo }: NewTaskProps) {
  const modal = useRef<ModalHandle>(null);
  // useEffect is used to open the Modal via its exposed `open` method when the component is mounted
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);
  
  const [newTask, setNewTask] = useState<TaskProps>(initialState)

  useEffect(() => {
    // Si hay una tarea seleccionada para editar, establecer sus valores en los campos del formulario
    if (selectedTodo) {
      setNewTask(selectedTodo);
    }
  }, [selectedTodo]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setNewTask({
      ...newTask,
      [name]: value
    })
  }
  
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []) 

  let userID: string;
  if (session) {
    const { user } = session
    userID = user.id
  }

  const taskToAdd: TodoListTypes = {
    checked: false,
    date: newTask.date,
    priority: newTask.priority,
    when: newTask.when,
    tag: newTask.tag,
    task_name: newTask.task_name,
    id: generateUUID(),
    user_id: userID || '0000-0000-0000-0000-000000000000'
  }
  // console.log(taskToAdd);
  const handleAddTodo = async () => {
    if (newTask.task_name.trim() === '' || newTask.tag.trim() === '' || newTask.date.trim() === '' ) {
      alert('Complete all fields!')
    } else {
      const { /*data: todo,*/ error } = await supabase
        .from('todolist')
        .insert([taskToAdd])
        .single()
      if (error) console.log(error.message)
      else {
        setNewTask(initialState)
      }
    } 
    window.location.reload();
  };

  const handleEditTodo = async () => {
    if (newTask.task_name.trim() === '' || newTask.tag.trim() === '' || newTask.date.trim() === '' ) {
      alert('Complete all fields!')
    } else {
      const { /*data,*/ error } = await supabase
        .from('todolist')
        .update({
          date: newTask.date,
          priority: newTask.priority,
          when: newTask.when,
          tag: newTask.tag,
          task_name: newTask.task_name,
        })
        .eq('id', selectedTodo.id)
        .select()
      if (error) console.log(error.message)
      else {
        setNewTask(initialState)
      }
    } 
    window.location.reload();
  };

  let buttonAction;

  if (selectedTodo) {
    buttonAction = <button onClick={handleEditTodo}>Edit Task</button>
  } else {
    buttonAction = <button onClick={handleAddTodo}>Add Task</button>
  }

  return (
    <Modal ref={modal} onClose={onDone}>
      <h2>{selectedTodo ? 'Edit Task' : 'Add New Task'}</h2>
      {/* <h2>Add New Task</h2> */}
      <div>
      {/* <span className="close" onClick={onDone}>&times;</span> */}
        <Input label="Add New Task" id="task_name" name="task_name" type="text" value={newTask.task_name} onChange={handleInputChange} placeholder="Ingrese la nueva tarea" />
        <Input label="Tag" id="tag" name="tag" type="text" value={newTask.tag} onChange={handleInputChange} />
        {/* <Select label="When" options={optionsWhen} onChange={handleInputChange} value={when} />
        <Select label="Priority" options={optionsPriority} onChange={handleInputChange} value={priority} /> */}
        <Input label="When" id="when" name="when" type="text" value={newTask.when} onChange={handleInputChange} />
        <Input label="Priority" id="priority" name="priority" type="text" value={newTask.priority} onChange={handleInputChange} />
        <Input label="Date" id="date" name="date" type="date" value={newTask.date} onChange={handleInputChange} />
        <p className="actions">
          <button onClick={onDone} className='buttonCancel'>
            Cancel
          </button> 
          {/* <button onClick={handleAddTodo}>Add Task</button> */}
          {/* <button onClick={handleAddTodo}>{selectedTodo ? 'Confirm' : 'Add Task'}</button> */}
          {buttonAction}
        </p>
      </div>
    </Modal>
  );
}