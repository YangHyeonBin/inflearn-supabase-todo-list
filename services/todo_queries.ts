import { useMutation, useQuery } from "@tanstack/react-query";
import {
    TodoRowUpdate,
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "actions/todo-actions";
import { queryClient } from "app/config/ReactQueryClientProvider";

export function todosQuery(searchInput: string) {
    return useQuery({
        queryKey: ["todos", searchInput], // searchInput이 변경될 때 쿼리 재실행
        queryFn: () => getTodos({ searchInput }),
    });
}

export function createTodoMutation() {
    return useMutation({
        mutationFn: () =>
            createTodo({
                todo: {
                    // 기본 값 세팅
                    title: "New Todo",
                    completed: false,
                },
            }),
        onSuccess: () => {
            // 모든 todos 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
        onError: (error) => {
            console.error("Error creating todo:", error);
            throw error;
        },
    });
}

export function updateTodoMutation() {
    return useMutation({
        mutationFn: ({ todo }: { todo: TodoRowUpdate }) => updateTodo({ todo }),
        onSuccess: () => {
            // 모든 todos 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
        onError: (error) => {
            console.error("Error updating todo:", error);
            throw error;
        },
    });
}

export function deleteTodoMutation() {
    return useMutation({
        mutationFn: ({ id }: { id: number }) => deleteTodo({ id }),
        onSuccess: () => {
            // 모든 todos 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
        onError: (error) => {
            console.error("Error deleting todo:", error);
            throw error;
        },
    });
}
