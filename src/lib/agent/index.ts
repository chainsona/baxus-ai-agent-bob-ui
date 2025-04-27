import { ChatOpenAI } from '@langchain/openai';
import {
  AIMessage,
  BaseMessage,
  SystemMessage,
} from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { fetchUserBar, loadBottleDataset } from '@/lib/api';
import { generateRecommendations } from '@/lib/recommendation-engine';
import { findWhiskyAnswer } from './whisky-knowledge';

// Function to analyze a user's bar
async function analyzeUserBar(username: string): Promise<string> {
  try {
    // Fetch user bar data
    const userBar = await fetchUserBar(username);

    if (!userBar?.bottles?.length) {
      return `Sorry, I couldn't find any bottles in ${username}'s collection.`;
    }

    // Load bottle dataset and generate recommendations
    const bottleDataset = await loadBottleDataset();
    const recommendations = await generateRecommendations(
      userBar,
      bottleDataset
    );

    // Format the response
    let response = `# Analysis of ${username}'s Bar Collection\n\n`;
    response += `## User Profile\n${recommendations.analysis.profileSummary}\n\n`;
    response += `## Top Recommendations\n\n`;

    recommendations.recommendations.forEach((rec, index) => {
      response += `${index + 1}. **${rec.bottle.name}** (${rec.bottle.spirit_type}, ${rec.bottle.abv || ''}% ABV)\n   ${rec.reason}\n\n`;
    });

    return response;
  } catch (error) {
    console.error('Error in analyze_user_bar tool:', error);
    return "I'm sorry, I encountered an error while analyzing the collection.";
  }
}

// Function to generate whisky recommendations based on specified type
function getWhiskyRecommendations(type: string): string {
  const recommendations = {
    bourbon: [
      {
        name: 'Buffalo Trace',
        details:
          'A versatile, smooth bourbon with notes of vanilla, mint, and molasses',
      },
      {
        name: 'Woodford Reserve',
        details:
          'Rich, complex bourbon with notes of dried fruit, mint, and cocoa',
      },
      {
        name: 'Four Roses Single Barrel',
        details:
          'Robust yet mellow with hints of plum, cherry, spice, and caramel',
      },
      {
        name: 'Eagle Rare 10 Year',
        details:
          'Aged bourbon with a complex taste of candied almonds and rich cocoa',
      },
      {
        name: 'Elijah Craig Small Batch',
        details: 'Signature warmth with notes of nutmeg, vanilla, and caramel',
      },
    ],
    scotch: [
      {
        name: 'Glenfiddich 12 Year',
        details: 'Fruity and smooth single malt with pear and oak notes',
      },
      {
        name: 'The Macallan 12 Year',
        details: 'Sherry oak influence with rich dried fruits and spice',
      },
      {
        name: 'Laphroaig 10 Year',
        details: 'Bold, peaty, and smoky with medicinal notes',
      },
      {
        name: 'Balvenie DoubleWood 12 Year',
        details: 'Sweet fruit and sherry notes with spice and vanilla',
      },
      {
        name: 'Talisker 10 Year',
        details: 'Maritime character with pepper, smoke, and sweet undertones',
      },
    ],
    rye: [
      {
        name: 'Rittenhouse Rye',
        details: 'Spicy with notes of dried fruit and toffee',
      },
      {
        name: 'Willett Family Estate Rye',
        details: 'Rich with caramel and spice notes',
      },
      {
        name: 'Pikesville Straight Rye',
        details: 'Bold with hints of cloves and cocoa',
      },
      {
        name: 'Sazerac Rye',
        details: 'Balanced with citrus, candied spice, and vanilla',
      },
      {
        name: 'WhistlePig 10 Year',
        details: 'Premium rye with depth and complexity',
      },
    ],
    irish: [
      {
        name: 'Redbreast 12 Year',
        details:
          'Single pot still with rich fruit, spice, and creamy mouthfeel',
      },
      {
        name: 'Green Spot',
        details: 'Fresh and aromatic with apple, pear, and spice notes',
      },
      {
        name: 'Jameson Black Barrel',
        details: 'Rich with nutty notes and spice from charred barrels',
      },
      {
        name: 'Bushmills 10 Year',
        details: 'Light and fruity with honey sweetness',
      },
      {
        name: "Powers John's Lane",
        details: 'Robust with leather, tobacco, and dark chocolate notes',
      },
    ],
    japanese: [
      {
        name: 'Nikka From The Barrel',
        details: 'Full-bodied blend with winter spice and toffee',
      },
      {
        name: 'Yamazaki 12 Year',
        details: 'Fruity and smooth with peach, grapefruit, and clove',
      },
      {
        name: 'Hibiki Japanese Harmony',
        details: 'Elegant blend with honey, orange, and light smoke',
      },
      {
        name: 'Hakushu 12 Year',
        details: 'Fresh and green with mint, melon, and subtle smoke',
      },
      {
        name: 'Mars Iwai Tradition',
        details: 'Bourbon-inspired with caramel and vanilla notes',
      },
    ],
  };

  // Default to bourbon if type not found
  const typeKey = type.toLowerCase() as keyof typeof recommendations;
  const recs = recommendations[typeKey] || recommendations.bourbon;

  let response = `# Recommended ${type} Whiskies\n\n`;
  response += `Here are some excellent ${type} whiskies you might enjoy:\n\n`;

  recs.forEach((rec, index) => {
    response += `${index + 1}. **${rec.name}**: ${rec.details}\n\n`;
  });

  response += `Let me know if you'd like more specific recommendations based on your taste preferences.`;

  return response;
}

