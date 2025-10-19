export interface ClickupConfig {
  apiKey: string;
  teamId: string;
}

export function parseArguments(): ClickupConfig {
  const args = process.argv.slice(2);

  let apiKey = process.env.CLICKUP_API_KEY;
  let teamId = process.env.CLICKUP_TEAM_ID;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--api-key":
        if (i + 1 < args.length) {
          apiKey = args[++i];
        }
        break;
      case "--team-id":
        if (i + 1 < args.length) {
          teamId = args[++i];
        }
        break;
      case "--help":
        showHelp();
        process.exit(0);
        break;
    }
  }

  if (!apiKey || !teamId) {
    console.error(
      "Error: CLICKUP_API_KEY and CLICKUP_TEAM_ID must be provided via arguments or environment variables",
    );
    console.error("Use --help for usage information");
    process.exit(1);
  }

  return { apiKey, teamId };
}

function showHelp(): void {
  console.log(`
ClickUp MCP Server

Usage: mcp-clickup [options]

Options:
  --api-key <key>     ClickUp API key (can also use CLICKUP_API_KEY env var)
  --team-id <id>      ClickUp team ID (can also use CLICKUP_TEAM_ID env var)
  --help              Show this help message

Environment Variables:
  CLICKUP_API_KEY     ClickUp API key
  CLICKUP_TEAM_ID     ClickUp team ID

Example:
  mcp-clickup --api-key pk_123... --team-id 12345
  `);
}
