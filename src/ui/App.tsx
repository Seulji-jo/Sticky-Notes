import React, { useState } from 'react';
import useRandomQuotes from './hooks/useRandomQuotes';
import { requestGenerateRandomQuoteToPlugin } from './lib/figma';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const getRandomQuote = useRandomQuotes();

  const generateRandomQuote = async () => {
    setIsLoading(true);
    const randomQuote = await getRandomQuote();
    // console.log(randomQuote);
    requestGenerateRandomQuoteToPlugin(randomQuote);

    setIsLoading(false);
  };
  return (
    <main>
      <span>Select Text Node and Click</span>
      <button type="button" onClick={generateRandomQuote}>
        {isLoading ? 'Loading...' : 'Random Quote'}
      </button>
    </main>
  );
}

export default App;
