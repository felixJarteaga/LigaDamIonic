import {Component} from '@angular/core';
import {Jornada} from '../core/modelo/Jornada';
import {Router} from '@angular/router';
import {LigaService} from '../core/liga.service';
import {Partido} from '../core/modelo/Partido';
import { Equipo } from '../core/modelo/Equipo';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
   private _page:any="jornada"
    private _jornadaMaxima: number;
    private _jornadaAnterior:number=0;
    private _jornadaActual:number=1;
    private _jornadaSiguiente:number=2;
    private _jornada:Jornada;

    // variables page clasificación
     private _clasificacionActual: number = 1;
    private _clasificacionPrevia: number = 0;
    private _clasificacionNext: number = 2;
    private _clasificacionMax: number;

    private _clasificacion: Equipo[];


    constructor(private route:Router,private liga:LigaService) {
        this._jornada=this.liga.pedirJornada(this._jornadaActual);
        this._jornadaMaxima=this.liga.numeroDeJornada;
    }

    public damePartidosJornada():Partido[]{
        let partidos=this._jornada.damePartidos();
        return partidos;
    }

    public cambiarPartidos(evt:any){
      
      let clase:string=evt.target.className;
      if (clase.indexOf("botonAnterior")){
            if (this._jornadaActual<this._jornadaMaxima){
                this._jornadaActual ++;
                this._jornadaSiguiente++;
                this._jornadaAnterior++;
                this._jornada=this.liga.pedirJornada(this._jornadaActual);
            }
        }
       
        
        if (clase.indexOf("botonSiguiente")&&this._jornadaAnterior!=0){
            this._jornadaActual =this._jornadaActual-1;
            this._jornadaSiguiente=this._jornadaSiguiente-1;
            this._jornadaAnterior=this._jornadaAnterior-1;
            this._jornada=this.liga.pedirJornada(this._jornadaActual);
        }
    }
 public cambiarPagina(page:String){
  this._page=page;
}
    


    get jornadaMaxima(): number {
        return this._jornadaMaxima;
    }

    get jornadaAnterior(): number {
        return this._jornadaAnterior;
    }

    get jornadaActual(): number {
        return this._jornadaActual;
    }

    get jornadaSiguiente(): number {
        return this._jornadaSiguiente;
    }

    get jornada(): Jornada {
        return this._jornada;
    }


      dameClasificacion(): Equipo[] {
        this.liga.pedirJornada(this._clasificacionActual);
        this._clasificacion = this.liga.realizarClasificacion(this._clasificacionActual);
        this._clasificacionMax = this.liga.numeroDeJornada;
        return this._clasificacion;
    }
 public cambiarClasificacion(evt: any) {
        let clases: string = evt.target.className;

        if (clases.indexOf('botonAnterior')) {
            if (this._clasificacionActual < this._clasificacionMax) {

                this._clasificacionActual += 1;
                this._clasificacionNext += 1;
                this._clasificacionPrevia += 1;
                this.liga.pedirJornada(this._clasificacionActual);
                this._clasificacion = this.liga.realizarClasificacion(this._clasificacionActual);
            }

        }
        if (clases.indexOf('botonSiguiente') && this._clasificacionPrevia != 0) {
            this._clasificacionActual -= 1;
            this._clasificacionNext -= 1;
            this._clasificacionPrevia -= 1;
            this.liga.pedirJornada(this._clasificacionActual);
            this._clasificacion = this.liga.realizarClasificacion(this._clasificacionActual);
        }

    }


    get clasificacionActual(): number {
        return this._clasificacionActual;
    }

    get clasificacionPrevia(): number {
        return this._clasificacionPrevia;
    }

    get clasificacionNext(): number {
        return this._clasificacionNext;
    }

    get clasificacionMax(): number {
        return this._clasificacionMax;
    }
}
