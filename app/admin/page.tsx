import React from "react";

const AdminPage = async () => {
  return (
    <div className="text-center">
      <div className="mb-5 text-2xl">Panel Administratora</div>
      <div>
        <a
          href="/admin/users"
          className="rounded-md bg-slate-800 p-2 text-2xl duration-150 ease-in hover:bg-slate-700"
        >
          Użytkownicy
        </a>
      </div>
    </div>
  );
};

export default AdminPage;
