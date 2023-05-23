import styles from './Activities.module.css'
import { RiDeleteBin6Line } from 'react-icons/ri'


export function Activities({ textInput, id, handleDelete, handleTaskCompleted, completed }: { textInput: string, id: string, handleDelete: (id: string) => void, handleTaskCompleted: (id: string) => void, completed: boolean }) {


  return (
    <div className={styles.activities}>
      <input defaultChecked={ completed === true ? true : false}  type="checkbox" id={String(id)} onClick={() => handleTaskCompleted(id)} />
      <label htmlFor={String(id)}></label>
      <p className={completed === true ? styles.completed : ''}>{textInput}</p>
      <button onClick={() => handleDelete(id)}> <RiDeleteBin6Line /></button>
    </div>
  )
}