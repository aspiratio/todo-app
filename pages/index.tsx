import axios from 'axios'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { Status, Task } from '../@types/global'
import { TasksView } from '../features/components/TasksView'

const Home: NextPage = () => {
  const [newTaskContent, setNewTaskContent] = useState<string>('')
  const [tasks, setTasks] = useState<Array<Task>>([])

  const onChangeNewTask = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(event.target.value)
  }

  const onClickAddTask = async (newTaskContent: string) => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/create', {
        body: JSON.stringify({ content: newTaskContent, status: 'todo' }),
      })
      setTasks([
        ...tasks,
        { id: res.data.id, content: newTaskContent, status: 'todo' },
      ])
      setNewTaskContent('')
    } catch {
      alert('エラーが発生しました。もう一度お試しください')
    }
  }

  const onClickChangeStatus = async (nextStatus: Status, index: number) => {
    const changedTask = {
      id: tasks[index].id,
      content: tasks[index].content,
      status: nextStatus,
    }
    try {
      await axios.post('http://127.0.0.1:5000/update', {
        body: JSON.stringify(changedTask),
      })
      setTasks(tasks.map((task, i) => (i === index ? changedTask : task)))
    } catch {
      alert('エラーが発生しました。もう一度お試しください')
    }
  }

  const onClickDelete = async (index: number) => {
    const taskId = tasks[index].id
    try {
      await axios.delete(`http://127.0.0.1:5000/delete/${taskId}`)
      setTasks(tasks.filter((_, i) => i !== index))
    } catch {
      alert('エラーが発生しました。もう一度お試しください')
    }
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
