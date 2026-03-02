type Admin = {
    id: string,
    email: string,
    name: string,
    imageUrl: string | null,
    createdAt: string,
    updatedAt: string,
};

export type LoginResponse = Admin;

export type ProfileResponse = Admin;