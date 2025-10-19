import type { ClickupRepository } from "../domain/clickup.js";

export class GetCustomFieldDetailUseCase {
  constructor(private clickupRepository: ClickupRepository) {}

  async execute(listId: string, customFieldId: string): Promise<string | null> {
    const customFields = await this.clickupRepository.getTaskCustomFields(
      listId,
    );

    if (!customFields) return null;

    const findCustomFieldDetail = customFields.fields.find(
      (field) => field.id === customFieldId,
    );

    if (!findCustomFieldDetail) {
      console.warn(`CustomFieldId ${customFieldId} not found`);
      return "Custom field not found";
    }

    return JSON.stringify(findCustomFieldDetail);
  }
}
