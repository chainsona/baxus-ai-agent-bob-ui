# 🥃 BAXUS BOB - Expert Whisky AI Agent (UI)

BOB is an AI agent designed for the BAXUS ecosystem that analyzes users' virtual whisky bars to provide personalized bottle recommendations for their wishlists.

## 📺 Live Demo

[Try the BOB AI prototype](https://baxus-bob.maikers.com)

<div align="center">
   <img src="./screenshot.jpeg" alt="BOB AI Demo Video" style="width:600px;">
</div>

## Features

- 🔍 **Collection Analysis**: Analyzes existing bar data to identify patterns in user preferences (styles, price points, etc.)
- 🧠 **Smart Recommendations**: Suggests new bottles based on your collection profile
- 💰 **Price-Aware**: Provides recommendations within similar price ranges to match your spending habits
- 🌟 **Complementary Selections**: Recommends bottles that both match and diversify your collection
- 💬 **Interactive Chat**: Engage with BOB directly through a chat interface powered by Vercel AI SDK
- 🤖 **AI-Powered Assistance**: Get whisky knowledge and personalized advice through natural conversation

## Tech Stack

- 🔄 Next.js 15 - React framework
- 🎨 Tailwind CSS - Styling
- 🧩 shadcn/ui - UI components
- 🤖 Langchain - AI recommendation engine
- 🧩 Vercel AI SDK - AI chat interface
- 📊 CSV parsing - For bottle dataset management

## Getting Started

### Prerequisites

- Node.js 18+ (or as required by Next.js 15)
- pnpm (preferred package manager)
- OpenAI API key (for AI chat functionality)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MaikersHQ/baxus-ai-agent-BOB.git
   cd baxus-ai-agent-BOB
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` to add your OpenAI API key.

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app

## Usage

### Collection Analysis

1. Enter a valid BAXUS username in the search box
2. BOB will analyze the user's bar collection
3. View the profile analysis showing preferences and patterns
4. Browse personalized bottle recommendations with explanations

### AI Chat

1. Navigate to the Chat page
2. Ask BOB questions about whisky or request recommendations
3. For personalized analysis, ask BOB to analyze a specific BAXUS username's collection
4. Receive detailed insights and recommendations based on your conversation

## API Integration

BOB integrates with the BAXUS API to fetch user bar data:

```
GET http://services.baxus.co/api/bar/user/{username}
```

## Data Sources

The recommendation engine utilizes a dataset of 501 bottles for making personalized suggestions. This dataset is loaded from a CSV file included in the project at `data/501 Bottle Dataset - Sheet1.csv`.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   │   ├── ai/       # AI chat route
│   │   │   ├── baxus/    # BAXUS API proxy
│   │   │   └── bottles/  # Bottle dataset API
│   │   ├── chat/         # AI chat page
│   │   └── [username]/   # User analysis page
│   ├── components/       # React components
│   │   ├── bottle-card.tsx
│   │   ├── chat.tsx      # Chat interface
│   │   ├── profile-summary.tsx
│   │   ├── recommendations-section.tsx
│   │   ├── user-search.tsx
│   │   └── ui/           # shadcn UI components
│   ├── lib/              # Utility functions and libraries
│   │   ├── api.ts        # API integration
│   │   ├── recommendation-engine.ts # AI recommendation logic
│   │   └── utils.ts
├── data/                 # Dataset files
│   └── 501 Bottle Dataset - Sheet1.csv  # Main bottle dataset
├── public/               # Static files
└── ...config files
```

## Acknowledgments

- BAXUS team for providing the API and dataset
- shadcn for the beautiful UI components
- Vercel for their AI SDK and hosting solutions
- OpenAI for their powerful AI models
