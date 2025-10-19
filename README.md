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
  - View task details and comments
  - Access custom field configurations
  - Secure API credential management

## Quick Start

### Using Claude Code (Recommended)

```bash
claude mcp add clickup --env CLICKUP_API_KEY=your_api_key_here \
  --env CLICKUP_TEAM_ID=your_team_id_here \
  -- npx @csevero/mcp-clickup
```

### Direct Installation

```bash
npx @csevero/mcp-clickup
```

For detailed setup instructions, API credentials, and usage examples, see each server's README.

## Contributing

Contributions are welcome! To add a new MCP server or improve existing ones:

1. Fork this repository
2. Create a feature branch
3. Follow the Clean Architecture pattern used in existing servers
4. Add comprehensive documentation
5. Submit a Pull Request

See individual server READMEs for architecture details and development guidelines.

## License

MIT License - see individual server directories for specific license information.

## Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/csevero/mcp-servers/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/csevero/mcp-servers/discussions)
- **MCP Documentation**: [Model Context Protocol Docs](https://modelcontextprotocol.io/)

---

**Made with ❤️ for the AI community**