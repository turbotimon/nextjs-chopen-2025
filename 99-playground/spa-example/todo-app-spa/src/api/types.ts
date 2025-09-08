export interface ToDo {
  id: number | null;
  title: string;
  completed: boolean;
}

export interface ToDosGetResponse {
  result: ToDo[];
}

export interface ToDoPostResponse {
  result: ToDo;
}
