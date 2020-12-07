export class Equipo{


   private _puntos: number;
   private _golesFavor: number;
   private _golesContra: number;
   private _posicion: number;

  constructor(private _nombre: String ){

    this._puntos = 0;
    this._golesFavor = 0;
    this._golesContra = 0;
    this._posicion = 0;


  }


    get nombre(): String {
        return this._nombre;
    }


    set nombre(value: String) {
        this._nombre = value;
    }

    get puntos(): number {
        return this._puntos;
    }

    set puntos(value: number) {
        this._puntos = value;
    }

    get golesFavor(): number {
        return this._golesFavor;
    }

    set golesFavor(value: number) {
        this._golesFavor = value;
    }

    get golesContra(): number {
        return this._golesContra;
    }

    set golesContra(value: number) {
        this._golesContra = value;
    }

    get posicion(): number {
        return this._posicion;
    }

    set posicion(value: number) {
        this._posicion = value;
    }
}
