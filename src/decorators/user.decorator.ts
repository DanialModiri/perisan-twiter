import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IJWTPayload } from "src/auth/interfaces/IJWTPayload";

export const User = createParamDecorator<any, any, IJWTPayload>((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IJWTPayload;
})