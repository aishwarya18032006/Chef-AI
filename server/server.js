
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid input format" });
  }

  try {
    const response = await hf.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content:
            "You are a friendly chef who creates delicious recipes based on given ingredients.",
        },
        {
          role: "user",
          content: `I have ${ingredients.join(
            ", "
          )}. Please create a recipe using these ingredients. 
Make sure to format your response in Markdown as follows:
- Title as "# Recipe Title"
- Ingredients as "- ingredient" bullets
- Instructions as numbered list starting with "1."`,
        },
      ],
      max_tokens: 1024,
    });

    const recipe = response.choices[0]?.message?.content?.trim() || "No recipe found.";
    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));