import axios from 'axios'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { TasksView } from '../features/components/TasksView'

const Home: NextPage = () => {
  const [newTaskContent, setNewTaskContent] = useState<string>('')
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [result, setResult] = useState<String>('')

  const onChangeNewTask = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(event.target.value)
  }

  const onClickAddTask = async (newTaskContent: string) => {
    setTasks([...tasks, { content: newTaskContent, status: 'todo' }])
    setNewTaskContent('')
    const res = await axios.post('http://127.0.0.1:5000/create', {
      body: JSON.stringify({ url: newTaskContent }),
    })
    setResult(res.data.url)
  }

  const onClickChangeStatus = (nextStatus: Status, index: number) => {
    const changedTask = { content: tasks[index].content, status: nextStatus }
    setTasks(tasks.map((task, i) => (i === index ? changedTask : task)))
  }

  const onClickDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1>TODO APP</h1>
      <input value={newTaskContent} onChange={onChangeNewTask} />
      <button onClick={() => onClickAddTask(newTaskContent)}>
        タスクを追加
      </button>
      <h2>未実施</h2>
      <TasksView
        tasks={tasks}
        stateToDisplay={'todo'}
        buttonText={'進行中へ'}
        nextStatus={'progress'}
        onClickChangeStatus={onClickChangeStatus}
        onClickDelete={onClickDelete}
      />
      <h2>進行中</h2>
      <TasksView
        tasks={tasks}
        stateToDisplay={'progress'}
        buttonText={'完了へ'}
        nextStatus={'done'}
        onClickChangeStatus={onClickChangeStatus}
        onClickDelete={onClickDelete}
      />
      <h2>完了</h2>
      <TasksView
        tasks={tasks}
        stateToDisplay={'done'}
        onClickDelete={onClickDelete}
      />
    </div>
  )
}

export default Home
