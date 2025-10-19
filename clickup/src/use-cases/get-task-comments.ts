import type { ClickupRepository } from "../domain/clickup.js";
import type { TaskComment } from "../types/entities.js";

export class GetTaskCommentsUseCase {
  constructor(private clickupRepository: ClickupRepository) {}

  async execute(customTaskId: string): Promise<string | null> {
    const commentsData = await this.clickupRepository.getTaskComments(customTaskId);

    if (!commentsData || !commentsData.comments.length) {
      return "No comments found for this task.";
    }

    return this.formatComments(commentsData.comments);
  }

  private formatComments(comments: TaskComment[]): string {
    return comments.map((comment, index) => {
      const commentNumber = index + 1;
      const userName = comment.user.username || "Unknown User";
      const date = new Date(parseInt(comment.date)).toLocaleString();
      
      // Extract clean text from comment content
      const commentText = this.extractCommentText(comment);
      
      return [
        `**Comment ${commentNumber}** - from user **${userName}** (${date})`,
        `${commentText}`,
        comment.reply_count > 0 ? `_Replies: ${comment.reply_count}_` : "",
      ].filter(Boolean).join("\n");
    }).join("\n\n---\n\n");
  }

  private extractCommentText(comment: TaskComment): string {
    if (!comment.comment || comment.comment.length === 0) {
      return comment.comment_text || "Empty comment";
    }

    const textParts: string[] = [];

    for (const content of comment.comment) {
      if (content.text && content.text.trim()) {
        // Skip line breaks and block separators
        if (content.text === "\n" || content.attributes?.["block-id"]) {
          continue;
        }
        textParts.push(content.text.trim());
      } else if (content.type === "image" && content.image) {
        textParts.push(`[Image: ${content.image.name}]`);
      } else if (content.type === "emoticon" && content.emoticon) {
        textParts.push(content.text || content.emoticon.name);
      } else if (content.type === "bookmark" && content.bookmark) {
        textParts.push(`[Link: ${content.bookmark.url}]`);
      } else if (content.type === "tag" && content.user) {
        textParts.push(`@${content.user.username}`);
      }
    }

    return textParts.length > 0 ? textParts.join(" ") : comment.comment_text || "Empty comment";
  }
}
