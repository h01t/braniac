import { deepseek } from '@ai-sdk/deepseek';
import { streamObject } from 'ai';
import { z } from 'zod';

async function test() {
  try {
    const result = await streamObject({
      model: deepseek('deepseek-reasoner'),
      schema: z.object({ msg: z.string() }),
      prompt: 'hello',
    });
    for await (const chunk of result.partialObjectStream) {
      console.log(chunk);
    }
  } catch(e) {
    console.error("FAIL", e.message);
  }
}
test();
