import { Cliente } from "./Cliente.js";

export class ContaCorrente {
  // Métodos estáticos não são chamados na instâncias da classe.
  //Em vez disso, eles são chamados na própria classe. Geralmente, são funções utilitárias.
  static numeroDeContas = 0;
  agencia;
  _cliente;

  //#saldo =0 https://github.com/tc39/proposal-class-fields#private-fields
  _saldo = 0;

  //Ajuda a encapsular/proteger/isolar propriedades e facilitar o trabalho com objetos
  set cliente(novoValor) {
    if (novoValor instanceof Cliente) {
      this._cliente = novoValor;
    }
  }

  get cliente() {
    return this._cliente;
  }

  get saldo() {
    return this._saldo;
  }

  //Método especial para criar e inicializar um objeto criado a partir de uma classe.
  constructor(agencia, cliente) {
    this.agencia = agencia;
    this.cliente = cliente;
    ContaCorrente.numeroDeContas += 1;
  }

  sacar(valor) {
    if (this._saldo >= valor) {
      this._saldo -= valor;
      return valor;
    }
  }

  depositar(valor) {
    if (valor <= 0) {
      return;
    }
    //Early return
    this._saldo += valor;
  }

  tranferir(valor, conta) {
    const valorSacado = this.sacar(valor);
    conta.depositar(valorSacado);
  }
}
