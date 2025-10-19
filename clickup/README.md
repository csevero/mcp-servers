# ClickUp MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that enables AI assistants to interact with ClickUp tasks and projects.

## 🎯 What it does

This MCP server allows AI assistants like Claude to:

- **Retrieve tasks** by Custom ID (e.g., EXP-1234)
- **View task details** including name, description, status, attachments, and custom fields
- **Get task comments** with formatted output for easy reading
- **Access custom field details** for specific lists and fields
- **Access ClickUp data** securely through your API credentials

### 🚀 Coming Soon

Future versions will support:

- **Task commenting** - Add progress updates and notes
- **Status management** - Move tasks through workflow stages
- **Task creation** - Generate new tasks from conversations
- **Assignee management** - Distribute work across team members
- **Bulk operations** - Handle multiple tasks efficiently
- **Advanced filtering** - Search tasks by status, assignee, or date ranges

## 🚀 Installation & Usage

### Quick Start

Using Claude Code with the `mcp add` command (recommended):

```bash
claude mcp add clickup --env CLICKUP_API_KEY=your_api_key_here \
  --env CLICKUP_TEAM_ID=your_team_id_here \
  -- npx @csevero/mcp-clickup
```

### Configuration

Before using the server, you need to set up your ClickUp API credentials:

1. **Get your ClickUp API Key**:

   - Go to ClickUp Settings → Apps
   - Generate a new API token

2. **Find your Team ID**:

   - Go to your ClickUp workspace
   - The Team ID is in the URL: `https://app.clickup.com/{TEAM_ID}/`

3. **Set environment variables**:

```bash
# Create a .env file or set environment variables
export CLICKUP_API_KEY="your_api_key_here"
export CLICKUP_TEAM_ID="your_team_id_here"
```

### Claude Desktop Integration

#### Option 1: Claude Code `mcp add` Command (Easiest)

If you're using Claude Code, simply run:

```bash
claude mcp add clickup --env CLICKUP_API_KEY=your_api_key_here \
  --env CLICKUP_TEAM_ID=your_team_id_here \
  -- npx @csevero/mcp-clickup
```

This automatically configures the MCP server for you.

#### Option 2: Manual Configuration

Add this to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "clickup": {
      "command": "npx",
      "args": ["@csevero/mcp-clickup"],
      "env": {
        "CLICKUP_API_KEY": "your_api_key_here",
        "CLICKUP_TEAM_ID": "your_team_id_here"
      }
    }
  }
}
```

#### Alternative: Command Line Arguments

You can also pass configuration via command line arguments:

```json
{
  "mcpServers": {
    "clickup": {
      "command": "npx",
      "args": [
        "@csevero/mcp-clickup",
        "--api-key",
        "your_api_key_here",
        "--team-id",
        "your_team_id_here"
      ]
    }
  }
}
```

#### Local Development Configuration

For local development, use the built version:

```json
{
  "mcpServers": {
    "clickup": {
      "command": "node",
      "args": [
        "/path/to/your/clickup/build/index.js",
        "--api-key",
        "your_api_key_here",
        "--team-id",
        "your_team_id_here"
      ]
    }
  }
}
```

## 📖 Usage Examples

### Basic Task Retrieval

```
Ask Claude: "Get me the details for task EXP-1234"
```

Claude will use the ClickUp MCP server to fetch and display:

- Custom ID
- Task name
- Description
- Status and priority
- Assignees and watchers
- Custom fields
- Attachments

### Task Comments Retrieval

```
Ask Claude: "Show me all comments for task EXP-1234"
```

Claude will retrieve and format all task comments with:

- Comment author and timestamp
- Formatted comment text
- Reply counts
- Support for rich content (images, links, mentions)

### Custom Field Details

```
Ask Claude: "Is the field 'custom' filled on task EXP-123?"
```

Claude will first get the task details to retrieve the custom fields and list ID, then return the complete custom field configuration including:

- Field name and type
- Current value
- Configuration options
- Validation rules
- Default values

### Example Response

```
Custom ID: EXP-1234
Name: Implement user authentication
Description: Add OAuth2 login with Google and GitHub providers
Status: In Progress
Assignees: john.doe@company.com
Attachments: []
Custom Fields: Priority: High, Sprint: Sprint 23
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- TypeScript
- ClickUp API access

