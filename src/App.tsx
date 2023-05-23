import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Header } from './components/Header'
import clipboard from '../src/img/Clipboard.svg'
import styles from './App.module.css'
import './global.css'
import { Activities } from './components/Activities';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface NewTask {
  textInput: string;
  id: string;
  completed: boolean;
}
export interface IdProps {
  id: string;
}

function App() {
  const [textInput, setTextInput] = useState('')
  const [newTask, setNewTask] = useState<NewTask[]>([])
  const [lengthTask, setLengthTask] = useState<IdProps[]>([])
  const [completedTask, setCompletedTask] = useState<NewTask[]>([])

  function handleNewTask() {
    if (!textInput) {
      return
    }
    const newId = uuidv4();
    setNewTask([...newTask, { textInput, id: newId, completed: false }])
    setTextInput('')
    setLengthTask([...lengthTask, { id: newId }])
  }

  function handleDelete(id: string, completed: boolean) {
    if (completed === true) {
      const verifyCompletedId = completedTask.filter(task => task.id !== id)
      const idTask = lengthTask.filter(task => task.id !== id)


      if (idTask.length === 0) {
        setLengthTask([])
      }

      setLengthTask(idTask)
      setCompletedTask(verifyCompletedId)
    }

    if (completed === false) {
      const verifyNewId = newTask.filter(task => task.id !== id)
      const idTask = lengthTask.filter(task => task.id !== id)

      if (idTask.length === 0) {
        setLengthTask([])
      }

      setLengthTask(idTask)
      setNewTask(verifyNewId)
    }
  }

  function handleTaskCompleted(id: string) {
    const taskToComplete = newTask.find(task => task.id === id);
    const taskToUncomplete = completedTask.find(task => task.id === id);

    if (taskToComplete?.completed === false) {
      const completedTaskToAdd = { ...taskToComplete, completed: true };
      setCompletedTask([...completedTask, completedTaskToAdd]);
      setNewTask(newTask.filter(task => task.id !== id));
    } else if (taskToUncomplete) {
      const completedTaskToAdd = { ...taskToUncomplete, completed: false };
      setNewTask([...newTask, completedTaskToAdd]);
      setCompletedTask(completedTask.filter(task => task.id !== id));
    }

  }

  return (
    <div className={styles.app} >
      <Header />
      <div className={styles.section}>

        <div className={styles.task}>
          <input value={textInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextInput(e.target.value)} type="text" placeholder='Adicione uma nova tarefa' />
          <button onClick={handleNewTask}>Criar <AiOutlinePlusCircle /></button>
        </div>
        <div className={styles.sectionTasks}>
          <div className={styles.text}>
            <h4>Tarefas criadas <span>{lengthTask.length}</span></h4>
            <h5>Concluídas  <span>{completedTask.length}  de  {lengthTask.length}</span></h5>
          </div>
          <div className={styles.activities}>



            {
              newTask.length !== 0 ||
                completedTask.length !== 0 ?
                (<>
                  {newTask.map((item: { textInput: string; id: string; completed: boolean; }) =>
                    <Activities key={item.id} textInput={item.textInput} id={item.id} handleDelete={() => handleDelete(item.id, item.completed)} handleTaskCompleted={() => handleTaskCompleted(item.id)} completed={item.completed} />
                  )}


                  {completedTask.map((item: { textInput: string; id: string; completed: boolean; }) =>
                    <Activities key={item.id} textInput={item.textInput} id={item.id} handleDelete={() => handleDelete(item.id, item.completed)} handleTaskCompleted={() => handleTaskCompleted(item.id)} completed={item.completed} />
                  )}
                </>)
                :
                (<div className={styles.list}>
                  <img src={clipboard} alt="caderno" />
                  <h1>Você ainda não tem tarefas cadastradas</h1>
                  <h2>Crie tarefas e organize seus itens a fazer</h2>
                </div>)
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
