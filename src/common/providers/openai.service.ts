import { Configuration, OpenAIApi } from 'openai';

import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAiService {
  private configuration: Configuration;
  private openai: OpenAIApi;
  constructor(
    private readonly config: ConfigService
  ) {
    this.configuration = new Configuration({
      apiKey: this.config.get('openAi.apiKey'),
    });
    this.openai = new OpenAIApi(this.configuration);
  }
  public async getCompletion(prompt: string): Promise<any> {
    return await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You: ${prompt}`,
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      stop: ['You:'],
    });
  }
}
