import { Injectable } from '@angular/core';
import { Registro } from './registro.model';


@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  logado: any;
  user: any[];
  id: any;
  cargo: any;
  registro: Registro[];


  constructor() {


    this.user =[
      { id: 1, nome: 'Fulano', email: '222', senha: 'aaa' , usuario :'responsavel' },
      { id: 2, nome: 'Beltrano', email: '111', senha: 'aaa' , usuario : 'colaborador' }
    ];
    this.logado = null;
    this.registro = [];


  }
  login(mail: string, pswd: string): boolean {
    for (const usr of this.user)
    {
      if ((usr.email === mail) && (usr.senha === pswd))
        {this.logado = usr;
        this.id = usr.id;
        this.cargo = usr.usuario;
          return true;}
    }
    return false;
  }

  addRegistro(newRegistro): void {
    if (!this.registro){
    this.registro.push(newRegistro);}
    else {
      this.registro.pop();
      this.registro.push(newRegistro);
    }
  }

    aprovado(){
      for (const rgs of this.registro)
      {
        const registro = {
          id: rgs.id,
          data: rgs.data,
          mes: rgs.mes,
          justif: rgs.justif,
          status: 'Aprovado',
        };
      this.registro.pop();
      this.registro.push(registro);
      }
    }

    refazer(){
        for (const rgs of this.registro)
        {
          const registro = {
            id: rgs.id,
            data: rgs.data,
            mes: rgs.mes,
            justif: rgs.justif,
            status: 'Reprovado',
          };
        this.registro.pop();
        this.registro.push(registro);
        }
    }

}
