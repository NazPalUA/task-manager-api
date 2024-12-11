export interface Task {
  id: number;
  name: string;
  completed: boolean;
  createdAt: Date;
}

export interface CreateTaskDTO {
  name: string;
}

export interface UpdateTaskDTO {
  name?: string;
  completed?: boolean;
}