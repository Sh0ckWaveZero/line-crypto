import { Configuration, OpenAIApi } from 'openai';

import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAiService {
  private configuration: Configuration;
  private openai: OpenAIApi;
  private model: string = 'gpt-3.5-turbo';
  constructor(
    private readonly config: ConfigService,
  ) {
    this.configuration = new Configuration({
      apiKey: this.config.get('openAi.apiKey'),
    });
    this.openai = new OpenAIApi(this.configuration);
  }
  private sanitizeMessage(message: string) {
    return message.trim().replace(/[\n\r]/g, '').replace(/(\w)\.$/, '$1');
  }
  private deduplicateMessages = (array: string[]) => Array.from(new Set(array));

  public async getCompletion(prompt: string): Promise<any> {
    const { data }: any = await this.openai.createChatCompletion({
      model: this.model,
      messages: [{
        role: 'user',
        content: prompt,
      }],
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      n: 1,
    });

    const res = this.deduplicateMessages(
      data.choices
        .filter((choice: any) => choice.message?.content)
        .map((choice: any) => this.sanitizeMessage(choice.message!.content))
    );
    return res[0];
  }
}
