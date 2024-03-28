import { supabase } from '../../api/config.ts';
import { TodoListTypes } from '../type/collection.ts';

export type TaskProps = {
  id: string;
  task_name: string;
  tag: string;
  when: string;
  priority: string;
  date: string;
  keyTr: number;
  onEdit: () => void;
  onDelete: () => void;
  todo: TodoListTypes;
  // onTodoToggle: (id: number, checked: boolean) => void;
} ;

const today = new Date();
const yesterday = today.setDate(today.getDate() - 1);

export function capitalize(str:string) {
  let split = str.split(' ');
  let capitArr = [];
  for (let word of split) {
    capitArr.push(word[0].toUpperCase()+word.slice(1));
  }
  let capit = capitArr.join(' ');

  return capit;

}

export default function Task({
  id,
  task_name,
  tag,
  when,
  priority,
  date,
  keyTr,
  onEdit,
  onDelete,
  todo, 
  // onTodoToggle
}: TaskProps) {
  const handleCheckboxClick = async (id: string) => {
    const { data, error } = await supabase
        .from('todolist')
        .update({
          checked: !todo.checked
        })
        .eq('id', id)
        .select()
      if (error) console.log(error.message)
      console.log(data)
      window.location.reload();
  };


  return (
    <tr key={keyTr} id = {id} className={todo.checked ? 'seleccionada' : ''} >
      <td><input type='checkbox' defaultChecked={todo.checked} onClick={() => handleCheckboxClick(todo.id)} /></td>
      {/* <td><input type='checkbox' checked={isChecked} onChange={handleCrossText} onClick={() => handleCheckboxClick(todo.id)} /></td> */}
      <th>{capitalize(task_name)}</th>
      <th>{capitalize(tag)}</th>
      <th>{when}</th>      
      <th>{priority}</th>
      <th className={new Date(date) < new Date(yesterday) ? 'expirada' : ''}>{date}</th>
      <th><button onClick={onEdit}>Edit</button></th>
      <th><button onClick={onDelete}>Delete</button></th>
    </tr>
  );
}


// }: TaskProps) {
//   return (
//     <tr id = {id.toString()} className={isChecked ? 'seleccionada' : ''}>
//       <td><input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} /></td>
//       <th>{taskName}</th>
//       <th className={classes.StatusYellow}>{status}</th>
//       <th>{tag}</th>
//       <th className={new Date(date) < new Date() ? 'expirada' : ''}>{date}</th>
//       <th><button onClick={handleStartNewTask}><i className="fas fa-edit"></i></button></th>
//       <th><button><i className="fas fa-trash"></i></button></th>
//     </tr>
//   );
// }