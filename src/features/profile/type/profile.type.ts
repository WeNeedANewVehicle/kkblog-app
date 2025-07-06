export type Profile = {
    id: string;
    createdAt: string
    updatedAt: string
    summary: string | null;
    bio: string | null;
    image: string | null;
    userId: string;
    user: {
        nickname: string;
        email: string;
    }
}