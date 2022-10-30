type Props = {
  tasks: Array<string>
}

export const Tasks = ({ tasks }: Props) => {
  return (
    <>
      {tasks.map((task, i) => (
        <li key={i}>{task}</li>
      ))}
    </>
  )
}
