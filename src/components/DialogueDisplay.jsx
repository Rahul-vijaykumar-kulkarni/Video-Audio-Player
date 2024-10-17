import React from "react";
import { useAppContext } from "../context/AppContext";

const dialogues = [
  { original: "Hello, world!", translated: "¡Hola, mundo!" },
  { original: "How are you?", translated: "¿Cómo estás?" },
  { original: "Goodbye!", translated: "¡Adiós!" },
];

const DialogueDisplay = () => {
  const { currentDialogue, setCurrentDialogue } = useAppContext();
  const dialogue = dialogues[currentDialogue];

  return (
    <div className="dialogue-display mb-4">
      <h2 className="text-lg font-bold">Dialogue</h2>
      <div className="mt-2">
        <label className="block">Original Text:</label>
        <input
          type="text"
          value={dialogue.original}
          readOnly
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mt-2">
        <label className="block">Translated Text:</label>
        <input
          type="text"
          value={dialogue.translated}
          readOnly
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentDialogue((prev) => Math.max(prev - 1, 0))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentDialogue((prev) =>
              Math.min(prev + 1, dialogues.length - 1)
            )
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DialogueDisplay;
