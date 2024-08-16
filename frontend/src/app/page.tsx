"use client"; // フロントエンドコンポーネントであることを示す

import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<{ name: string; email: string }[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      // ユーザー作成後に再度APIを呼び出して全ユーザーを取得
      await fetchUsers();

      // フォームをリセット
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // 初回レンダリング時に全ユーザーを取得
  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
