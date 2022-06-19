import { ApiProperty } from "@nestjs/swagger";
import { ILoginResponse } from "../interfaces/ILoginResponse";
import { ProfileDto } from "./ProfileDto";

export class LoginResponseDto {

    constructor(partial: Partial<ILoginResponse>) {
        Object.assign(this, partial)
    }

    @ApiProperty()
    token: string;

    @ApiProperty()
    user: ProfileDto
}