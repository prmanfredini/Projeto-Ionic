import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  user =  'Aluno';


  constructor(
    private srv: ServicosService,
    private router: Router) {}

    ngOnInit() {
      if (this.srv.logado !== null){
        this.user = this.srv.logado.nome;}
      else{
      this.router.navigate(['/home']);
      }
    }

  sair(): void {
    this.router.navigate(['/home']);
    this.srv.logado = null;
    window.sessionStorage.clear();
  }
}

