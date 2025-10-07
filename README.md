# MCP Servers Hub

A collection of [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers that can be easily installed and used with AI assistants like Claude.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI assistants to securely connect to external data sources and tools. These servers provide additional capabilities to AI models through a standardized interface.

## Available MCP Servers

### 🎯 ClickUp MCP Server

Access and manage your ClickUp tasks directly from your AI assistant.

- **Package**: `@csevero/mcp-clickup`
- **Install**: `npx @csevero/mcp-clickup`
- **Documentation**: [./clickup/README.md](./clickup/README.md)
- **Features**:
  - Retrieve tasks by Custom ID
  - View task details (name, description, attachments)
  - Portuguese language support

## Quick Start

Each MCP server can be installed and run independently:

```bash
# Install and run ClickUp MCP Server
npx @csevero/mcp-clickup
```

## Architecture

This repository follows a monorepo structure where each MCP server is:

- **Independent**: Has its own package.json and can be published separately
- **Clean Architecture**: Follows domain-driven design principles
- **TypeScript**: Fully typed for better development experience
- **Easy to Install**: Available via npx for instant usage

## Repository Structure

```
mcp-servers/
├── clickup/          # ClickUp MCP Server
│   ├── src/
│   │   ├── domain/   # Business entities and interfaces
│   │   ├── use-cases/# Business logic
│   │   ├── infra/    # External integrations
│   │   └── index.ts  # Main entry point
│   ├── package.json
│   └── README.md
└── README.md         # This file
```

## Contributing

We welcome contributions! Whether you want to:

- **Add new MCP servers** for different services
- **Improve existing servers** with new features
- **Fix bugs** or enhance documentation
- **Suggest integrations** for popular tools

### Getting Started

1. **Fork this repository**
2. **Create a new directory** for your MCP server (e.g., `./notion/`)
3. **Follow the Clean Architecture pattern** used in existing servers
4. **Add comprehensive README** with installation and usage instructions
5. **Submit a Pull Request**

### MCP Server Guidelines

When creating a new MCP server:

- Use Clean Architecture principles
- Include TypeScript types
- Add comprehensive error handling
- Provide clear documentation
- Follow the existing naming conventions
- Include usage examples

## License

MIT License - see individual server directories for specific license information.

## Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/csevero/mcp-servers/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/csevero/mcp-servers/discussions)
- **MCP Documentation**: [Model Context Protocol Docs](https://modelcontextprotocol.io/)

---

**Made with ❤️ for the AI community**