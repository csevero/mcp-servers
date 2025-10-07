import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export async function connectServer(server: McpServer): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ClickUp MCP Server running on stdio");
}

export function createStdioTransport(): StdioServerTransport {
  return new StdioServerTransport();
}