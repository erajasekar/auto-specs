# AutoSpecs

A modern web application for searching and comparing car specifications. Built with Next.js, TypeScript, shadcn/ui, and Tailwind CSS.

## Features

- 🔍 **Car Search**: Search for any car model and get detailed specifications
- 📊 **Specifications Display**: View key specs including engine, horsepower, 0-60 time, fuel type, and more
- 🔄 **Car Comparison**: Compare up to 4 cars side by side
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, minimalistic design with shadcn/ui components
- 🔄 **Fallback Data**: Placeholder data when API is unavailable

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **API**: Perplexity AI for car data (with fallback placeholder data)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd auto-specs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
echo "PERPLEXITY_API_KEY=your_perplexity_api_key_here" > .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### API Configuration

To use the Perplexity API for real car data:

1. Sign up for a Perplexity API account at [https://www.perplexity.ai/](https://www.perplexity.ai/)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file:
```
PERPLEXITY_API_KEY=your_actual_api_key_here
```

**Note**: The app works without an API key using placeholder data for popular car models.

## Usage

### Searching for Cars

1. Enter a car model in the search box (e.g., "Toyota Camry", "BMW 3 Series")
2. Click "Search" or press Enter
3. View the detailed specifications in a clean card layout

### Comparing Cars

1. Search for a car and click the "Compare" button
2. Search for additional cars to add to comparison
3. Switch to the "Compare" tab to view side-by-side comparison
4. Remove cars from comparison as needed

### Popular Search Examples

- Toyota Camry
- Honda Civic  
- BMW 3 Series
- Tesla Model 3
- Ford Mustang

## Project Structure

```
src/
├── app/
│   ├── api/car-specs/     # API route for car specifications
│   ├── globals.css        # Global styles
│   └── page.tsx          # Main page component
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── CarSearch.tsx     # Search input component
│   ├── CarSpecCard.tsx   # Car specification display
│   └── CarComparison.tsx # Car comparison component
├── lib/
│   ├── perplexity.ts     # Perplexity API integration
│   └── utils.ts          # Utility functions
└── types/
    └── car.ts            # TypeScript interfaces
```

## API Endpoints

### GET /api/car-specs

Fetch car specifications for a given model.

**Parameters:**
- `model` (string): Car model to search for

**Response:**
```json
{
  "success": true,
  "data": {
    "make": "Toyota",
    "model": "Camry",
    "year": 2024,
    "engineType": "2.5L 4-Cylinder",
    "horsepower": 203,
    "zeroToSixty": "8.4 seconds",
    "fuelType": "Gasoline",
    "mpg": "32 combined",
    "transmission": "8-Speed Automatic",
    "drivetrain": "FWD",
    "imageUrl": "..."
  }
}
```

## Customization

### Adding New Car Data

To add more placeholder car data, edit the `placeholderData` object in `src/lib/perplexity.ts`.

### Styling

The app uses Tailwind CSS with shadcn/ui components. Customize the theme by modifying:
- `tailwind.config.js` for Tailwind configuration
- `src/app/globals.css` for global styles
- Individual component files for component-specific styles

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.