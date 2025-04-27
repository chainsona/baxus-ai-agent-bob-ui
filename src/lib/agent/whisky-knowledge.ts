/**
 * Whisky knowledge database for common questions
 */

// Common whisky questions and answers
export const whiskyFAQ: Record<string, string> = {
  'bourbon production':
    'Bourbon must be made in the United States, primarily from corn (at least 51%), aged in new charred oak barrels, and distilled to no more than 160 proof (80% alcohol by volume). It must be bottled at a minimum of 80 proof (40% alcohol by volume).',

  'scotch regions':
    'Scotland is divided into five major whisky-producing regions: Highlands, Lowlands, Speyside, Islay, and Campbeltown. Each region has its own distinctive styles and characteristics. Highland whiskies are often full-bodied, Speyside whiskies tend to be elegant and complex with honey and fruit flavors, Islay whiskies are known for their strong peaty, smoky character, Lowland whiskies are typically lighter and more delicate, and Campbeltown whiskies often have a unique briny character.',

  'rye whiskey':
    'Rye whiskey in the United States must be made from a mash of at least 51% rye grain. It tends to be spicier and less sweet than bourbon, with peppery and grassy notes. Popular brands include Rittenhouse, Sazerac, and WhistlePig.',

  'whisky vs whiskey':
    'The spelling difference is primarily regional. Generally, "whisky" (without the "e") refers to Scotch, Canadian, and Japanese spirits, while "whiskey" (with the "e") refers to American and Irish spirits. This convention is not always strictly followed by all producers.',

  'age statements':
    'An age statement on a whisky bottle indicates the age of the youngest whisky used in that product. For example, a "12-year-old Scotch" means that all whisky in that bottle has been aged for at least 12 years.',

  peat: 'Peat is partially decayed vegetation matter that has been compressed in the earth over thousands of years. In Scotch production, peat is burned during the malting process to dry the barley, imparting smoky flavors to the finished whisky. The level of peatiness is measured in phenol parts per million (ppm).',

  'cask strength':
    'Cask strength (or barrel proof) whisky is bottled directly from the cask, with little to no dilution. These whiskies typically have a higher alcohol content, often ranging from 50-65% ABV, and offer more intense flavors.',

  'single malt':
    'Single malt Scotch is made at a single distillery using only malted barley as the grain. It must be distilled in pot stills and aged for at least 3 years in oak barrels in Scotland.',

  'blended whisky':
    'Blended whisky combines malt whisky with grain whisky from multiple distilleries. The purpose of blending is to achieve consistency and a specific flavor profile. Many popular Scotch brands like Johnnie Walker and Chivas Regal are blends.',

  'bourbon barrels':
    'By law, bourbon must be aged in new charred oak barrels. After bourbon producers use these barrels once, they often sell them to producers of other spirits like Scotch, rum, and tequila for aging their products.',

  finish:
    'In whisky tasting, "finish" refers to the lingering flavors that remain after swallowing the whisky. A long finish is generally considered a sign of quality. Finish can also refer to the practice of aging whisky in a second cask (like sherry or port) to add additional flavors.',

  'angels share':
    "The angel's share is the portion of whisky that evaporates during barrel aging, typically 2-4% annually. This evaporation is crucial to the maturation process, concentrating flavors over time.",

  'glencairn glass':
    "The Glencairn glass is a tulip-shaped whisky glass designed to enhance the nosing and tasting experience. Its shape concentrates aromas at the top while letting you evaluate the whisky's color and body.",

  'sour mash':
    'In bourbon production, sour mash refers to the process of adding some of the spent mash (leftover from distillation) into the new mash before fermentation. This helps maintain consistency between batches and creates a slightly acidic environment that favors flavor development.',

  'straight bourbon':
    "Straight bourbon must meet all bourbon requirements plus be aged for a minimum of 2 years. If it's aged less than 4 years, the age must be stated on the label.",
};

// Function to match questions to answers
export function findWhiskyAnswer(question: string): string | null {
  const queryLower = question.toLowerCase();

  // Check for exact matches first
  for (const [key, answer] of Object.entries(whiskyFAQ)) {
    if (queryLower.includes(key)) {
      return answer;
    }
  }

  // Handle specific question patterns
  if (queryLower.includes('what is') || queryLower.includes('tell me about')) {
    for (const [key, answer] of Object.entries(whiskyFAQ)) {
      // Extract the topic after "what is" or "tell me about"
      const whatIsMatch = queryLower.match(/what is\s+(\w+(\s+\w+)*)/);
      const tellMeMatch = queryLower.match(/tell me about\s+(\w+(\s+\w+)*)/);

      const topic = whatIsMatch?.[1] || tellMeMatch?.[1];

      if (topic && key.includes(topic)) {
        return answer;
      }
    }
  }

  // No match found
  return null;
}
