import { ServicosService } from './../servicos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.page.html',
  styleUrls: ['./selecao.page.scss'],
})
export class SelecaoPage implements OnInit {


user: string;
registro: any[];


  constructor(
    private srv: ServicosService,
    private router: Router,
    public alertCtrl: AlertController ) {}

    async apAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Alterado!',
        subHeader: '',
        message: 'Registro aprovado.',
        buttons: ['OK']
      });
      await alert.present();
      const result = await alert.onDidDismiss();
      console.log(result);
    }

    async reAlert() {
      const alert = await this.alertCtrl.create({
        header: 'Aterado!',
        subHeader: '',
        message: 'Registro recusado.',
        buttons: ['OK']
      });
      await alert.present();
      const result = await alert.onDidDismiss();
      console.log(result);
    }


  ngOnInit() {
    this.registro = this.srv.registro;
    if (this.srv.logado !== null){
      this.user = this.srv.logado.nome;}
    else{
    this.router.navigate(['/home']);
    }
  }

  refazer() {
  this.srv.refazer();
  this.reAlert();
  this.router.navigate(['/selecao']);
   }

  aprovado() {
  this.srv.aprovado();
  this.apAlert();
  this.router.navigate(['/selecao']);
  }

  sair(): void {
    this.router.navigate(['/home']);
    this.srv.logado = null;
    window.sessionStorage.clear();
  }



}
