import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GetUserService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit, OnDestroy {
  data: QueryParams = { correo: '', nombre: '', token: '' };
  loading = true;
  mensaje = { ok: false, mensaje: '' };
  mensajeok = false;
  mensajeerror = false;
  loadingButton = false;
  sus: Subscription;
  usuarioSeg: any[];
  siniestros: any[];
  forma: FormGroup;
  formPersTerc = false;
  mensajeResp = '';

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private getUser: GetUserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sus = this.rutaActiva.queryParams.subscribe((params: QueryParams) => {
      this.data = params;
      console.log(this.data.correo);
      if (!(this.data.nombre && this.data.correo && this.data.token)) {
        this.router.navigate(['/']);
        return;
      }
      this.crearFormulario();
      this.validar(this.data);
    });
  }

  ngOnDestroy() {
    this.sus.unsubscribe();
    this.loading = true;
    this.formPersTerc = false;
    this.mensaje = { ok: false, mensaje: '' };
    this.mensajeok = false;
    this.mensajeerror = false;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      cod_verf_aseg: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{3})$')],
      ],
      selectplaca: ['', [Validators.required]],
      sel_sini_aseg: [''],
      inp_ubic_aseg: ['', [Validators.required]],
      inp_desc_aseg: [''],
      inp_plac_pers: [''],
      inp_nomb_pers: [''],
      inp_docu_pers: [''],
      inp_tele_pers: [''],
    });
  }

  validar(data: QueryParams) {
    let peticion: Observable<any>;
    peticion = this.getUser.getData(data);
    this.sus = peticion.subscribe((resp) => {
      this.loading = false;
      if (resp.ok) {
        this.usuarioSeg = resp.usuario_seg;
        this.siniestros = resp.siniestros;
      } else {
        this.mensaje.mensaje = resp.mensaje;
        // alert(resp.mensaje);
        this.mensaje.ok = true;
        // this.router.navigate(['/']);
      }
    });
  }

  guardar() {
    if (!this.forma.valid) {
      console.log('no enviar');
      return;
    }
    this.loadingButton = true;
    let peticion: Observable<any>;
    const data = this.forma.value;
    this.forma.disable();
    peticion = this.getUser.insertData(data, this.data);
    this.sus = peticion.subscribe((resp) => {
      this.mensajeResp = resp.mensaje || '';
      this.forma.enable();
      this.loadingButton = false;
      if (resp.ok) {
        alert('Reporte generado exitosamente');
        this.mensajeok = true;
        this.mensajeerror = false;
      } else {
        this.mensajeerror = true;
        this.mensajeok = false;
      }
    });
  }

  habFormTercero(tipSin: string) {
    const tipo = tipSin.toLocaleLowerCase();
    if (tipo === 'choque' || tipo === 'daños internos') {
      this.formPersTerc = true;
    } else {
      this.formPersTerc = false;
    }
  }
}

interface QueryParams {
  correo: string;
  nombre: string;
  token: string;
}
