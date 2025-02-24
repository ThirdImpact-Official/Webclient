export interface GetUserDto {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
    emailVerified: boolean;
    reportCount: number;
    roleId: number | null;
}