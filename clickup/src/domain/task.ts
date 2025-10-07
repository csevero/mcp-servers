export interface Task {
  customId: string;
  name: string;
  description: string;
  attachments: any[];
}

export interface TaskRepository {
  getByCustomId(customId: string): Promise<Task | null>;
}