import { /*FormEvent,*/ useEffect, useRef } from 'react';

import Modal, { ModalHandle } from '../UI/Modal.tsx';
import { supabase } from '../../api/config.ts';
import { capitalize } from './Task.tsx';

// import Button from '../UI/Button.tsx';
// import { useTasksContext } from '../store/store.tsx';

type NewTaskProps = {
  onDone: () => void; // onDone will "tell" the parent component that the BookSession component should be removed from the DOM
  // onDelete: (data: TaskProps) => void;
  task_name: string;
  task_id: string;
};


export default function ModalDeleteTask({onDone, task_name, task_id }: NewTaskProps) {
  const modal = useRef<ModalHandle>(null);
  // useEffect is used to open the Modal via its exposed `open` method when the component is mounted
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  const handleDeleteTodo = async () => {
    const { error } = await supabase
    .from('todolist')
    .delete()
    .eq('id', task_id)  
    
    if (error) console.log('error', error);
    window.location.reload();
  };

  return (
    <Modal ref={modal} onClose={onDone}>
      <h2>Are you sure you want to delete the task {capitalize(task_name)}?</h2>
      {/* <h3>{task_id}?</h3> */}
      {/* <h2>Add New Task</h2> */}
      <div>
        <p className="actions">
          <button onClick={onDone} className='buttonCancel'>
            Cancel
          </button> 
          {/* <button onClick={handleAddTodo}>Add Task</button> */}
          {/* <button onClick={handleAddTodo}>{selectedTodo ? 'Confirm' : 'Add Task'}</button> */}
          <button onClick={handleDeleteTodo}>Delete Task</button>
        </p>
      </div>
    </Modal>
  );
}