### Local Development

```bash
# Clone the repository
git clone https://github.com/csevero/mcp-servers
cd mcp-servers/clickup

# Install dependencies
npm install

# Build the project
npm run build

# Run locally
node build/index.js
```

### Project Structure

```
clickup/
├── src/
│   ├── config/             # Configuration management
│   │   ├── cli-parser.ts   # Command line argument parsing
│   │   └── app-config.ts   # Configuration validation and loading
│   ├── server/             # MCP server setup
│   │   ├── mcp-server.ts   # Server creation and tool registration
│   │   └── transport.ts    # Transport layer management
│   ├── domain/             # Business entities and interfaces
│   │   └── clickup.ts      # ClickUp repository interface
│   ├── use-cases/          # Business logic
│   │   ├── get-task.ts     # Get task use case
│   │   ├── get-task-comments.ts # Get task comments use case
│   │   ├── get-task-custom-field-detail.ts # Get custom field details
│   │   └── index.ts        # Use cases exports
│   ├── infra/              # Infrastructure layer
│   │   └── clickup-repository.ts # ClickUp API implementation
│   ├── types/              # Type definitions
│   │   ├── api-responses.ts # ClickUp API response types
│   │   └── entities.ts     # Core entity definitions
│   └── index.ts            # Application entry point
├── package.json
└── README.md
```

### Architecture

This project follows **Clean Architecture** principles with **separated responsibilities**:

- **Configuration Layer** (`src/config/`): CLI parsing, validation, and configuration management
- **Server Layer** (`src/server/`): MCP server setup, tool registration, and transport management
- **Domain Layer** (`src/domain/`): Core business logic and entities
- **Use Cases** (`src/use-cases/`): Application-specific business rules
- **Infrastructure** (`src/infra/`): External concerns (ClickUp API, HTTP client)
- **Types** (`src/types/`): Type definitions and interfaces
- **Entry Point** (`src/index.ts`): Minimal orchestration of all layers

### Extensibility Design

The architecture is designed for easy extension with new ClickUp API features:

#### 🔧 Adding New Tools

1. **Repository Pattern**: All ClickUp API interactions go through the `ClickupRepository` interface
2. **Use Case Pattern**: Business logic is isolated in dedicated use case classes
3. **Type Safety**: Comprehensive TypeScript types in `src/types/` ensure API contracts are maintained
4. **MCP Integration**: Tools are registered in `src/server/mcp-server.ts`
5. **Clean Architecture**: Separation of concerns between domain, use cases, and infrastructure layers

#### 🏗️ Scalability Considerations

- **Modular Structure**: Each feature can be developed independently
- **Dependency Injection**: Easy to test and mock external dependencies
- **Error Boundaries**: Consistent error handling across all API operations
- **Configuration Management**: Centralized config supports multiple API keys/teams

#### 🔄 Future Architecture Enhancements

- **Caching Layer**: Redis/memory cache for frequently accessed tasks
- **Rate Limiting**: Built-in ClickUp API rate limit management
- **Webhook Support**: Real-time notifications from ClickUp
- **Bulk Operations**: Batch processing for multiple task operations

## 📋 Available Tools

### Current Tools

#### `getTaskByCustomId`

Retrieves a ClickUp task by its Custom ID.

**Parameters:**

- `taskCustomId` (string): The Custom ID of the task (e.g., "EXP-1234")

**Returns:**

- Complete task details including name, description, status, assignees, custom fields, and attachments
- Error message if task not found

#### `getTaskComments`

Retrieves all comments from a ClickUp task, formatted for easy reading.

**Parameters:**

- `taskCustomId` (string): The Custom ID of the task (e.g., "EXP-1234")

