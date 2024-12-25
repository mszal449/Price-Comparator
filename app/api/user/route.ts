import { NextResponse } from "next/server";
import { getUsers, updateUserRole, deleteUser } from "services/userService";

export async function GET() {
  try {
    const users = await getUsers();
    console.log(users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  const { id, role } = await req.json();
  try {
    await updateUserRole(id, role);
    return NextResponse.json(
      { message: "User role updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to update user role:", error);
    return NextResponse.json(
      { message: "Failed to update user role" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    await deleteUser(id);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 },
    );
  }
}
