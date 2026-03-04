import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    body: string;

    @IsNotEmpty()
    userId: number;
}
