import React, { useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { Card } from "./Card";
import { DropIndicator } from "./DropIndicator";
import { AddCard } from "./Add";


export const Column = ({ title, headingColor, cards, column, setCards }) => {
    const [active, setActive] = useState(false);
  
    const handleDragStart = (e, card) => {
      e.dataTransfer.setData("cardId", card.id);
    };
  
    const handleDragEnd = (e) => {
      const cardId = e.dataTransfer.getData("cardId");
    
      setActive(false);
      clearHighlights();
    
      const indicators = getIndicators();
      const { element } = getNearestIndicator(e, indicators);
    
      const before = element.dataset.before || "-1";
    
      if (before !== cardId) {
        let copy = [...cards];
    
        let cardToTransfer = copy.find((c) => c.id === cardId);
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, column };
    
        copy = copy.filter((c) => c.id !== cardId);
    
        const moveToBack = before === "-1";
    
        if (moveToBack) {
          copy.push(cardToTransfer);
        } else {
          const insertAtIndex = copy.findIndex((el) => el.id === before);
          if (insertAtIndex === undefined) return;
    
          copy.splice(insertAtIndex, 0, cardToTransfer);
        }
    
        setCards(copy); // Update the cards state
      }
    };
    
    const handleDragOver = (e) => {
      e.preventDefault();
      highlightIndicator(e);
  
      setActive(true);
    };
  
    const clearHighlights = (els) => {
      const indicators = els || getIndicators();
  
      indicators.forEach((i) => {
        i.style.opacity = "0";
      });
    };
  
    const highlightIndicator = (e) => {
      const indicators = getIndicators();
  
      clearHighlights(indicators);
  
      const el = getNearestIndicator(e, indicators);
  
      el.element.style.opacity = "1";
    };
  
    const getNearestIndicator = (e, indicators) => {
      const DISTANCE_OFFSET = 50;
  
      const el = indicators.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
  
          const offset = e.clientY - (box.top + DISTANCE_OFFSET);
  
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        {
          offset: Number.NEGATIVE_INFINITY,
          element: indicators[indicators.length - 1],
        }
      );
  
      return el;
    };
  
    const getIndicators = () => {
      return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };
  
    const handleDragLeave = () => {
      clearHighlights();
      setActive(false);
    };
  
    const filteredCards = cards.filter((c) => c.column === column);
  
    return (
      <div className="w-64 shrink-0 bg-[#EBECF0] h-fit p-4 rounded-lg   ">
        <div className="mb-3 flex items-center justify-between  ">
          <h3 className={`font-medium ${headingColor}`}>{title}</h3>
  
          <span className="rounded text-sm  text-neutral-400 ">
          <BsThreeDotsVertical />
          </span>
        </div>
        <div
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={` w-full transition-colors   overflow-y-auto ${
            active
              ? "bg-neutral-800/50 overflow-y-auto "
              : "bg-neutral-800/0 overflow-y-auto "
          }`}
        >
          {filteredCards.map((c) => {
            return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
          })}
          <DropIndicator beforeId={null} column={column} />
          <AddCard column={column} setCards={setCards} />
        </div>
      </div>
    );
  };
  