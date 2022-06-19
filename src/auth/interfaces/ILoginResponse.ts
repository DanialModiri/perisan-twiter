import { UserDto } from "../dto/UserDto";

export interface ILoginResponse {
    token: string;
    user: UserDto;
}