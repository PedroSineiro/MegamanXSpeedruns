import Body from "../assets/components/Body/Body";
import x1 from "../assets/img/x1.jpg";
import x2 from "../assets/img/x2.jpg";
import x3 from "../assets/img/x3.jpg";
import x4 from "../assets/img/x4.jpg";
import x5 from "../assets/img/x5.jpg";
import x6 from "../assets/img/x6.jpg";
import x7 from "../assets/img/x7.jpg";
import x8 from "../assets/img/x8.jpg";

export default function Games() {
  return (
    <Body>
      <h1 className="white-text mb-4">Lista de Jogos Mega Man X</h1>

      <div className="col-12">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x1} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X (1993)</h5>
                <p className="card-text">
                  O primeiro jogo da série apresenta X, um robô avançado criado pelo Dr. Light,
                  que luta ao lado de Zero contra os Mavericks liderados por Sigma. Ambientado
                  em um futuro distante, o jogo combina ação rápida com um sistema inovador
                  de upgrades e habilidades especiais obtidas ao derrotar chefes.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
               <img src={x2} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X2 (1994)</h5>
                <p className="card-text">
                  Continuação direta, Mega Man X2 traz os X-Hunters como novos vilões, que
                  desafiam X enquanto ele enfrenta novamente as forças de Sigma. Introduz
                  mecânicas avançadas de jogabilidade e batalhas ainda mais intensas.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x3} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X3 (1995)</h5>
                <p className="card-text">
                  Em X3, X e Zero enfrentam Dr. Doppler e seu exército de Mavericks. Este título
                  permite jogar com Zero em certas partes, além de apresentar múltiplas armaduras
                  e finais diferentes.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x4} alt=""className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X4 (1997)</h5>
                <p className="card-text">
                  O primeiro título da série na era 32-bit, X4 traz gráficos mais detalhados,
                  animações em anime e a possibilidade de jogar toda a campanha com X ou Zero,
                  cada um com habilidades únicas e histórias próprias.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x5} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X5 (2000)</h5>
                <p className="card-text">
                  X5 apresenta uma corrida contra o tempo para impedir a queda da estação espacial
                  Eurasia. Com múltiplos finais e um enredo mais sombrio, o jogo aprofunda o
                  conflito entre X, Zero e Sigma.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x6} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X6 (2001)</h5>
                <p className="card-text">
                  Ambientado após os eventos de X5, X6 mostra X enfrentando uma misteriosa figura
                  chamada Gate, que está criando novos e poderosos Mavericks. A dificuldade elevada
                  e os desafios complexos marcam este título.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x7} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X7 (2003)</h5>
                <p className="card-text">
                  X7 introduz gráficos 3D e um novo protagonista, Axl, que se une a X e Zero.
                  O jogo mistura fases em 2D e 3D, trazendo novas mecânicas e desafios à série.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-light h-100">
              <div className="card-img-top" style={{ height: "200px", backgroundColor: "#333" }}>
                <img src={x8} alt="" className="game-img"/>
              </div>
              <div className="card-body">
                <h5 className="card-title">Mega Man X8 (2004)</h5>
                <p className="card-text">
                  O último jogo da série principal retorna a um estilo mais próximo do 2D,
                  mas com gráficos modernos. X, Zero e Axl devem impedir os planos de Lumine
                  e enfrentar uma nova ameaça Maverick.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Body>
  );
}
