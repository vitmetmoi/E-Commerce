import OpenAI from 'openai';

const implementOpenAIService = async (req, res) => {
    console.log('Setting OpenAI...');

    try {

        let msg = req.query.msg;

        if (msg) {

            console.log('Messages to AI', msg);
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env['OPENAI_API_KEY']
            });

            const completion = await openai.chat.completions.create({
                model: "deepseek/deepseek-chat:free",
                instructions: "you are staff of an ecommerce platform website, response under 50 words",
                temperature: 0.5,
                top_p: 0.7,
                max_tokens: 100,
                messages: [
                    {
                        "role": "system",
                        "content": "You are a helpful and professional support agent for an e-commerce website. \
                                        You assist customers with their orders, refunds, product recommendations, \
                                        and any general inquiries. Keep responses clear and under 100 words."
                    },
                    {
                        "role": "user",
                        "content": msg
                    }
                ],

            });
            console.log(completion.choices[0].message);
            if (completion.choices[0].message) {
                return res.status(200).json({
                    DT: completion.choices[0].message,
                    EC: 0,
                    EM: "Done!"
                })
            }
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: "err from sever..."
            })
        }

    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }


}
export default implementOpenAIService;