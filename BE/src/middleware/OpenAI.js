import OpenAI from 'openai';

const implementOpenAIService = async (req, res) => {
    console.log('Setting OpenAI...');

    try {
        let msg = req.query.msg;
        if (msg) {
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env['OPENAI_API_KEY']
            });

            const completion = await openai.chat.completions.create({
                model: "deepseek/deepseek-chat-v3-0324:free",
                messages: [
                    {
                        "role": "user",
                        "content": msg
                    }
                ],

            });
            if (completion.choices[0].message) {
                return res.status(200).json({
                    DT: completion.choices[0].message,
                    EC: 0,
                    EM: "Done!"
                })
            }
            console.log(completion.choices[0].message);
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