import FormUtils from "@/classes/FormUtils";


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
export const UserColumns = [
    FormUtils.TableMapper("ID", "userId"),
    FormUtils.TableMapper("username", "username"),
    FormUtils.TableMapper("first name", "firstName"),
    FormUtils.TableMapper("last name", "lastName"),
    FormUtils.TableMapper("email", "email"),
    FormUtils.TableMapper("picture", "picture"),
    FormUtils.TableMapper("email verified", "emailVerified"),
    FormUtils.TableMapper("report count", "reportCount"),
    FormUtils.TableMapper("role id", "roleId"),
];