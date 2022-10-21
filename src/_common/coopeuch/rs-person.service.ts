import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import {
  RsPersonServiceTraerDatosBasicosRequest,
  RsPersonServiceTraerDatosBasicosResponse,
} from '@interfaces';

/**
 * Servicio Fuse RSServicioPersona
 * doc: https://confluence.coopeuch.cl/display/CIOS/ServicioPersona
 */
@Injectable()
export class RsPersonService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
  ) {}

  /**
   * doc: https://confluence.coopeuch.cl/display/CIOS/ServicioPersona#ServicioPersona-traerDatosBasicos
   * @param {RsPersonServiceTraerDatosBasicosRequest} payload
   * @return {RsPersonServiceTraerDatosBasicosResponse}
   */
  async getBasicData(
    payload: RsPersonServiceTraerDatosBasicosRequest,
  ): Promise<RsPersonServiceTraerDatosBasicosResponse> {
    const { data } =
      await this.httpService.axiosRef.post<RsPersonServiceTraerDatosBasicosResponse>(
        `${this.configService.get<string>(
          'RS_SERVICIO_PERSONA',
        )}/traerDatosBasicos`,
        payload,
      );

    return data;
  }
}
