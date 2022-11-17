import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import {
  RsPersonServiceTraerDatosBasicosRequest,
  RsPersonServiceTraerDatosBasicosResponse,
} from '@interfaces';

/**
 * Example REST API Service 2
 * docs: ***
 */
@Injectable()
export class RsExample2Service {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<NodeJS.ProcessEnv>,
  ) {}

  /**
   * doc: **********
   * @param {RsPersonServiceTraerDatosBasicosRequest} payload
   * @return {RsPersonServiceTraerDatosBasicosResponse}
   */
  async getBasicData(
    payload: RsPersonServiceTraerDatosBasicosRequest,
  ): Promise<RsPersonServiceTraerDatosBasicosResponse> {
    const { data } =
      await this.httpService.axiosRef.post<RsPersonServiceTraerDatosBasicosResponse>(
        `${this.configService.get<string>('RS_EXAMPLE_2')}/exampleEndpoint`,
        payload,
      );

    return data;
  }
}
