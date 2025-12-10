import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificacaoService } from 'src/app/notificao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {
  produto: IProduto | undefined;
  quantidade = 1;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
    
  ) { }

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const produtoId = Number(params.get("id"));
    this.produto = this.produtosService.getOne(produtoId);
  });
}

adicionarAoCarrinho(){
  this.notificacaoService.notificar("O Produto foi adicionado ao carrinho");
  const produto: IProdutoCarrinho = {
    ...this.produto!,
    quantidade: this.quantidade
  }
  this.carrinhoService.adicionarAoCarrinho(produto);

}
}
