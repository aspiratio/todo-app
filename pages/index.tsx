import { ChangeEvent, useState } from 'react'
import { TasksView } from '../features/components/TasksView'

export default function Home() {
  const [newTaskContent, setNewTaskContent] = useState<string>('')
  const [tasks, setTasks] = useState<Array<Task>>([])

  const onChangeNewTask = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskContent(event.target.value)
  }

  const onClickAddTask = (newTaskContent: string) => {
    setTasks([...tasks, { content: newTaskContent, status: 'todo' }])
    setNewTaskContent('')
  }

  const onClickChangeStatus = (nextStatus: Status, index: number) => {
    const changedTask = { content: tasks[index].content, status: nextStatus }
    setTasks(tasks.map((task, i) => (i === index ? changedTask : task)))
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
      />
      <h2>進行中</h2>
      <TasksView
        tasks={tasks}
        stateToDisplay={'progress'}
        buttonText={'完了へ'}
        nextStatus={'done'}
        onClickChangeStatus={onClickChangeStatus}
      />
      <h2>完了</h2>
      <TasksView tasks={tasks} stateToDisplay={'done'} />
    </div>
  )
}
