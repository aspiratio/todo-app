import { Tasks } from '../features/components/Tasks'

export default function Home() {
  const tasks = ['aaa', 'bbb', 'ccc']
  return (
    <div>
      <h1>TODO APP</h1>
      <h2>タスク</h2>
      <Tasks tasks={tasks} />
      <h2>進行中</h2>
      <Tasks tasks={tasks} />
      <h2>完了</h2>
      <Tasks tasks={tasks} />
    </div>
  )
}
