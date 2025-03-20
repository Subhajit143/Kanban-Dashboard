import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit } from "react-icons/fi";
import { DropIndicator } from "./DropIndicator";
import { CardsContext } from "../store/context";
import { EditTaskModal } from "./EditTaskModal";

export const Card = ({
  title,
  id,
  status,
  column,
  assignee,
  start,
  end,
  handleDragStart,
}) => {
  const { setCards } = useContext(CardsContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded border border-neutral-300  bg-[#FFFFFF] p-3 active:cursor-grabbing "
      >
        <p className="text-sm text-neutral-500 font-semibold pb-4">{title}</p>

        <p className="text-xs text-neutral-400">Status : {status}</p>
        <div className="flex justify-between">
          <div>
            <div className="flex items-center text-xs text-neutral-400">
              {start && <p className="mr-1">Start :</p>}
              <p>{start}</p>
            </div>
            <div className="flex items-center text-xs text-neutral-400">
              {end && <p className="mr-1">End :</p>}
              <p>{end}</p>
            </div>
          </div>

          <div className="flex gap-5 justify-center items-center">
            <button
              onClick={handleEditClick}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <FiEdit />
            </button>
            <img
              src={assignee.avatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Render the edit form modal */}
      {isEditing && (
        <EditTaskModal
          card={{ id, title, status, assignee, start, end, column }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};
