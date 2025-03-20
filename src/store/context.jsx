import { createContext, useEffect, useState } from "react";


// Context for Dark Mode
export const DarkModeContext = createContext();

// Context for Cards
export const CardsContext = createContext();



export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const savedDarkMode = localStorage.getItem("kanban-dark-mode");
      return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
  
    useEffect(() => {
      localStorage.setItem("kanban-dark-mode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);
  
    const toggleDarkMode = () => {
      setIsDarkMode((prev) => !prev);
    };
  
    return (
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    );
  };
  
  export const CardsProvider = ({ children }) => {
    const [cards, setCards] = useState(() => {
      const savedCards = localStorage.getItem("kanban-cards");
      return savedCards ? JSON.parse(savedCards) : [];
    });
  
    // History state
    const [history, setHistory] = useState([cards]); // Initialize with the current state
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current position in history
  
    // Save cards to local storage whenever the cards state changes
    useEffect(() => {
      localStorage.setItem("kanban-cards", JSON.stringify(cards));
    }, [cards]);
  
    // Update history when cards state changes
    useEffect(() => {
      if (cards !== history[currentIndex]) {
        const newHistory = history.slice(0, currentIndex + 1); // Remove future history
        setHistory([...newHistory, cards]);
        setCurrentIndex(newHistory.length);
      }
    }, [cards]);
  
    // Undo function
    const undo = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setCards(history[currentIndex - 1]);
      }
    };
  
    // Redo function
    const redo = () => {
      if (currentIndex < history.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setCards(history[currentIndex + 1]);
      }
    };
  
    return (
      <CardsContext.Provider value={{ cards, setCards, undo, redo, currentIndex, history }}>
        {children}
      </CardsContext.Provider>
    );
  };