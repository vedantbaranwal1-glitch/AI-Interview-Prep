import json
import re
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# ==========================================
# Generate Interview Question
# ==========================================

def generate_question(skills, company, difficulty, asked_questions):

    prompt = f"""
You are a Senior Technical Interviewer at {company}.

Generate ONE interview question.

Company:
{company}

Difficulty:
{difficulty}

Candidate Skills:
{", ".join(skills)}

Previously Asked Questions:
{chr(10).join(asked_questions) if asked_questions else "None"}

Rules:

- Ask ONLY one interview question.
- Do NOT provide the answer.
- Match the candidate's skills.
- Match the selected difficulty.
- Never repeat any previous question.
- Return only the question.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        question = response.text.strip()

        print("\nGenerated Question:")
        print(question)

        return question

    except Exception as e:

        print("Gemini Question Error:", e)

        return "Tell me about yourself."


# ==========================================
# Evaluate Interview Answer
# ==========================================

def evaluate_answer(question, answer):

    prompt = f"""
You are a senior technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return ONLY valid JSON.

Example:

{{
    "score": 85,
    "feedback": "Good answer. Improve explanation of hooks."
}}

Rules:

- Score between 0 and 100
- Judge correctness
- Judge clarity
- Judge completeness
- Mention mistakes
- Suggest improvements

Return JSON only.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "").strip()

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:
            text = match.group()

        print("\nGemini Evaluation:")
        print(text)

        return json.loads(text)

    except Exception as e:

        print("Gemini Evaluation Error:", e)

        return {
            "score": 0,
            "feedback": "Unable to evaluate the answer right now. Please try again."
        }