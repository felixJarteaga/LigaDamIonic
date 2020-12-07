import {Injectable} from '@angular/core';
import {Equipo} from './modelo/Equipo';
import {Jornada} from './modelo/Jornada';

@Injectable({
    providedIn: 'root'
})
export class LigaService {
    private _nombresDeEquipos: String[];
    private _numeroDeJornada: number;
    private _equipoLocal: Equipo[];
    private _equipoVisitante: Equipo[];
    private _jornadas: Map<number, Jornada>;
    private _clasificacion: Map<number, Equipo[]>;


    constructor() {
        this._nombresDeEquipos = ['At.Madrid', 'R.Sociedad', 'Villareal', 'R.Madrid', 'Cadiz', 'Sevilla', 'Granada', 'R.Betis', 'Barcelona', 'Elche'];
        this._numeroDeJornada=this._nombresDeEquipos.length*2-2;
        this._equipoLocal=[];
        this._equipoVisitante=[];
        this._jornadas= new Map<number, Jornada>();
        this._clasificacion=new Map<number, Equipo[]>();
        this.repartirEquipos();

    }

    private repartirEquipos() {
        for (let index = 0; index < this._nombresDeEquipos.length; index++) {
            const equipo:Equipo=new Equipo(this._nombresDeEquipos[index]);
            if (index>=this._nombresDeEquipos.length/2){
                this._equipoLocal.push(equipo);
            }else{
                this._equipoVisitante.push(equipo);
            }
        }
    }
    public pedirJornada(numjornada:number):Jornada{
        if (this._jornadas.size!=0 && this._jornadas.get(numjornada)){
            return this._jornadas.get(numjornada);
        }else {
            this.jugarJornada(numjornada);
            return this._jornadas.get(numjornada);
        }
    }

    private jugarJornada(numjornada: number) {
        const jornada:Jornada=new Jornada(this._equipoLocal,this._equipoVisitante);
        this._jornadas.set(numjornada,jornada);
        this.actualizarClasificacion(numjornada);
        this.cuadrarSiguienteJornada();

    }

    private cuadrarSiguienteJornada() {
        let auxLocal=this._equipoLocal[this._equipoLocal.length-1];
        let auxVisitante=this._equipoVisitante[0];
        this._equipoVisitante.shift();
        this._equipoVisitante.push(auxLocal);
        for (let index:number=this._equipoLocal.length-1; index >0; index--) {
            if (index==1){
                this._equipoLocal[index]=auxVisitante;
                break;
            }else{
                this._equipoLocal[index]=this._equipoLocal[index-1];
            }

        }
    }

    private actualizarClasificacion(numjornada: number) {
        const arrayAuxiliarEquipos:Equipo[]=[];
        for (let index = 0; index < this._equipoLocal.length; index++) {
            arrayAuxiliarEquipos.push(this._equipoLocal[index]);
            arrayAuxiliarEquipos.push(this._equipoVisitante[index]);
        }
        let auxiliar:Equipo;
        for (let index = 0; index < arrayAuxiliarEquipos.length; index++) {
            for (let j = 0; j < arrayAuxiliarEquipos.length; j++) {
                if (index!=j && arrayAuxiliarEquipos[index].puntos>arrayAuxiliarEquipos[j].puntos){
                    auxiliar=arrayAuxiliarEquipos[j];
                    arrayAuxiliarEquipos[j]=arrayAuxiliarEquipos[index];
                    arrayAuxiliarEquipos[index]=auxiliar;
                }

            }

        }
        for (let index = 0; index < arrayAuxiliarEquipos.length; index++) {
            arrayAuxiliarEquipos[index].posicion=index+1;
        }
        this._clasificacion.set(numjornada,arrayAuxiliarEquipos);
    }
    public realizarClasificacion(numeroclasificacion:number):Equipo[]{
        let clasificacion:Equipo[]=this._clasificacion.get(numeroclasificacion);
        for (let index=0;index<clasificacion.length;index++){
            clasificacion[index].posicion=index+1;
        }
        return clasificacion;
    }


    get numeroDeJornada(): number {
        return this._numeroDeJornada;
    }
}
