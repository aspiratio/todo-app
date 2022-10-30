import { TaskButtons } from './TaskButtons'

type Props = {
  tasks: Array<Task>
  stateToDisplay: Status
  buttonText?: string
  nextStatus?: Status
  onClickChangeStatus?: (nextStatus: Status, index: number) => void
  onClickDelete: (index: number) => void
}

export const TasksView = ({
  tasks,
  stateToDisplay,
  buttonText,
  nextStatus,
  onClickChangeStatus,
  onClickDelete,
}: Props) => {
  return (
    <>
      {tasks.map(
        (task, i) =>
          task.status === stateToDisplay && (
            <li key={i}>
              <span>{task.content}</span>
              <TaskButtons
                nextStatus={nextStatus}
                buttonText={buttonText}
                onClickChangeStatus={onClickChangeStatus}
                onClickDelete={onClickDelete}
                index={i}
              />
            </li>
          )
      )}
    </>
  )
}
