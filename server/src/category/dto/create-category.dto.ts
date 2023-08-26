import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCategoryDto {
    @IsNotEmpty()
    // @MinLength(6, { message: 'Password must more then 6 symbols' })
    title:string

    @IsOptional()
    user?:User
}
