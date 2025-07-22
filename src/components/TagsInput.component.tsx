/* eslint-disable no-unused-vars */
import React, { useState, KeyboardEvent, ChangeEvent } from "react";

export default function TagsInput({
    tags,
    setTags,
    maxTags = 5,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
  maxTags?: number;
}) {
    const [ inputValue, setInputValue ] = useState("");

    const addTag = (tag: string) => {
        const trimmed = tag.trim();

        if (
            trimmed &&
      !tags.includes(trimmed) &&
      tags.length < maxTags
        ) {
            setTags([ ...tags, trimmed ]);
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "," || e.key === "Enter") {
            e.preventDefault();

            if (inputValue) {
                addTag(inputValue);
                setInputValue("");
            }
        }

        if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            // Borrar último tag si input está vacío
            removeTag(tags.length - 1);
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (máx. {maxTags})</label>
            <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md px-2 py-1 min-h-[40px] focus-within:ring-2 focus-within:ring-zinc-900 transition-colors duration-200">
                {tags.map((tag, i) => (
                    <div
                        key={i}
                        className="cursor-default flex items-center bg-zinc-700 text-white text-sm rounded px-2 py-1 hover:bg-zinc-900 transition-colors duration-200"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(i)}
                            className="cursor-pointer ml-1 text-white hover:text-red-700 font-bold"
                            aria-label={`Remove tag ${tag}`}
                        >
              &times;
                        </button>
                    </div>
                ))}
                {tags.length < maxTags && (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        placeholder="Agregar tag y presionar ',' o Enter"
                        className="flex-grow outline-none py-1 text-sm "
                    />
                )}
            </div>
            {tags.length >= maxTags && (
                <p className="text-xs text-red-500 mt-1">Has alcanzado el máximo de {maxTags} tags.</p>
            )}
        </div>
    );
}
