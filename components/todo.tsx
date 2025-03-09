"use client";

import { useState } from "react";

export default function Todo({
    id,
    value,
    completed,
}: {
    id: number;
    value: string;
    completed: boolean;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(value);
    const [isCompleted, setIsCompleted] = useState(completed);

    return (
        <div className="w-full flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setIsCompleted(e.target.checked);
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                ) : (
                    <p
                        className={`flex-1 text-gray-800 ${
                            isCompleted ? "line-through" : ""
                        }`}>
                        {title}
                    </p>
                )}
            </div>

            <div className="flex gap-2">
                {isEditing ? (
                    <button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setIsEditing(false);
                        }}
                        className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
                        <i className="fas fa-check"></i>
                    </button>
                ) : (
                    <button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setIsEditing(true);
                        }}
                        className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
                        <i className="fas fa-edit"></i>
                    </button>
                )}
                <button className="p-2 text-red-500 hover:text-red-700 transition-colors">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
}
