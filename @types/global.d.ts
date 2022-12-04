import internal from 'stream'

type Status = 'todo' | 'progress' | 'done'

type Task = {
  id: number
  content: string
  status: Status
}
