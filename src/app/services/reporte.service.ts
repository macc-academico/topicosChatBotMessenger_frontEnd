import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GetUserService {
  url = 'https://bot-msg.herokuapp.com/';

  constructor(private httpClient: HttpClient) {}

  getData(data: QueryParams) {
    const userr = 'sistema/usuario/get_data_user';
    const url1 = `${this.url}${userr}?nombre=${data.nombre}&correo=${data.correo}&token=${data.token}`;
    return this.httpClient.post(url1, {}).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  insertData(data: any, datauser: QueryParams) {
    const userr = 'sistema/usuario/inser_data_user';
    const url1 = `${this.url}${userr}?nombre=${datauser.nombre}&correo=${datauser.correo}&token=${datauser.token}`;
    const json = JSON.stringify({
      cod_verf_aseg: data.cod_verf_aseg.toString(),
      sel_sini_aseg: data.sel_sini_aseg,
      inp_desc_aseg: data.inp_desc_aseg,
      inp_ubic_aseg: data.inp_ubic_aseg,
      foto_aseg: '',
      inp_plac_pers: data.inp_plac_pers,
      inp_nomb_pers: data.inp_nomb_pers,
      inp_docu_pers: data.inp_docu_pers,
      inp_tele_pers: data.inp_tele_pers,
      selectplaca: data.selectplaca,
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
