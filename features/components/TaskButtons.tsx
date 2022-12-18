import { Status } from '../../@types/global'

type Props = {
  buttonText?: string
  nextStatus?: Status
  onClickChangeStatus?: (nextStatus: Status, index: number) => void
  onClickDelete: (index: number) => void
  index: number
}

export const TaskButtons = ({
  buttonText,
  nextStatus,
  onClickChangeStatus,
  onClickDelete,
  index,
}: Props) => {
  return (
    <>
      {nextStatus && onClickChangeStatus && (
        <button onClick={() => onClickChangeStatus(nextStatus, index)}>
          {buttonText}
        </button>
      )}
      <button onClick={() => onClickDelete(index)}>削除</button>
    </>
  )
}
