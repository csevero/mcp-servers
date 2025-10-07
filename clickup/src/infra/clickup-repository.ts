import axios from "axios";
import type { Task, TaskRepository } from "../domain/task.js";
import type { GetTaskByCustomIdResponse } from "../types/clickup.js";

export class ClickupTaskRepository implements TaskRepository {
  private readonly baseUrl = "https://api.clickup.com/api";
  private readonly teamId: string;
  private readonly apiKey: string;

  constructor(apiKey: string, teamId: string) {
    this.apiKey = apiKey;
    this.teamId = teamId;
  }

  async getByCustomId(customId: string): Promise<Task | null> {
    try {
      const { data } = await axios.get<GetTaskByCustomIdResponse>(
        `${this.baseUrl}/v2/task/${customId}`,
        {
          params: {
            custom_task_ids: true,
            team_id: this.teamId,
          },
          headers: {
            Authorization: this.apiKey,
          },
        },
      );

      return {
        customId: data.custom_id,
        name: data.name,
        description: data.description,
        attachments: data.attachments || [],
      };
    } catch (error) {
      console.error("Error fetching ClickUp task:", error);
      return null;
    }
  }
}
