import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import {
  RsAuthServiceValidaUserRequest,
  RsAuthServiceValidaUserResponse,
} from '@interfaces';

/**
 * Example REST API Service
 * docs: ***
 */
@Injectable()
export class RsExampleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
  ) {}

  /**
   * doc: **********
   * @param {RsAuthServiceValidaUserRequest} payload
   * @return {RsAuthServiceValidaUserResponse}
   */
  async validateUser(
    payload: RsAuthServiceValidaUserRequest,
  ): Promise<RsAuthServiceValidaUserResponse> {
    const { data } =
      await this.httpService.axiosRef.post<RsAuthServiceValidaUserResponse>(
        `${this.configService.get<string>('RS_EXAMPLE')}/exampleEndpoint`,
        payload,
      );

    return data;
  }
}
