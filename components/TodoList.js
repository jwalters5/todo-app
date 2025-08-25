"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import styles from "./TodoList.module.css";

export default function TodoList() {
    const [input, setInput] = useState("");
    const user = auth.currentUser;

    const todosRef = collection(db, "users", user.uid, "todos");
    const [todos] = useCollection(todosRef);

    const addTodo = async () => {
        if (!input.trim()) return;
        await addDoc(todosRef, { text: input });
        setInput("");
    };

    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, "users", user.uid, "todos", id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.addTodo}>
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="New todo"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className={styles.ul}>
                {todos?.docs.map((doc) => (
                    <li key={doc.id} className={styles.todoItem}>
                        {doc.data().text}
                        <button onClick={() => deleteTodo(doc.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}