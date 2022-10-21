import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import {
  RsAuthServiceValidaUserRequest,
  RsAuthServiceValidaUserResponse,
} from '@interfaces';

/**
 * Servicio Fuse RsServicioAutenticacion
 * doc: https://confluence.coopeuch.cl/display/CIOS/ServicioAutenticacion
 */
@Injectable()
export class RsAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
  ) {}

  /**
   * doc: https://confluence.coopeuch.cl/display/CIOS/ServicioAutenticacion#ServicioAutenticacion-ValidaUser
   * @param {RsAuthServiceValidaUserRequest} payload
   * @return {RsAuthServiceValidaUserResponse}
   */
  async validateUser(
    payload: RsAuthServiceValidaUserRequest,
  ): Promise<RsAuthServiceValidaUserResponse> {
    const { data } =
      await this.httpService.axiosRef.post<RsAuthServiceValidaUserResponse>(
        `${this.configService.get<string>(
          'RS_SERVICIO_AUTENTICACION',
        )}/validaUser`,
        payload,
      );

    return data;
  }
}
