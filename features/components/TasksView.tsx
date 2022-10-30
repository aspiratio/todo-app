type Props = {
  tasks: Array<Task>
  stateToDisplay: Status
}

export const TasksView = ({ tasks, stateToDisplay }: Props) => {
  return (
    <>
      {tasks.map(
        (task, i) =>
          task.status === stateToDisplay && <li key={i}>{task.content}</li>
      )}
    </>
  )
}
