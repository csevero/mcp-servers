import type {
  GetCustomFieldsOutput,
  GetTaskByCustomIdOutput,
  GetTaskCommentsOutput,
} from "../types/api-responses.js";

export interface ClickupRepository {
  getTaskByCustomId(
    customTaskId: string,
  ): Promise<GetTaskByCustomIdOutput | null>;
  getTaskCustomFields(listId: string): Promise<GetCustomFieldsOutput | null>;
  getTaskComments(customTaskId: string): Promise<GetTaskCommentsOutput | null>;
}
