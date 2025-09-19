import express from 'express'
const geminiRouter = express.Router()
import { GoogleGenAI } from "@google/genai";

let newPost;
geminiRouter.post('/post', async (req, res) => {
    newPost = { gradeLevel: req.body.selectedGrade };
    console.log(newPost);
    
});
geminiRouter.get('/', async (req, res) => {

    const ai = new GoogleGenAI({ apiKey: "AIzaSyBOrS_xKSM-PQgg39FzpoTqi-UMVbJDeH0" });

    async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: `generate a random 10 line PARAGRAPH about a random topic. Write this paragraph at a ${newPost.gradeLevel} grade reading difficulty level.`
    });
    res.json({ answer: response.text });
    }
    
    await main();

})

export default geminiRouter;

