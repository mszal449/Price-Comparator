"use client";
import React, { useState, useEffect } from "react";
import { IUser } from "types";

const UsersAdminPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Nie udało się pobrać użytkowników");
      }
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Nie udało się pobrać użytkowników:", error);
      setErrorMessage(true);
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role }),
      });
      if (!response.ok) {
        throw new Error("Nie udało się zaktualizować roli użytkownika");
      }
      fetchUsers();
    } catch (error) {
      console.error("Nie udało się zaktualizować roli użytkownika:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Nie udało się usunąć użytkownika");
      }
      fetchUsers();
    } catch (error) {
      console.error("Nie udało się usunąć użytkownika:", error);
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-around p-4">
      <h1 className="mb-5 text-2xl">Użytkownicy</h1>
      <div className="flex justify-around">
        {errorMessage && (
          <div className="text-red-500">
            Wystąpił błąd wczytywania użytkowników.
          </div>
        )}
        {users.length > 0 ? (
          <table className="min-w-full border border-gray-800">
            <thead>
              <tr>
                <th className="border border-gray-800 px-2 py-1 text-start">
                  ID
                </th>
                <th className="border border-gray-800 px-2 py-2 text-start">
                  Email
                </th>
                <th className="border border-gray-800 px-2 py-2 text-start">
                  Rola
                </th>
                <th className="border border-gray-800 px-2 py-2 text-start">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-800 px-2 py-2">
                    {user.id}
                  </td>
                  <td className="border border-gray-800 px-2 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-800 px-2 py-2">
                    {user.role}
                  </td>
                  <td className="border border-gray-800 px-2 py-2">
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user.id.toString(),
                          user.role === "admin" ? "user" : "admin",
                        )
                      }
                      className="mr-2 p-1 text-blue-500"
                    >
                      Zmień na {user.role === "admin" ? "użytkownik" : "admin"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id.toString())}
                      className="p-1 text-red-500"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Nie znaleziono użytkowników.</p>
        )}
      </div>
    </div>
  );
};

export default UsersAdminPage;
