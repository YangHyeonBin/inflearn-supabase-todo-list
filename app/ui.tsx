"use client";

// page.tsx가 서버 컴포넌트라 ui 관련 구현은 여기에서 모두 진행

export default function UI() {
    return (
        <div
            className="w-2/3 mx-auto flex flex-col items-center"
            style={{ padding: "2.5rem 0" }}>
            <h1 className="text-xl">Todo List</h1>
        </div>
    );
}
