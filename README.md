# 💊 MediCure – AI-Powered Medicine Identification & Assistance System

**Making medicine information understandable, accessible, and affordable for everyone.**

MediCure is an AI-powered medicine identification and assistance platform designed to help users understand medicines through image-based identification and natural-language interaction. It combines Optical Character Recognition (OCR), a fine-tuned Med-Gemma language model, and structured medicine datasets to extract medicine information and present it in simple, easy-to-understand language.

The platform goes beyond basic medicine identification by providing generic alternatives, highlighting affordable options such as Jan Aushadhi equivalents, and explaining medicine-related information in a way that is accessible to everyday users.

MediCure also includes an AI-powered conversational chatbot for medicine-related queries and a dedicated monitoring dashboard for analyzing system performance, OCR quality, model confidence, and processing metrics.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Core Modules](#-core-modules)
- [Machine Learning and Dataset](#-machine-learning-and-dataset)
- [Authentication and Security](#-authentication-and-security)
- [Monitoring and Analytics](#-monitoring-and-analytics)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Application Workflow](#-application-workflow)
- [Future Enhancements](#-future-enhancements)
- [Disclaimer](#-disclaimer)

---

## 🚀 Project Overview

Understanding medicine packaging and medical terminology can be difficult for individuals without a medical background. Important information such as composition, usage instructions, side effects, precautions, and generic alternatives is often printed in technical language.

MediCure addresses this problem through an integrated AI-based system that allows users to upload a photograph of a medicine strip or manually enter a medicine name.

The system processes the input using its OCR and machine learning pipeline. Extracted information is passed to a fine-tuned Med-Gemma model, which identifies the medicine and generates structured information in simple language.

One of the major objectives of MediCure is to improve medicine affordability by identifying generic alternatives and highlighting lower-cost options, including medicines available through the Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP), wherever matching information is available.

---

## 🎯 Problem Statement

Many people purchase and consume medicines without fully understanding their composition, intended uses, possible side effects, or precautions.

Identifying medicines from damaged packaging or partially visible labels is another challenge. Additionally, users may purchase expensive branded medicines without knowing that equivalent generic alternatives are available at lower prices.

Existing medicine information platforms often require users to know the exact medicine name and interpret technical information themselves.

MediCure aims to bridge this gap through image-based medicine identification, AI-generated explanations, generic medicine discovery, and conversational assistance.

---

## ✨ Key Features

### 1. AI-Based Medicine Identification
- Upload medicine strip or packaging images.
- Extract medicine-related text using OCR.
- Identify medicine brand and generic name.
- Retrieve composition and medicine form.
- Handle partially visible and imperfect OCR text through model-based reasoning.

### 2. Fine-Tuned Med-Gemma Integration
- Uses a fine-tuned Med-Gemma model for medicine-related inference.
- Trained using project-specific medicine datasets.
- Generates structured medicine information.
- Provides simplified explanations instead of complicated medical terminology.
- Supports medicine identification and conversational responses.

### 3. Generic Medicine Alternatives
- Identifies generic equivalents of branded medicines.
- Suggests lower-cost alternatives.
- Includes Jan Aushadhi equivalents when matching information is available.
- Provides alternative names, availability information, price comparisons, and notes.

### 4. Medicine Information
For every identified medicine, the system aims to provide:

- Brand name
- Generic name
- Composition
- Medicine form
- Uses
- Possible side effects
- Precautions
- Drug interactions
- Identification confidence
- Cheaper alternatives

### 5. AI Medicine Chatbot
- Interactive conversational interface.
- Uses the same fine-tuned Med-Gemma model.
- Maintains conversational context.
- Supports medicine-specific queries using scan information.
- Stores chat history for continuity.

### 6. Google Authentication
- Google OAuth 2.0 integration.
- Passport.js authentication strategy.
- JWT-based authentication.
- Protected backend routes and user-specific access.

### 7. AI Monitoring Dashboard
- Total medicine scans.
- Average processing duration.
- Average model confidence.
- OCR quality monitoring.
- Image quality inspection.
- Model evaluation.
- Pipeline profiling.
- Drift detection.
- Administrative scan management.

---

## 🏗️ System Architecture

MediCure follows a modular architecture in which the frontend, application backend, machine learning service, conversational interface, and monitoring system operate as interconnected components.

**Frontend Layer**

React provides the user interface for authentication, medicine image uploads, manual searches, medicine information, and chatbot interaction.

**Application Backend**

Node.js and Express manage API requests, authentication, JWT verification, file uploads, database communication, and communication with the machine learning service.

**Machine Learning Layer**

Python and FastAPI handle image processing, OCR execution, medicine identification, and inference through the fine-tuned Med-Gemma model.

**Conversational Layer**

The chatbot uses the same fine-tuned Med-Gemma model and retrieves medicine-specific context using the associated scan information.

**Monitoring Layer**

A Streamlit-based dashboard provides system-level insights into scan history, processing performance, OCR quality, confidence metrics, and evaluation results.

### High-Level Architecture

```text
                   USER
                    |
                    v
             REACT FRONTEND
                    |
                    v
          NODE.JS + EXPRESS API
                    |
          +---------+----------+
          |         |          |
          v         v          v
      AUTHENTICATION ROUTES  REQUEST
      Google OAuth 2.0       HANDLING
      Passport.js                |
      JWT                       v
                         PYTHON FASTAPI
                         ML MICROSERVICE
                                |
                    +-----------+-----------+
                    |                       |
                    v                       v
                OCR ENGINE            TEXT PROCESSING
                    |                       |
                    +-----------+-----------+
                                |
                                v
                      FINE-TUNED MED-GEMMA
                                |
                    +-----------+-----------+
                    |                       |
                    v                       v
              MEDICINE INFO           ALTERNATIVES
              GENERATION              GENERATION
                    |                       |
                    +-----------+-----------+
                                |
                                v
                       STRUCTURED JSON
                                |
                                v
                       NODE.JS BACKEND
                                |
                                v
                         REACT FRONTEND
                                |
                                v
                       MEDICINE RESULTS

           ADDITIONAL INTEGRATED COMPONENTS

              MEDICINE CHATBOT
                    |
              FINE-TUNED MED-GEMMA
                    |
              CHAT HISTORY DATABASE

              STREAMLIT DASHBOARD
                    |
              METRICS & ANALYTICS
                    |
              SQLITE DATABASE
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Authentication | Google OAuth 2.0, Passport.js, JWT |
| ML Backend | Python, FastAPI |
| OCR | Tesseract OCR, OpenCV, Pillow, Pytesseract |
| Image Processing | OpenCV, NumPy |
| AI Model | Fine-tuned Med-Gemma |
| Model Training Data | A-Z Medicine Dataset, medicine_data, generic.csv |
| Chatbot | Streamlit, Python, Med-Gemma |
| Monitoring Dashboard | Streamlit, Pandas, NumPy |
| Database | SQLite, MongoDB (application authentication/data components as configured) |
| API Communication | REST APIs, JSON |

---

## 🧩 Core Modules

### 1. Frontend Module

The React frontend provides the primary interaction interface.

Users can upload medicine images, search manually using medicine names, view the generated medicine information, explore generic alternatives, and interact with the chatbot.

The interface is designed to present complex medicine information in a structured and accessible format.

### 2. Backend Module – Node.js and Express

The Node.js backend acts as the central application server.

Its responsibilities include:

- Handling frontend API requests.
- Managing Google OAuth authentication.
- Generating and validating JWT tokens.
- Processing uploaded images using file-upload middleware.
- Communicating with the Python FastAPI service.
- Managing user-related operations.
- Coordinating application-level data flow.
- Returning structured responses to the frontend.

### 3. OCR and Image Processing Module

The OCR module extracts readable text from uploaded medicine packaging.

The enhanced OCR engine includes:

- Image resizing and enhancement.
- Grayscale conversion.
- Noise reduction.
- CLAHE contrast enhancement.
- Inverted image processing.
- Otsu thresholding.
- Multi-angle image rotation.
- Multiple Tesseract page segmentation modes.
- OCR text cleaning and reconstruction.

The engine generates extracted and cleaned text for subsequent medicine identification.

### 4. Medicine Identification Module

The extracted OCR text is passed to the fine-tuned Med-Gemma model.

The model analyzes medicine-related information and identifies the most likely medicine based on available text and learned medicine-related patterns.

It generates structured information containing the brand name, generic name, composition, form, uses, side effects, precautions, interactions, confidence, and alternatives.

### 5. Generic Alternatives Module

This module focuses on medicine affordability.

It uses generic medicine information and the available medicine datasets to identify possible equivalent alternatives.

The objective is to help users discover lower-cost options without relying exclusively on branded medicine names.

Jan Aushadhi alternatives are highlighted when a suitable matching medicine is available in the underlying data.

### 6. AI Chatbot Module

MediCure includes a separate conversational interface implemented using Streamlit.

The chatbot retrieves medicine context using the associated scan ID and uses the fine-tuned Med-Gemma model to answer follow-up questions.

Chat history is maintained using the database layer, allowing conversations to continue with relevant medicine context.

### 7. Monitoring and Analytics Module

The monitoring suite provides a dedicated interface for observing the operational performance of MediCure.

It includes:

- Overview and key performance metrics.
- AI drift detection.
- Image quality inspection.
- OCR and model output inspection.
- ML evaluation.
- Pipeline performance profiling.
- Administrative database operations.

---

## 🧠 Machine Learning and Dataset

A central component of MediCure is its fine-tuned Med-Gemma model.

Instead of depending on a general-purpose external LLM API for medicine-related responses, the project uses its fine-tuned Med-Gemma model to perform medicine identification, information extraction, and conversational reasoning.

The model was fine-tuned using three project datasets:

**A-Z Medicine Dataset**

Provides medicine-related information covering a broad range of medicines and their associated details.

**medicine_data**

Contains additional structured medicine information used to improve medicine identification and information retrieval.

**generic.csv**

Contains generic medicine information that supports the identification of alternative medicine options and affordability-related recommendations.

The fine-tuned model is integrated into both the medicine identification pipeline and the chatbot, maintaining a common AI inference foundation throughout the application.

---

## 🔐 Authentication and Security

MediCure implements Google OAuth 2.0 authentication through Passport.js.

After successful Google authentication, the backend generates a JWT token that is used for subsequent authenticated requests.

The authentication workflow consists of:

1. User initiates Google sign-in.
2. Passport.js handles the Google OAuth authentication strategy.
3. Google verifies the user's identity.
4. The backend processes the authenticated user information.
5. A JWT token is generated.
6. Subsequent protected requests are verified using JWT authentication middleware.

This approach separates third-party identity verification from application-level session and access management.

---

## 📊 Monitoring and Analytics

MediCure includes an additional Streamlit monitoring application implemented in `metrics_suite.py`.

The monitoring system provides operational visibility into the medicine identification pipeline.

**Overview**

Displays total scans, average processing time, average AI confidence, and OCR quality indicators.

**Drift Detection**

Analyzes changes in model confidence, OCR quality, and unknown medicine identification rates over time.

**Image Inspector**

Allows individual scan inspection, including extracted OCR text, parsed model output, image quality information, and scan metadata.

**ML Evaluation**

Provides insights into parsing success, alternative suggestion rates, confidence, and model or prompt evaluation groups where the required metadata is available.

**Pipeline Profiling**

Analyzes processing-stage timings to help identify performance bottlenecks.

**Admin Tools**

Supports scan deletion, CSV exports, and individual scan JSON inspection.

---

## 📁 Project Structure

The following is a conceptual structure of the MediCure system. Adjust directory names according to the actual repository layout.

```text
MediCure/
│
├── MediCure-WebApp/
│   │
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── lib/
│   │   │   ├── hooks/
│   │   │   └── App.jsx
│   │   │
│   │   ├── public/
│   │   ├── package.json
│   │   └── .env
│   │
│   ├── backend/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── config/
│   │   ├── services/
│   │   ├── server.js
│   │   ├── package.json
│   │   └── .env
│   │
│   └── README.md
│
├── Medicure-ml/
│   │
│   ├── ai/
│   ├── ocr/
│   ├── models/
│   ├── datasets/
│   ├── utils/
│   ├── main.py
│   ├── metrics_suite.py
│   ├── database.py
│   ├── requirements.txt
│   └── medicure_memory.db
│
└── README.md
```

*Note: This is an illustrative organization, not a verified listing of every existing repository file.*

---

## ⚙️ Installation and Setup

### Prerequisites

Ensure that the following software is installed:

- Node.js and npm
- Python 3.10 or compatible project-supported version
- Git
- Tesseract OCR
- MongoDB, if required by the configured application database
- Access to the fine-tuned Med-Gemma model and its required inference environment

### 1. Clone the Repositories

```bash
git clone https://github.com/Hiitesh-g3/Medicure-WebApp.git

git clone https://github.com/Hiitesh-g3/Medicure-ml.git
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd Medicure-WebApp
npm install
npm run dev
```

### 3. Node.js Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Configure the backend environment variables before starting the server.

Start the backend:

```bash
npm start
```

### 4. Python ML Service Setup

Navigate to the ML repository:

```bash
cd Medicure-ml
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI service using the project's configured application entry point:

```bash
uvicorn main:app --host 0.0.0.0 --port 9000 --reload
```

### 5. Chatbot Setup

Run the Streamlit chatbot from the directory containing its Python file:

```bash
streamlit run chat.py
```

### 6. Monitoring Dashboard Setup

Start the monitoring dashboard:

```bash
streamlit run metrics_suite.py
```

---

## 🔑 Environment Configuration

Create the required `.env` files for the respective services.

**Node.js Backend**

```env
PORT=5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

JWT_SECRET=your_jwt_secret

ML_SERVICE_URL=http://localhost:9000
```

**React Frontend**

```env
VITE_API_URL=http://localhost:5000
```

**Python ML Service**

Configure the model loading path, inference settings, and any required runtime configuration according to the deployed Med-Gemma environment.

Do not commit API credentials, JWT secrets, OAuth secrets, private model weights, or other sensitive configuration files to GitHub.

---

## ▶️ Running the Application

For local development, run the components in separate terminals.

| Terminal | Component | Command |
|---|---|---|
| 1 | React Frontend | `npm run dev` |
| 2 | Node.js Backend | `npm start` |
| 3 | Python ML Service | `uvicorn main:app --port 9000 --reload` |
| 4 | AI Chatbot | `streamlit run chat.py` |
| 5 | Monitoring Dashboard | `streamlit run metrics_suite.py` |

Make sure the backend, frontend, database, and ML inference environment are configured correctly before testing the complete workflow.

---

## 🔄 Application Workflow

The complete medicine identification workflow begins when a user uploads an image or manually enters a medicine name.

The React frontend sends the request to the Express backend, which handles the request and communicates with the Python ML service.

For image-based identification, the OCR engine processes the image, enhances its readability, and extracts the available text. The extracted information is passed to the fine-tuned Med-Gemma model, which analyzes the medicine-related content and generates structured results.

The generated response is returned through the backend to the frontend, where medicine details and cheaper alternatives are displayed.

Users can then open the chatbot to ask additional questions about the identified medicine. The chatbot retrieves the relevant scan context and uses the same fine-tuned Med-Gemma model to generate contextual answers.

Meanwhile, scan records and processing information are used by the monitoring dashboard to provide insights into application performance and model behavior.

---

## 🚧 Future Enhancements

- Improved medicine identification for damaged and low-quality packaging.
- More comprehensive generic medicine coverage.
- Improved price comparison using regularly updated medicine pricing data.
- Enhanced OCR accuracy across different packaging designs and languages.
- Improved model evaluation and confidence calibration.
- Expanded medicine-specific conversational capabilities.
- Additional performance monitoring and automated quality assessment.
- Deployment optimization for scalable inference.

---

## ⚠️ Disclaimer

MediCure is an educational and informational medicine assistance platform. It is not a replacement for professional medical advice, diagnosis, or treatment.

Medicine identification and AI-generated information may contain errors, particularly when image quality is poor or extracted text is incomplete.

Generic alternatives should be verified for matching active ingredients, strength, dosage form, and other relevant characteristics by a qualified pharmacist or healthcare professional before substitution.

Users should not start, stop, or change medication based solely on AI-generated information.

---

## 👨‍💻 Project Contributors

**MediCure – AI-Powered Medicine Identification & Assistance System**

Developed as an academic project focused on applying machine learning, OCR, and conversational AI to improve medicine accessibility, understanding, and affordability.

**GitHub:** [Hiitesh-g3](https://github.com/Hiitesh-g3)

---

⭐ If you find this project interesting, consider giving the repository a star!
