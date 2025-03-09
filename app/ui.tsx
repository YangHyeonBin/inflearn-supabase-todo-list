"use client";

import Todo from "components/todo";

// import { Input } from "@material-tailwind/react"; // 버전 차이로 인한 오류 계속 발생해 일단 제거

// page.tsx가 서버 컴포넌트라 ui 관련 구현은 여기에서 모두 진행

export default function UI() {
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
                            placeholder="투두 제목을 입력해주세요"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>

            <Todo id={1} value={"New Todo"} completed={false} />

            <button className=" px-4 py-2 bg-black text-white rounded-md">
                <i className="fas fa-plus mr-2"></i>
                투두 추가하기
            </button>
        </div>
    );
}
