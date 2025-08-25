"use client"
import Auth from "@/components/Auth";
import TodoList from "@/components/TodoList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <main className="main">
      <h1>Todo App</h1>
      <Auth />
      {user && <TodoList />}
      
    </main>
  );
}
