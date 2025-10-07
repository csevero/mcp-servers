import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { GetTaskUseCase } from "../use-cases/get-task.js";
import { ClickupTaskRepository } from "../infra/clickup-repository.js";
import type { ClickupConfig } from "../config/app-config.js";

export function createMcpServer(config: ClickupConfig): McpServer {
  const server = new McpServer({
    name: "clickup",
    version: "1.0.0",
  });

  const taskRepository = new ClickupTaskRepository(
    config.apiKey,
    config.teamId,
  );
  const getTaskUseCase = new GetTaskUseCase(taskRepository);

  registerTools(server, getTaskUseCase);

  return server;
}

function registerTools(
  server: McpServer,
  getTaskUseCase: GetTaskUseCase,
): void {
  server.tool(
    "getTaskByCustomId",
    "Search a task by Custom ID (ex: EXP-1234)",
    {
      customId: z
        .string()
        .describe("Task Custom ID to be search, ex: EXP-1234"),
    },
    async ({ customId }) => {
      const task = await getTaskUseCase.execute(customId);

      if (!task) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Failed to get task on clickup",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: getTaskUseCase.formatTask(task),
          },
        ],
      };
    },
  );
}
