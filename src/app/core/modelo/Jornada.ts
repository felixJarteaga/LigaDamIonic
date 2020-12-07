import {Equipo} from './Equipo';
import {Partido} from './Partido';

export class Jornada {

    private _equipoLocal: Equipo[];
    private _equipoVisitante: Equipo[];
    private _partido: Map<String, Partido> = new Map<String, Partido>();
    private _numeroPartidosJornada = 5;

    constructor(equipoLocal, equipoVisitante) {
        this._equipoLocal = equipoLocal;
        this._equipoVisitante = equipoVisitante;
        this.jugarJornada();

    }

    public jugarJornada() {
        for (let i = 0; i < this._numeroPartidosJornada; i++) {
            let emparejamiento: Partido = new Partido(this._equipoLocal[i], this._equipoVisitante[i]);
            let nombreEquipo: String = this._equipoLocal[i].nombre + '-' + this._equipoVisitante[i].nombre;
            this._partido.set(nombreEquipo, emparejamiento);
        }
    }

    public damePartidos(): Partido[] {
        let partidos: Partido[] = [];
        for (const iterator of this._partido) {
            partidos.push(iterator[1]);
        }
        return partidos;
    }
    //set y get de equipoLocal

}
