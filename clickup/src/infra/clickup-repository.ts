import axios from "axios";
import type { ClickupRepository } from "../domain/clickup.js";
import type {
  GetCustomFieldsOutput,
  GetTaskByCustomIdOutput,
  GetTaskCommentsOutput,
} from "../types/api-responses.js";

export class ClickupApiRepository implements ClickupRepository {
  private readonly baseUrl = "https://api.clickup.com/api";
  private readonly teamId: string;
  private readonly apiKey: string;

  constructor(apiKey: string, teamId: string) {
    this.apiKey = apiKey;
    this.teamId = teamId;
  }

  async getTaskByCustomId(
    customId: string,
  ): Promise<GetTaskByCustomIdOutput | null> {
    try {
      const { data } = await axios.get<GetTaskByCustomIdOutput>(
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

      return data;
    } catch (error) {
      console.error(`Error fetching clickup task ${customId}:`, error);
      return null;
    }
  }

  async getTaskCustomFields(listId: string) {
    try {
      const { data } = await axios.get<GetCustomFieldsOutput>(
        `${this.baseUrl}/v2/list/${listId}/field`,
        {
          headers: {
            Authorization: this.apiKey,
          },
        },
      );

      return data;
    } catch (error) {
      console.error("Error fetching clickup custom fields:", error);
      return null;
    }
  }

  async getTaskComments(customTaskId: string) {
    try {
      const { data } = await axios.get<GetTaskCommentsOutput>(
        `${this.baseUrl}/v2/task/${customTaskId}/comment`,
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

      return data;
    } catch (error) {
      console.error("Error fetching clickup task comments:", error);
      return null;
    }
  }
}
