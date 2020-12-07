import {Equipo} from './Equipo';

export class Partido {


    private _goles: Map<String, number>;
    private _minutos: number;
    private _golesPorMinutos: String[] = [];

    constructor(private _equipoLocal: Equipo,
                private _equipoVisitante: Equipo) {

        this._goles = new Map<String, number>();
        this._goles.set(this._equipoLocal.nombre, 0);
        this._goles.set(this._equipoVisitante.nombre, 0);
        this._minutos = 90;

        this.jugarPartido();


    }

    jugarPartido() {

        let banderaGolEquipoLocal = 3;
        let banderaGolEquipoVisitante = 12;

        for (let index = 0; index < this._minutos; index++) {
            let golMarcado = Math.floor(Math.random() * (0 - 20) + 20);
            if (golMarcado == banderaGolEquipoLocal || golMarcado == banderaGolEquipoVisitante) {
                let equipoGoleador = Math.floor(Math.random() * (0 - (1 + 1)) + (1));
                if (equipoGoleador == 0) {
                    this._goles.set(this._equipoLocal.nombre, this._goles.get(this._equipoLocal.nombre) + 1);
                    this._golesPorMinutos.push(this._equipoLocal.nombre + '-' + index);
                } else {
                    this._goles.set(this._equipoVisitante.nombre, this._goles.get(this._equipoVisitante.nombre) + 1);
                    this._golesPorMinutos.push(this._equipoVisitante.nombre + '-' + index);

                }
            }

        }

        this.registrarGoles();
        this.actualizarPuntosEquipos();


    }

    private registrarGoles() {
        this._equipoLocal.golesFavor = this._equipoLocal.golesFavor + this._goles.get(this._equipoLocal.nombre);
        this._equipoLocal.golesContra = this._equipoLocal.golesContra + this._goles.get(this._equipoVisitante.nombre);

        this._equipoVisitante.golesFavor = this._equipoVisitante.golesFavor + this._goles.get(this._equipoVisitante.nombre);
        this._equipoVisitante.golesContra = this._equipoVisitante.golesContra + this._goles.get(this._equipoLocal.nombre);
    }

    private actualizarPuntosEquipos() {
        const puntosPartidoGanado = 3;
        const puntosPartidoEmpatado = 1;
        const puntosPartidoPerdido = 0;
        if (this._goles.get(this._equipoLocal.nombre) === this._goles.get(this._equipoVisitante.nombre)) {
            this._equipoLocal.puntos = this._equipoLocal.puntos + puntosPartidoEmpatado;
            this._equipoVisitante.puntos = this._equipoVisitante.puntos + puntosPartidoEmpatado;
        } else if (this._goles.get(this._equipoLocal.nombre) > this._goles.get(this._equipoVisitante.nombre)) {
            this._equipoLocal.puntos = this._equipoLocal.puntos + puntosPartidoGanado;
            this._equipoVisitante.puntos = this._equipoVisitante.puntos + puntosPartidoPerdido;
        } else {
            this._equipoLocal.puntos = this._equipoLocal.puntos + puntosPartidoPerdido;
            this._equipoVisitante.puntos = this._equipoVisitante.puntos + puntosPartidoGanado;
        }
    }


    get goles(): Map<String, number> {
        return this._goles;
    }

    get golesPorMinutos(): String[] {
        return this._golesPorMinutos;
    }

    get equipoLocal(): Equipo {
        return this._equipoLocal;
    }

    get equipoVisitante(): Equipo {
        return this._equipoVisitante;
    }


    get minutos(): number {
        return this._minutos;
    }
}
