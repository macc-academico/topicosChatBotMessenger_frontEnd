import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReclamoUserService {
  url = 'https://bot-msg.herokuapp.com/';

  constructor(private httpClient: HttpClient) {}

  getData(data: QueryParams) {
    const userr = 'sistema/reclamo/get_data_user';
    const url1 = `${this.url}${userr}?nombre=${data.nombre}&correo=${data.correo}&token=${data.token}`;
    return this.httpClient.post(url1, {}).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  insertData(data: any, datauser: QueryParams) {
    const userr = 'sistema/reclamo/inser_data_user';
    const url1 = `${this.url}${userr}?nombre=${datauser.nombre}&correo=${datauser.correo}&token=${datauser.token}`;
    const json = JSON.stringify({
      cod_verf_aseg: data.cod_verf_aseg.toString(),
      tipo_seguro: data.tipo_seguro,
      tipo_servicio: data.tipo_servicio,
      descripcion: data.descripcion,
      sugerencia: data.sugerencia,
    });
    return this.httpClient
      .post(url1, json, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }
}

interface QueryParams {
  correo: string;
  nombre: string;
  token: string;
}
interface Result {
  ok: boolean;
  mensaje: any;
}
