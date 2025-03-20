import React from 'react'
import { CustomKanban } from './Pages/NotionKanban'
import { CardsProvider, DarkModeProvider } from './store/context';


const App = () => {
  return (
    <DarkModeProvider>
      <CardsProvider>
        <CustomKanban />
      </CardsProvider>
    </DarkModeProvider>
  );
};

export default App;