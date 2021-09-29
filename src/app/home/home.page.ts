import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    email: string;
    pswd: string;
    mensagem: string;
    cargo: any;

    constructor(
      private srv: ServicosService,
      private router: Router
    ) {}

    ngOnInit() {}

    onSubmit(): void {
      if (this.srv.login(this.email.toLowerCase(), this.pswd)){
        if (this.srv.cargo === 'responsavel'){
          this.router.navigate(['/selecao']);}
        else {this.router.navigate(['/cadastro']);}
      }
      else {this.mensagem = 'senha ou email incorretos';}
    }

  }
