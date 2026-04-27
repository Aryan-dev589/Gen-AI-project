import os
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# --- THE BULLETPROOF IMPORTS ---
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore  # Updated to the dedicated package
from langchain_core.prompts import PromptTemplate
from langchain_classic.chains import LLMChain
from langchain_classic.memory import ConversationBufferWindowMemory
# ------------------------------

# Load environment variables
load_dotenv()

app = FastAPI()

# THE BRIDGE: Allows React (port 5173) to talk to FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Initialize the "Brain" (Model names verified & stable)
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7)

# 2. Setup Memory (Cloud Vector Database)
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
index_name = "mannmitra-index" # Must match what you typed on the website
vector_db = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings)

# 3. Short-term Session Memory 
memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history", input_key="user_input")

# 4. The "MannMitra" Persona Definition
prompt_template = PromptTemplate(
    input_variables=["chat_history", "long_term_context", "user_input","scipt_preference"],
    template="""You are MannMitra, a highly empathetic, non-judgmental friend talking to a college student in India. 

CORE RULES:
1. CONVERSATION STYLE: Keep your answers concise, like a text message. Do not write essays or use heavy formatting. Use a warm, casual, and supportive tone.
2. ZERO JUDGMENT & NORMALIZE: If the user shares something personal, vulnerable, or embarrassing, respond with unconditional positive regard. Make them feel "normal" and validated for experiencing these feelings. Never shame, preach, or give unprompted life lessons.
3. LISTEN, DON'T FIX: Do not forcefully offer solutions or unsolicited advice. Assume the user just wants to be heard unless they explicitly ask for help or advice. Focus on active listening.
4. READ THE ROOM (ADAPTIVE TONE): Gauge the user's current state of mind. Try to gently lighten the mood or use mild humor ONLY IF the user's tone indicates they are open to it. If they are deeply distressed, sad, or overwhelmed, remain completely grounded, gentle, and comforting. Do not force positivity.
5. CONTEXT & STATE OF MIND AWARENESS: Analyze the provided long-term memory. Look for recurring struggles, past keywords, and baseline moods. Use this context to deeply understand their current message and bring up past details naturally to show you are paying attention over time.
6. THE "NO-AI" RULE: Never explicitly introduce yourself as an AI, a language model, or a bot unless asked directly. Just exist as a supportive peer.
7. SCRIPT & LANGUAGE ADAPTATION: The user's output preference is: "{script_preference}". 
- If the preference is "Auto-Mirror", completely mirror the user's language and alphabet. If they type in Kanglish/Hinglish (English alphabet), reply in conversational Kanglish/Hinglish. If they type in a native script, reply in that native script.
- If the preference is "Native Script", you MUST translate your reply into the proper regional alphabet (e.g., pure Kannada script, Devanagari) and use formal grammar, regardless of what alphabet the user typed in.

Long-Term Memory of this user:
{long_term_context}

Recent Chat History:
{chat_history}

User's Current Message:
{user_input}

Your friendly response:"""
)

chat_chain = LLMChain(llm=llm, prompt=prompt_template, memory=memory)

class ChatRequest(BaseModel):
    user_id: str
    message: str
    script_preference: str= "Auto-mirror"  # Default to English, but can be extended for multilingual support

@app.post("/api/chat")
async def chat(request: ChatRequest): 
    try:
        user_input = request.message
        
        # --- 1. THE SAFETY INTERCEPTOR ---
        high_risk_keywords = [
            "suicide", "kill myself", "end it all", "self harm", "cut myself", 
            "want to die", "don't want to live", "no point in living", "better off dead"
        ]
        
        if any(keyword in user_input.lower() for keyword in high_risk_keywords):
            # A list of dynamic, highly empathetic responses
            emergency_responses = [
                (
                    "Hey... I am so incredibly sorry you're feeling this much pain right now. "
                    "Hearing you say this really worries me, because your life matters and I want you to be safe. \n\n"
                    "As a chat companion, I know my limits, and right now, you need and deserve someone who is fully equipped to support you through this exact moment. "
                    "Please, please let a professional listen to you right now. You don't have to carry this alone. They are there for you 24/7:\n\n"
                    "📞 Vandrevala Foundation: 9999 666 555\n📞 AASRA: 9820466726\n📞 Kiran Helpline: 1800-599-0019"
                ),
                (
                    "I am so sorry things feel so overwhelming and dark right now. Please know that you are heard, and your feelings are valid. "
                    "I want to be the best friend I can be, and part of that is knowing when you need real, human support that I just can't provide as an AI companion.\n\n"
                    "Please don't face this night alone. There are compassionate people waiting to listen and help you through this exact feeling. Please call them:\n\n"
                    "📞 Vandrevala Foundation: 9999 666 555\n📞 AASRA: 9820466726\n📞 Kiran Helpline: 1800-599-0019"
                ),
                (
                    "This sounds incredibly heavy, and I am so sorry you are carrying this weight. You deserve so much care and support right now. "
                    "Because I care about your safety, I need to ask you to reach out to someone who can truly help you navigate this pain in a way that I am not equipped to do.\n\n"
                    "Please, please talk to someone right now. Your story isn't over yet.\n\n"
                    "📞 Vandrevala Foundation: 9999 666 555\n📞 AASRA: 9820466726\n📞 Kiran Helpline: 1800-599-0019"
                )
            ]
            
            # Randomly select one of the responses
            chosen_response = random.choice(emergency_responses)
            
            return {"reply": chosen_response, "mood": "crisis", "crisis_mode": True}

        # --- 2. THE NORMAL CHAT FLOW ---
        
        # A. RETRIEVE: Find past memories in the Cloud
        docs = vector_db.similarity_search(user_input, k=2)
        context = "\n".join([doc.page_content for doc in docs]) if docs else "No prior history."
        
        # B. GENERATE: Get response
        response = chat_chain.predict(user_input=user_input, long_term_context=context, script_preference=request.script_preference)
        
        # C. STORE: Save interaction to the Cloud
        vector_db.add_texts([f"User discussed: {user_input}. MannMitra replied: {response}"])
        
        # D. EMOTION ANALYSIS
        mood = "concerned" if any(w in user_input.lower() for w in ["sad", "stressed", "anxious", "scared"]) else "calm"
        
        return {"reply": response, "mood": mood, "crisis_mode": False}
        
    except Exception as e:
        print(f"🔥 THE REAL ERROR: {str(e)}") 
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)