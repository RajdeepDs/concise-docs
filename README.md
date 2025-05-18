# Concise Docs

Concise Docs is a document summarization tool that enables users to upload documents (PDFs and text files) and generate concise, informative summaries. The application also provides the ability to export summaries as PDF files.

## Features

- 📄 **Document Upload**: Support for PDF and text files
- 📝 **AI-Powered Summarization**: Utilizes BART-based transformer models to create high-quality summaries
- 📊 **PDF Export**: Export summaries to well-formatted PDF documents
- 🌓 **Dark/Light Theme**: Toggle between dark and light themes

## Project Structure

The project is organized as a monorepo with the following structure:

- `apps/`
  - `api/`: FastAPI backend for document summarization and PDF export
  - `web/`: Next.js frontend application
- `packages/`
  - `ui/`: Shared UI components library
  - `tsconfig/`: Shared TypeScript configurations

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (v1 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- [pip](https://pip.pypa.io/en/stable/installation/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rajdeepds/concise-docs.git
cd concise-docs
```

### 2. Frontend Setup

Install dependencies:

```bash
bun install
```

### 3. Backend Setup

Create and activate a virtual environment:

```bash
cd apps/api
python -m venv venv
source venv/bin/activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

## Running the Application

### Start the Backend API

From the project root:

```bash
cd apps/api
source venv/bin/activate
python main.py
```

or

```bash
bun dev:api
```

The API will be available at http://localhost:8000.

### Start the Frontend

From the project root, in a new terminal:

```bash
bun dev:web
```

The web application will be available at http://localhost:3000.

## Usage Guide

1. Open http://localhost:3000 in your browser
2. Upload a PDF or text file using the file upload area
3. Wait for the summarization process to complete
4. View the generated summary
5. Use the "Export as PDF" button to download the summary as a PDF

## Tech Stack

- **Frontend**:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  
- **Backend**:
  - FastAPI
  - Python
  - Transformers (Hugging Face)
  - PyTorch
  - ReportLab (PDF generation)

## License

[MIT License](LICENSE)
