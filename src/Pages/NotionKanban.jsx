import React, { useContext } from "react";
import { Column } from "../Pages/Column";
import { BurnBarrel } from "./BurnBarrel";
import { CardsContext, DarkModeContext } from "../store/context";
import { IoIosUndo } from "react-icons/io";
import { IoIosRedo } from "react-icons/io";

export const CustomKanban = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { undo, redo, currentIndex, history } = useContext(CardsContext);

  return (
    <div className={`h-screen w-full transition-colors duration-300 ${
      isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
    }`}>
      {/* Undo/Redo Buttons */}
      <div className="flex  justify-end items-center gap-5 p-5">
      <div className=" top-4 left-4 flex gap-2">
        <button
          onClick={undo}
          disabled={currentIndex === 0}
          className="px-3 py-1.5  text-neutral-500 rounded-md text-2xl "
        >
          <IoIosUndo />
        </button>
        <button
          onClick={redo}
          disabled={currentIndex === history.length - 1}
          className="px-3 py-1.5  text-neutral-500 rounded-md text-2xl"
        >
          <IoIosRedo />
        </button>
      </div>
      {/* Dark Mode Toggle Button */}
      <div className=" top-4 right-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          
          <div
            className={`w-20 h-10 rounded-full bg-gradient-to-r ${
              isDarkMode ? "from-blue-400 to-indigo-500" : "from-yellow-300 to-orange-400"
            } transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 ${
              isDarkMode ? "after:translate-x-10 after:content-['🌙']" : ""
            } after:shadow-md after:text-lg`}
          ></div>
        </label>
      </div>

      </div>
      

      {/* Render the Board */}
      <Board />
    </div>
  );
};

const Board = () => {
  const { cards, setCards } = useContext(CardsContext);

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full gap-3 overflow-scroll p-5">
        <Column
          title="To-Do"
          column="to-do"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="General_Information"
          column="information"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In_progress"
          column="progressing"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Paused"
          column="paused"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Ready to Launch"
          column="complete"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <BurnBarrel setCards={setCards} />
      </div>
    </div>
  );
};