from pydantic import BaseModel


# ==========================================
# Resume Upload
# ==========================================

class ResumeResponse(BaseModel):
    filename: str
    message: str


# ==========================================
# User Registration
# ==========================================

class UserCreate(BaseModel):
    username: str
    email: str
    password: str


# ==========================================
# User Login
# ==========================================

class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    message: str


# ==========================================
# AI Interview Request
# ==========================================

class InterviewRequest(BaseModel):
    question: str
    answer: str


class InterviewResponse(BaseModel):
    score: int
    feedback: str


# ==========================================
# Interview Evaluation
# ==========================================
class InterviewEvaluation(BaseModel):
    user_id: int
    company: str
    role: str
    question: str
    answer: str


# ==========================================
# Interview History
# ==========================================

class InterviewHistorySchema(BaseModel):
    id: int
    company: str
    role: str
    question: str
    answer: str
    feedback: str
    score: int

    class Config:
        from_attributes = True
from pydantic import BaseModel

class QuestionRequest(BaseModel):
    company: str
    difficulty: str