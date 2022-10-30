type Props = {
  buttonText?: string
  nextStatus?: Status
  onClickChangeStatus?: (nextStatus: Status, index: number) => void
  index: number
}

export const TaskButtons = ({
  buttonText,
  nextStatus,
  onClickChangeStatus,
  index,
}: Props) => {
  return (
    <>
      {nextStatus && onClickChangeStatus && (
        <button onClick={() => onClickChangeStatus(nextStatus, index)}>
          {buttonText}
        </button>
      )}
    </>
  )
}
