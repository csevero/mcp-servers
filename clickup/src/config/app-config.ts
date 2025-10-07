import { parseArguments, type ClickupConfig } from './cli-parser.js';

export type { ClickupConfig };

export function loadConfiguration(): ClickupConfig {
  return parseArguments();
}

export function validateConfiguration(config: ClickupConfig): void {
  if (!config.apiKey || !config.teamId) {
    throw new Error('Invalid configuration: apiKey and teamId are required');
  }

  if (!config.apiKey.startsWith('pk_')) {
    throw new Error('Invalid API key format: must start with "pk_"');
  }

  if (!/^\d+$/.test(config.teamId)) {
    throw new Error('Invalid team ID format: must be numeric');
  }
}