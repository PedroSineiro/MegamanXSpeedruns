import Body from "../assets/components/Body/Body";

export default function Home() {
  return (
    <Body>
      <h1 className="white-text mb-4">Regras</h1>

      <div className="bg-dark text-light p-4 rounded">
        <h2 className="mb-3">Categorias</h2>
        
        <h3>Any%</h3>
        <p>
          A categoria <strong>Any%</strong> tem como objetivo finalizar o jogo o mais rápido possível, 
          sem a obrigatoriedade de coletar todos os upgrades, corações ou sub-tanques.  
          O jogador pode escolher qualquer rota ou estratégia disponível dentro das regras do jogo e 
          das diretrizes da comunidade, buscando apenas cruzar a linha de chegada no menor tempo.
        </p>
        <p>
          Essa categoria geralmente utiliza técnicas avançadas, como “damage boosts” e 
          manipulação de IA dos chefes, para economizar segundos preciosos.  
          É ideal para quem busca otimizar a execução e explorar atalhos do jogo.
        </p>

        <h3>100%</h3>
        <p>
          Já a categoria <strong>100%</strong> exige que o jogador conclua o jogo coletando absolutamente 
          todos os itens obrigatórios: corações, sub-tanques, partes de armadura e armas especiais.  
          O desafio é balancear a coleta completa com a velocidade, o que exige planejamento de rotas 
          muito mais elaborado.
        </p>
        <p>
          Em <strong>100%</strong>, a execução perfeita envolve não só a habilidade em combate, 
          mas também otimizar deslocamentos e evitar perdas de tempo desnecessárias 
          enquanto se busca cada item.
        </p>

        <h2 className="mt-4">Regras Gerais</h2>
        <ul>
          <li>O uso de glitches é permitido apenas se estiver especificado nas regras da categoria.</li>
          <li>Não é permitido utilizar códigos de trapaça ou modificações que alterem o jogo.</li>
          <li>O tempo oficial é medido do início do controle do personagem até o golpe final no último chefe.</li>
          <li>É obrigatório gravar a execução para validação da comunidade.</li>
        </ul>
      </div>
    </Body>
  );
}
