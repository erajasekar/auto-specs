import { CarSpec } from '@/types/car';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

export async function searchCarSpecs(carModel: string): Promise<CarSpec | null> {
  try {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!apiKey) {
      console.warn('Perplexity API key not found, using placeholder data');
      return getPlaceholderData(carModel);
    }

    const prompt = `Please provide detailed specifications for the car model "${carModel}". I need the following information in a structured format:
    - Make and model
    - Year (latest available model year)
    - Engine type and horsepower
    - 0-60 mph acceleration time
    - Fuel type
    - MPG (combined)
    - Transmission type
    - Drivetrain
    
    Please respond with accurate, current information. If the car model is not specific enough, use the most popular or recent variant.`;

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from API');
    }

    // Parse the response and extract car specifications
    const carSpec = parseCarSpecsFromResponse(content, carModel);
    return carSpec;
    
  } catch (error) {
    console.error('Error fetching car specs:', error);
    return getPlaceholderData(carModel);
  }
}

function parseCarSpecsFromResponse(content: string, searchTerm: string): CarSpec {
  // This is a simplified parser - in a real app, you'd want more robust parsing
  // For now, we'll extract key information using regex patterns
  
  const makeModelMatch = searchTerm.match(/^(\w+)\s+(.+)$/);
  const make = makeModelMatch?.[1] || extractFromContent(content, /(?:Make|Brand):\s*(\w+)/i) || 'Unknown';
  const model = makeModelMatch?.[2] || extractFromContent(content, /Model:\s*([^\n]+)/i) || searchTerm;
  
  const year = parseInt(extractFromContent(content, /(?:Year|Model Year):\s*(\d{4})/i) || '2024');
  const engineType = extractFromContent(content, /Engine(?:\s+Type)?:\s*([^\n]+)/i) || 'V6';
  const horsepower = parseInt(extractFromContent(content, /(?:Horsepower|HP):\s*(\d+)/i) || '300');
  const zeroToSixty = extractFromContent(content, /0-?60(?:\s*mph)?:\s*([^\n]+)/i) || '6.0 seconds';
  const fuelType = extractFromContent(content, /Fuel(?:\s+Type)?:\s*([^\n]+)/i) || 'Gasoline';
  const mpg = extractFromContent(content, /MPG:\s*([^\n]+)/i) || '25 combined';
  const transmission = extractFromContent(content, /Transmission:\s*([^\n]+)/i) || 'Automatic';
  const drivetrain = extractFromContent(content, /(?:Drivetrain|Drive):\s*([^\n]+)/i) || 'FWD';

  return {
    make,
    model,
    year,
    engineType,
    horsepower,
    zeroToSixty,
    fuelType,
    mpg,
    transmission,
    drivetrain,
    imageUrl: `https://picsum.photos/400/300?random=${encodeURIComponent(make + model).replace(/[^a-zA-Z0-9]/g, '')}`
  };
}

function extractFromContent(content: string, regex: RegExp): string | null {
  const match = content.match(regex);
  return match?.[1]?.trim() || null;
}

function getPlaceholderData(carModel: string): CarSpec {
  // Placeholder data for when API is not available
  const placeholderData: Record<string, CarSpec> = {
    'toyota camry': {
      make: 'Toyota',
      model: 'Camry',
      year: 2024,
      engineType: '2.5L 4-Cylinder',
      horsepower: 203,
      zeroToSixty: '8.4 seconds',
      fuelType: 'Gasoline',
      mpg: '32 combined',
      transmission: '8-Speed Automatic',
      drivetrain: 'FWD',
      imageUrl: 'https://picsum.photos/400/300?random=ToyotaCamry'
    },
    'honda civic': {
      make: 'Honda',
      model: 'Civic',
      year: 2024,
      engineType: '2.0L 4-Cylinder',
      horsepower: 158,
      zeroToSixty: '8.2 seconds',
      fuelType: 'Gasoline',
      mpg: '35 combined',
      transmission: 'CVT',
      drivetrain: 'FWD',
      imageUrl: 'https://picsum.photos/400/300?random=HondaCivic'
    },
    'bmw 3 series': {
      make: 'BMW',
      model: '3 Series',
      year: 2024,
      engineType: '2.0L Turbo 4-Cylinder',
      horsepower: 255,
      zeroToSixty: '5.6 seconds',
      fuelType: 'Gasoline',
      mpg: '30 combined',
      transmission: '8-Speed Automatic',
      drivetrain: 'RWD',
      imageUrl: 'https://picsum.photos/400/300?random=BMW3Series'
    }
  };

  const key = carModel.toLowerCase();
  return placeholderData[key] || {
    make: 'Unknown',
    model: carModel,
    year: 2024,
    engineType: 'Unknown',
    horsepower: 0,
    zeroToSixty: 'Unknown',
    fuelType: 'Unknown',
    mpg: 'Unknown',
    transmission: 'Unknown',
    drivetrain: 'Unknown',
    imageUrl: `https://picsum.photos/400/300?random=${encodeURIComponent(carModel).replace(/[^a-zA-Z0-9]/g, '')}`
  };
}
