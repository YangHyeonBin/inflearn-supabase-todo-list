"use client";
// page.tsx가 서버 컴포넌트라 ui 관련 구현은 여기에서 모두 진행

import Todo from "components/todo";
import { useState } from "react";
import { createTodoMutation, todosQuery } from "services/todo_queries";

// import { Input } from "@material-tailwind/react"; // 버전 차이로 인한 오류 계속 발생해 일단 제거

export default function UI() {
    const [searchInput, setSearchInput] = useState("");
    const { data: todos, isLoading, error } = todosQuery(searchInput);
    const createTodo = createTodoMutation(); // createTodoMutation()을 호출하여 createTodoMutation 인스턴스를 생성

    return (
        <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
            <h1 className="text-xl">Todo List</h1>

            {/* 검색 */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        투두 찾기
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setSearchInput(e.target.value)}
                            placeholder="투두 제목을 입력해주세요"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>에러가 발생했습니다: {error.message}</div>
            ) : (
                todos &&
                todos.map((todo) => (
                    <Todo key={todo.id} id={todo.id} todo={todo} />
                ))
            )}

            <button
                className=" px-4 py-2 bg-black text-white rounded-md disabled:opacity-70"
                onClick={() => createTodo.mutate()}
                disabled={createTodo.isPending}>
                {createTodo.isPending ? (
                    <div className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        투두 추가 중...
                    </div>
                ) : (
                    <>
                        <i className="fas fa-plus mr-2"></i>
                        투두 추가하기
                    </>
                )}
            </button>
        </div>
    );
}
