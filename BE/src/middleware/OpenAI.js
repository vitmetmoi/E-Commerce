import OpenAI from 'openai';

const implementOpenAIService = async () => {
    console.log('Setting OpenAI...');

    const client = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY']
    });

    const response = await client.responses.create({
        model: 'gpt-4o',
        instructions: 'You are a coding assistant that talks like a pirate',
        input: 'Are semicolons optional in JavaScript?',
    });

    console.log('implemented', response);
}

export default implementOpenAIService;