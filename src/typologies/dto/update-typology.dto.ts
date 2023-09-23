import { PartialType } from '@nestjs/mapped-types';
import { CreateTypologyDto } from './create-typology.dto';

export class UpdateTypologyDto extends PartialType(CreateTypologyDto) {}
