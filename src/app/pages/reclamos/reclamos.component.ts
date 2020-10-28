import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ReclamoUserService } from '../../services/reclamo.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css'],
})
export class ReclamosComponent implements OnInit {
  data = { correo: '', nombre: '', token: '' };
  loading = true;
  mensaje = { ok: false, mensaje: '' };
  mensajeok = false;
  mensajeerror = false;
  loadingButton = false;
  sus: Subscription;
  seguros: any[];
  servicios: any[];
  forma: FormGroup;
  formPersTerc = false;
  mensajeResp = '';

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private reclamoUser: ReclamoUserService,
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
    setTimeout(() => {
      window.close();
    }, 3500);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      cod_verf_aseg: [
        '',
        [Validators.required, Validators.pattern('^([0-9]{3})$')],
      ],
      tipo_seguro: ['', [Validators.required]],
      tipo_servicio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sugerencia: [''],
    });
  }

  validar(data: QueryParams) {
    let peticion: Observable<any>;
    peticion = this.reclamoUser.getData(data);
    this.sus = peticion.subscribe((resp) => {
      this.loading = false;
      if (resp.ok) {
        this.seguros = resp.seguros;
        this.servicios = resp.servicios;
      } else {
        this.mensaje.mensaje = resp.mensaje;
        // alert(resp.mensaje);
        // this.router.navigate(['/']);
        this.mensaje.ok = true;
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
    peticion = this.reclamoUser.insertData(data, this.data);
    this.sus = peticion.subscribe((resp) => {
      this.mensajeResp = resp.mensaje || '';
      this.forma.enable();
      this.loadingButton = false;
      if (resp.ok) {
        this.mensajeok = true;
        this.mensajeerror = false;
        setTimeout(() => {
          window.close();
        }, 3500);
      } else {
        this.mensajeerror = true;
        this.mensajeok = false;
      }
    });
  }
}

interface QueryParams {
  correo: string;
  nombre: string;
  token: string;
}
