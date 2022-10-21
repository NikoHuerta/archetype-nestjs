import { ApiProperty } from '@nestjs/swagger';

export class GlobalErrorDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  method: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  externalRequest: {
    method: string;
    url: string;
    data: string;
  };

  @ApiProperty()
  sql: {
    query: string;
    message: string;
    parameters: string;
  };
}
