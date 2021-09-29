import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicosService } from '../servicos.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  user: string;
  id: number;
  mes: string;
  justif: string;
  status: any;
  registro: any[];


  constructor(
    private srv: ServicosService,
    private router: Router,
    public alertCtrl: AlertController ) {
      this.user = this.srv.logado.nome;
      this.id = this.srv.logado.id;
    }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',
      subHeader: '',
      message: 'Cadastro realizado com sucesso',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async errorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Erro!',
      subHeader: 'Este cadastro já foi aprovado',
      message: 'portanto não pode ser editado',
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  ngOnInit() {
    this.registro = this.srv.registro;
    if (this.srv.logado !== null){
      this.user = this.srv.logado.nome;
    this.id = this.srv.logado.id;}
    else{
    this.router.navigate(['/home']);
    }
  }

  cadastrar(mes, justif){
    const id = this.id;
    const data = new Date();
    const status = 'pendente';
    const registro = { id, data, mes, justif, status };
    for (const rgs of this.registro)
        {this.status = rgs.status;}
    if (this.status !== 'Aprovado'){
      this.showAlert();
      this.srv.addRegistro(registro);}
    else {this.errorAlert();}
    }

  sair(): void {
    this.router.navigate(['/home']);
    this.srv.logado = null;
    window.sessionStorage.clear();
  }
}



/**
 *
 *
 * Um prestação de contas tem a
 * identificação do usuário (id),
 * um data de registro / modificação,
 * um mês contábil (pode ser texto),
 * um campo texto longo para descrição geral das contas e um status.
 * O usuário pode alterar qualquer campo de uma prestação de contas
 * que não está aprovada.Ele nunca pode modificar o status de uma
 * prestação de contas.Todo registro cadastro entra com status 'pendente'
 * .O cadastro e alteração de dados pode ser realizado na mesma
 *tela ou como o programador achar melhor */