// Define the system prompt
const systemPrompt = `You are Bob, a whisky expert AI assistant for the BAXUS ecosystem. 
Your main job is to analyze users' virtual bars to provide personalized bottle recommendations.

When users want recommendations or analysis, use the analyze_user_bar function with their username.
Speak in a friendly, knowledgeable tone about whisky. Be concise but informative.
Do not make up information about whisky that you are unsure about.

Here are some facts about different whisky types:
- Bourbon: American whiskey made from at least 51% corn, aged in new charred oak barrels
- Scotch: Whisky from Scotland, typically made from malted barley, aged at least 3 years
- Rye: Made from at least 51% rye grain, spicier than bourbon
- Irish Whiskey: Made in Ireland, triple distilled, smoother and lighter
- Japanese Whisky: Inspired by Scotch, often precise and balanced
`;

export async function runBobAgent(
  messages: BaseMessage[]
): Promise<BaseMessage[]> {
  try {
    // Extract the user message
    if (messages.length === 0) {
      return [
        new AIMessage(
          "I didn't receive a question. Feel free to ask me about whisky!"
        ),
      ];
    }

    const userMessage = messages[0].content.toString();
    console.log('Processing user message:', userMessage);

    // Check for common direct questions first

    // 1. Check against our whisky knowledge database
    const knowledgeAnswer = findWhiskyAnswer(userMessage);
    if (knowledgeAnswer) {
      console.log('Found answer in whisky knowledge database');
      return [new AIMessage(knowledgeAnswer)];
    }

    // 2. Check for specific recommendation requests
    const userMessageLower = userMessage.toLowerCase();

    // Direct handling for bourbon lover question
    if (
      userMessageLower.includes('bourbon lover') &&
      userMessageLower.includes('recommend')
    ) {
      console.log('Directly handling bourbon recommendation');
      return [new AIMessage(getWhiskyRecommendations('bourbon'))];
    }

    // Handle other whisky type recommendations
    const whiskyTypes = ['scotch', 'rye', 'irish', 'japanese'];
    for (const type of whiskyTypes) {
      if (
        userMessageLower.includes(type) &&
        userMessageLower.includes('recommend')
      ) {
        console.log(`Directly handling ${type} recommendation`);
        return [new AIMessage(getWhiskyRecommendations(type))];
      }
    }

    // Create the model with function calling capabilities
    const model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.7,
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    // Define the tool as a function definition for OpenAI
    const tools = [
      {
        type: 'function' as const,
        function: {
          name: 'analyze_user_bar',
          description:
            "Analyze a user's bar and get personalized bottle recommendations",
          parameters: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: 'Username of the BAXUS user to analyze',
              },
            },
            required: ['username'],
          },
        },
      },
    ];

    // Create the prompt template for user interaction
    const userPrompt = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemPrompt),
      new MessagesPlaceholder('history'),
    ]);

    // Create a simple chain that processes messages and can use tools
    const chain = userPrompt.pipe(model.bind({ tools }));

    // Run the chain with user messages
    console.log('Running LLM with messages:', messages);
    const result = await chain.invoke({
      history: messages,
    });
    console.log('LLM result:', result);

    // If there's a function call, process it
    if (result.additional_kwargs.function_call) {
      const functionCall = result.additional_kwargs.function_call;
      const toolName = functionCall.name;
      const args = JSON.parse(functionCall.arguments);

      let toolResult;
      if (toolName === 'analyze_user_bar') {
        toolResult = await analyzeUserBar(args.username);
      } else {
        toolResult = "I don't know how to execute that function.";
      }

      // Return the tool result along with the original result
      return [result, new AIMessage(toolResult)];
    }

    // If no function call, just return the result
    return [result];
  } catch (error) {
    console.error('Error running Bob agent:', error);
    return [
      new AIMessage(
        "I'm sorry, I encountered an error while processing your request."
      ),
    ];
  }
}
