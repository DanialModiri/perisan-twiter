import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IUser } from "../interfaces/IUser";
import { UserDto } from "./UserDto";

export class ProfileDto implements IUser {

  constructor(partial: UserDto) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  bio: string;

  @Exclude()
  id: number;

  @Exclude()
  password: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @Exclude()
  createdAt;

  @Exclude()
  updatedAt;

}