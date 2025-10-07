#!/usr/bin/env node
import {
  loadConfiguration,
  validateConfiguration,
} from "./config/app-config.js";
import { createMcpServer } from "./server/mcp-server.js";
import { connectServer } from "./server/transport.js";

async function main(): Promise<void> {
  try {
    const config = loadConfiguration();
    validateConfiguration(config);

    const server = createMcpServer(config);
    await connectServer(server);
  } catch (error) {
    console.error("Fatal error in main():", error);
    process.exit(1);
  }
}

main();
