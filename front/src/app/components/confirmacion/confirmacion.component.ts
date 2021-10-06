import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  frases: string[] = ["Tendrás días de alegrías y buenos momentos, disfrútalos como nunca",
                      "Concéntrate en lo que quieres lograr y ganaras. No lo olvides",
                      "Que la casualidad nos dure para siempre",
                      "Cuando busques lo que mas deseas, esfuerzate como nunca",
                      "Tienes por delante un maravilloso día para triunfar; disfrútalo y compártelo",
                      "Mañana puede ser muy tarde para disfrutar lo que tienes hoy",
                      "No olvides que un amigo es un regalo que te das a ti mismo",
                      "No eres Google, pero tienes todo lo que yo busco",
                      "Después de todo no estamos tan lejos… tu y yo vemos la misma luna, ¿cierto?",
                      "A veces ocurre, que lo que empieza como una locura se convierte en lo mejor de tu vida.",
                      "Nunca me siento tan solo como cuando necesito ponerme crema solar en la espalda",
                      "Un arqueólogo es el mejor esposo que una mujer podría tener. Cuando más envejece ella, más interesado está él en ella.",
                      "La edad es algo que no importa, a menos que sea usted un queso",
                      "Que nadie llegue jamás a ti sin que al irse se sienta un poco mejor y más feliz",
                      "Lo más importante en la vida es que lo más importante sea lo más importante",
                      "Es mejor callarse y parecer tonto, que abrir la boca y confirmarlo",
                      "Quien no vive para servir, no sirve para vivir",
                      "El problema no es el problema; el problema es tu actitud frente al problema",
                    ]

  fraseDeSuerte!: string

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fraseDeSuerte = this.frases[this.randomNum()]
  }

  randomNum() {
    return Math.floor(Math.random() * (17 + 1))
  }

  continuar() {
    this.router.navigateByUrl("/restaurant/menu/" + sessionStorage.getItem("name"));
  }

}
