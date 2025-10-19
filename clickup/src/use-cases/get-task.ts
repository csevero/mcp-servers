import type { ClickupRepository } from "../domain/clickup.js";
import type { Task, TaskCustomField } from "../types/entities.js";

export class GetTaskUseCase {
  constructor(private clickupRepository: ClickupRepository) {}

  async execute(customTaskId: string): Promise<string | null> {
    const task = await this.clickupRepository.getTaskByCustomId(customTaskId);

    if (!task) return null;

    return this.formatTask(task);
  }

  private formatTask(task: Task): string {
    return [
      `**Custom ID**: ${task.custom_id || "Not defined"}`,
      `**Name**: ${task.name || "Not defined"}`,
      `**Description**: ${task.description || "Not defined"}`,
      `**Attachments**: ${JSON.stringify(task.attachments || [])}`,
      `**ListID**: ${task.list.id}`,
      `**Custom Fields**: ${
        task.custom_fields.length
          ? JSON.stringify(this.formatCustomFields(task.custom_fields))
          : "Not defined"
      }`,
    ].join("\n\n");
  }

  private formatCustomFields(customFields: TaskCustomField[]) {
    const formattedCustomFields = customFields.map((customField) => {
      const baseCustomField = {
        id: customField.id,
        name: customField.name,
        type: customField.type,
        ...(customField?.value && { value: customField.value }),
      };

      if (customField.type === "drop_down" && baseCustomField.value) {
        const index = baseCustomField.value;

        const realValue = customField.type_config.options?.find(
          (option) => option.orderindex === index,
        );

        baseCustomField.value = realValue?.name || "";
      }

      if (customField.type === "labels" && baseCustomField.value) {
        const labels = baseCustomField.value as string[];

        const targetLabels = customField.type_config.options?.filter((option) =>
          labels.includes(option.id),
        );

        baseCustomField.value =
          targetLabels?.map((label) => label.label!) || [];
      }

      return baseCustomField;
    });

    return formattedCustomFields;
  }
}
