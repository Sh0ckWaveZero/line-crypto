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
    const { data } = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.8,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    return data.choices[0].text;
  }
}
