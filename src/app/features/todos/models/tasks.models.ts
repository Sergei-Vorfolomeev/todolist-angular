export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}
export interface Task {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: string
  deadline: string
  addedDate: string
  completed: boolean
}

export interface DomainTasks {
  [key: string]: Task[]
}
