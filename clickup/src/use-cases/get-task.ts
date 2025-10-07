import type { Task, TaskRepository } from "../domain/task.js";

export class GetTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(customId: string): Promise<Task | null> {
    return await this.taskRepository.getByCustomId(customId);
  }

  formatTask(task: Task): string {
    return [
      `Custom ID: ${task.customId || "Não definido"}`,
      `Name: ${task.name || "Não definido"}`,
      `Descrição: ${task.description || "Não definido"}`,
      `Anexos: ${JSON.stringify(task.attachments || [])}`,
    ].join("\n");
  }
}