"use client";

import { TodoRow } from "actions/todo-actions";
import { useRef, useState } from "react";
import { deleteTodoMutation, updateTodoMutation } from "services/todo_queries";

export default function Todo({ id, todo }: { id: number; todo: TodoRow }) {
    const titleInputRef = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    const updateTodo = updateTodoMutation();
    const deleteTodo = deleteTodoMutation();

    const handleUpdate = ({
        newTitle,
        newCompleted,
    }: {
        newTitle?: string;
        newCompleted?: boolean;
    }) => {
        updateTodo.mutate(
            {
                todo: {
                    id,
                    title: newTitle ?? title,
                    completed: newCompleted ?? completed,
                    completed_at: newCompleted
                        ? new Date().toISOString()
                        : null,
                },
            },
            {
                onSuccess: () => {
                    // updateTodoMutation의 onSuccess 콜백과 함께 실행할 함수
                    // 컴포넌트 내부 상태관리!
                    setIsEditing(false);
                },
            }
        );
    };

    return (
        <div className="w-full flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newCompleted = e.target.checked; // 정확한 값 업데이트를 위해
                        setCompleted(newCompleted); // promise를 반환하지 않아 await해도 작업 완료까지 기다리지 않음
                        handleUpdate({ newCompleted });
                    }}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {isEditing ? (
                    <input
                        ref={titleInputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                ) : (
                    <div className="flex-1">
                        <p
                            className={`text-gray-800 ${
                                completed ? "line-through" : ""
                            }`}>
                            {title}
                        </p>
                        {todo.created_at && (
                            <span className="text-xs text-gray-400">
                                <i className="fas fa-clock mr-1" />
                                {new Date(todo.created_at).toLocaleString()}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                {isEditing ? (
                    <button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            const newTitle =
                                titleInputRef.current?.value || title;
                            handleUpdate({ newTitle });
                        }}
                        disabled={updateTodo.isPending}
                        className="p-2 text-blue-500 hover:text-blue-700 transition-colors disabled:opacity-70">
                        {updateTodo.isPending ? (
                            <i className="fas fa-spinner fa-spin" />
                        ) : (
                            <i className="fas fa-check"></i>
                        )}
                    </button>
                ) : (
                    <button
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setIsEditing(true);
                            titleInputRef.current?.focus();
                        }}
                        className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
                        <i className="fas fa-edit"></i>
                    </button>
                )}
                <button
                    className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => deleteTodo.mutate({ id })}>
                    {deleteTodo.isPending ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <i className="fas fa-trash"></i>
                    )}
                </button>
            </div>
        </div>
    );
}
