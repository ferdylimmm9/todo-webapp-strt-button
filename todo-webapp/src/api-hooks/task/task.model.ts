export type TaskModel = {
  created_at: string;
  description: string;
  id: number;
  is_complete: boolean;
  name: string;
  position: number;
  user_id: number;
};

export type GetTasksRequest = {
  is_complete?: boolean;
  sort?: "is_complete%20ASC" | "is_complete%20DESC" | "id%20ASC" | "id%20DESC";
};

export type GetTasksResponse = {
  data: TaskModel[];
  meta: {
    limit: number;
    offset: 0;
    total: 0;
  };
};

export type GetTaskResponse = TaskModel;

export type CreateTaskRequest = { name: string; description: string };

export type CreateTaskResponse = TaskModel;

export type UpdateTaskRequest = {
  name: string;
  description: string;
  is_complete: boolean;
};

export type UpdateTaskResponse = TaskModel;

export type DeleteTaskResponse = { message: string };
