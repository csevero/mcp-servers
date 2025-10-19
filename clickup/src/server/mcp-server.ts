import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  GetCustomFieldDetailUseCase,
  GetTaskUseCase,
  GetTaskCommentsUseCase,
} from "../use-cases/index.js";
import type { ClickupConfig } from "../config/app-config.js";
import { ClickupApiRepository } from "../infra/clickup-repository.js";

export function createMcpServer(config: ClickupConfig): McpServer {
  const server = new McpServer({
    name: "clickup",
    version: "1.0.0",
  });

  const clickupApiRepository = new ClickupApiRepository(
    config.apiKey,
    config.teamId,
  );

  registerTools(server, clickupApiRepository);

  return server;
}

function registerTools(
  server: McpServer,
  clickupApiRepository: ClickupApiRepository,
): void {
  server.tool(
    "getTaskByCustomId",
    "Search a task by ID or Custom ID",
    {
      taskCustomId: z
        .string()
        .describe("Task Custom ID to be search, ex: EXP-1234"),
    },
    async ({ taskCustomId }) => {
      const getTaskUseCase = new GetTaskUseCase(clickupApiRepository);

      const task = await getTaskUseCase.execute(taskCustomId);

      if (!task) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to get task on clickup",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: task,
          },
        ],
      };
    },
  );

  server.tool(
    "getTaskCustomFieldDetail",
    "Search a task custom field detail by List ID and Custom Field ID",
    {
      listId: z.string().describe('List id that task is in, ex: "123123123"'),
      customFieldId: z
        .string()
        .uuid()
        .describe(
          'Task Custom Field id, ex: "3b3d716d-a4a4-44ee-8eb1-1a08453f29eb"',
        ),
    },
    async ({ listId, customFieldId }) => {
      const getCustomFieldDetailUseCase = new GetCustomFieldDetailUseCase(
        clickupApiRepository,
      );

      const customField = await getCustomFieldDetailUseCase.execute(
        listId,
        customFieldId,
      );

      if (!customField) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to get or find custom field on clickup",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: customField,
          },
        ],
      };
    },
  );

  server.tool(
    "getTaskComments",
    "Get task comments by Task ID or Custom ID, formatted for easy reading",
    {
      taskCustomId: z
        .string()
        .describe("Task ID or Custom ID to get comments for, ex: EXP-1234"),
    },
    async ({ taskCustomId }) => {
      const getTaskCommentsUseCase = new GetTaskCommentsUseCase(
        clickupApiRepository,
      );

      const comments = await getTaskCommentsUseCase.execute(taskCustomId);

      if (!comments) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to get task comments from ClickUp",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: comments,
          },
        ],
      };
    },
  );
}