**Returns:**

- Formatted list of all task comments with user information, timestamps, and content
- Support for rich content including images, links, and user mentions
- Reply counts for each comment
- "No comments found" message if task has no comments

#### `getTaskCustomFieldDetail`

Retrieves detailed information about a specific custom field in a list.

**Parameters:**

- `listId` (string): The ID of the list containing the custom field (e.g., "123123123")
- `customFieldId` (string): The UUID of the custom field (e.g., "3b3d716d-a4a4-44ee-8eb1-1a08453f29eb")

**Returns:**

- Complete custom field configuration including name, type, options, and validation rules
- Error message if custom field not found

### 🚧 Planned Tools (Coming Soon)

The following tools are planned for future releases to provide comprehensive ClickUp integration:

#### `addTaskComment`

Add comments to ClickUp tasks.

- **Parameters**: `customId`, `comment`, `assignee` (optional)
- **Use case**: AI assistants can add progress updates, notes, or follow-up comments

#### `updateTaskStatus`

Update the status of ClickUp tasks.

- **Parameters**: `customId`, `status`
- **Use case**: AI assistants can move tasks through workflow stages

#### `createTask`

Create new ClickUp tasks.

- **Parameters**: `name`, `description`, `listId`, `priority` (optional), `assignee` (optional)
- **Use case**: AI assistants can create tasks from conversations or requirements

#### `getTasksByStatus`

Retrieve tasks filtered by status.

- **Parameters**: `status`, `listId` (optional)
- **Use case**: AI-powered status reports and task management dashboards

### CLI Options

The server supports the following command line options:

- `--api-key <key>`: ClickUp API key (alternative to `CLICKUP_API_KEY` env var)
- `--team-id <id>`: ClickUp team ID (alternative to `CLICKUP_TEAM_ID` env var)
- `--help`: Show usage information

**Example:**

```bash
node build/index.js --api-key pk_123... --team-id 12345
```

## 🔒 Security

- **API credentials** are loaded from environment variables
- **No sensitive data** is logged or exposed
- **Read-only access** to ClickUp data
- **Standard HTTPS** communication with ClickUp API

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Reporting Issues

- **Bug reports**: Include steps to reproduce, expected vs actual behavior
- **Feature requests**: Describe the use case and proposed solution
- **Questions**: Use GitHub Discussions for general questions

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the existing architecture patterns**
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Submit a Pull Request**

### Development Guidelines

- **Clean Architecture**: Follow the existing layered approach
- **TypeScript**: Use proper typing throughout
- **Error Handling**: Include comprehensive error handling
- **Documentation**: Update README and code comments
- **Testing**: Add unit tests for new features

### Adding New API Tools

When implementing new ClickUp API tools, follow these patterns:

1. **Domain Layer**: Update the `ClickupRepository` interface in `src/domain/clickup.ts` if needed
2. **Types**: Add new entity types to `src/types/entities.ts` and API response types to `src/types/api-responses.ts`
3. **Use Cases**: Create new use case files in `src/use-cases/` for business logic
4. **Repository**: Extend `src/infra/clickup-repository.ts` with new API methods
5. **Export**: Add new use cases to `src/use-cases/index.ts`
6. **MCP Registration**: Register new tools in `src/server/mcp-server.ts`

### Code Style

- Use **ESLint** and **Prettier** configurations
- Follow **conventional commit** messages
- Keep **functions small** and focused
- Use **meaningful variable names**
- Add **JSDoc comments** for public APIs

## 📄 License

MIT License - see [LICENSE](../LICENSE) file for details.

## 🔗 Links

- **MCP Protocol**: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)
- **ClickUp API**: [https://clickup.com/api](https://clickup.com/api)
- **Claude Desktop**: [https://claude.ai/](https://claude.ai/)
- **Repository**: [https://github.com/csevero/mcp-servers](https://github.com/csevero/mcp-servers)

---

**Questions?** Open an issue or start a discussion in the main repository!
