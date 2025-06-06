# BAXUS's AI Agent BOB

## Overview

Create an AI agent named "BOB" whose main job analyzes users' virtual bars within the BAXUS ecosystem to provide personalized bottle recommendations for their wishlists. BOB at his core, is a whisky expert and is incredibly knowledgeable about the entire industry. He’s the perfect person to go to to get recommendations for new bottles to add to your collection, or give you a profile of your taste.

## Objectives

- Train an AI agent that has the main functionality of analyzing a user's bar bottles to make personalized suggestions.

## BOB’s Core Functionality

1. Collection Analysis:

- Parse and analyze user's existing bar data
- Identify patterns in user preferences (regions, styles, price points, age statements, etc.)

2. Recommendation Engine:

- Suggest new bottles based on collection analysis
- Provide recommendations within similar price ranges
- Recommend bottles with similar profiles to existing collection
- Suggest complementary bottles that diversify a collection

## Technical Specifications

1. API Integration:

- Utilize the provided endpoint to access user’s bar and wishlist data
- BOB will determine bottles to recommend from the provided dataset of approximately 500 bottles

2. Implementation Freedom:

- Use Langchain, Langgraph for the Ai Agents
- Use shadcn UI components

3. Output Format:

- Clear presentation of recommended bottles with reasoning for each suggestion
- Ability to rank or prioritize recommendations based on relevance

## Deliverables

- A working prototype of BOB
- Demo showing personalized recommendations based on sample user data
- Code repository with clear installation and usage instructions

## Resources

-Download BoozApp and add bottles to your bar

- Retrieving your bar data via this endpoint:
  - `curl -X GET "http://services.baxus.co/api/bar/user/heisjoel0x" -H "Content-Type: application/json"`
- Dataset of 501 bottles to use as the recommendation pool: `data/501 Bottle Dataset - Sheet1.csv`
