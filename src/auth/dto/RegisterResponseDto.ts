import { Exclude } from "class-transformer";
import { RegisterDto } from "./RegisterDto";


export class RegisterResponseDto extends RegisterDto {

    constructor(register: RegisterDto) {
        super();
        Object.assign(this, register);
    }

    @Exclude()
    password: string;
}