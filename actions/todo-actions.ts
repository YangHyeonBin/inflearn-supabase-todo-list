"use server";
// 서버 액션 사용할 서버 컴포넌트

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo"]["Update"];

function handleError(error: Error) {
    console.error(error);
    throw new Error(error.message);
}

export async function getTodos({
    searchInput = "",
}: {
    searchInput: string;
}): Promise<TodoRow[]> {
    const supabase = await createServerSupabaseClient();

    // title 값에 searchInput을 앞/뒤에 포함하고 있는 투두를 조회
    const { data: todos, error } = await supabase
        .from("todo")
        .select("*")
        .like("title", `%${searchInput}%`)
        .order("created_at", { ascending: false });

    if (error) {
        handleError(error);
    }

    return todos || []; // null 이면 빈 배열 반환
}

export async function createTodo({ todo }: { todo: TodoRowInsert }) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from("todo").insert({
        ...todo,
        created_at: new Date().toISOString(), // 정확한 정보를 저장하기 위해
    });

    if (error) {
        handleError(error);
    }

    return data; // insert 는 어떤 타입의 data를 리턴하는 걸까?
}

export async function updateTodo({ todo }: { todo: TodoRowUpdate }) {
    const supabase = await createServerSupabaseClient();

    if (!todo.id) {
        handleError(new Error("id is required"));
    }

    const { data, error } = await supabase
        .from("todo")
        .update({
            ...todo,
            updated_at: new Date().toISOString(),
        })
        .eq("id", todo.id!);

    if (error) {
        handleError(error);
    }

    return data;
}

export async function deleteTodo({ id }: { id: number }) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase.from("todo").delete().eq("id", id);

    if (error) {
        handleError(error);
    }

    return data;
}
