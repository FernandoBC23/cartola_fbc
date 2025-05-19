// liga_eliminacao.js

let rodadaAtual = (() => {
  const rodadasComPontuacao = Object.values(pontuacoesPorRodada)
    .flatMap(p => Object.entries(p)
      .filter(([_, pontos]) => typeof pontos === "number")
      .map(([rodada]) => parseInt(rodada.replace("Rodada ", ""), 10))
    );

  return rodadasComPontuacao.length ? Math.max(...rodadasComPontuacao) : 1;
})();
let totalRodadas = 1;



document.addEventListener("DOMContentLoaded", () => {
  const rodadasValidas = Object.values(pontuacoesPorRodada)[0];
  totalRodadas = rodadasValidas ? Object.keys(rodadasValidas).length : 1;

  // Topo
  const tituloRodadaTop = document.getElementById("titulo-rodada");
  const btnAnteriorTop = document.getElementById("btn-anterior");
  const btnProximaTop = document.getElementById("btn-proxima");

  // Rodapé
  const tituloRodadaBottom = document.getElementById("titulo-rodada-bottom");
  const btnAnteriorBottom = document.getElementById("btn-anterior-bottom");
  const btnProximaBottom = document.getElementById("btn-proxima-bottom");
  

  // Atualiza UI com rodada atual
  function atualizarRodada(novaRodada) {
    rodadaAtual = novaRodada; // 👈 isso precisa estar aqui
    exibirPontuacoesRodada(rodadaAtual);
    exibirUltimoColocadoRodada(rodadaAtual);
    exibirResumoEliminacao(rodadaAtual);

    if (tituloRodadaTop) tituloRodadaTop.textContent = `Rodada ${rodadaAtual}`;
    if (tituloRodadaBottom) tituloRodadaBottom.textContent = `Rodada ${rodadaAtual}`;

    const desabilitarAnterior = rodadaAtual <= 1;
    const desabilitarProxima = rodadaAtual >= totalRodadas;

    if (btnAnteriorTop) btnAnteriorTop.disabled = desabilitarAnterior;
    if (btnProximaTop) btnProximaTop.disabled = desabilitarProxima;
    if (btnAnteriorBottom) btnAnteriorBottom.disabled = desabilitarAnterior;
    if (btnProximaBottom) btnProximaBottom.disabled = desabilitarProxima;
  }


  // Ações dos botões
  const configurarBotao = (botao, direcao) => {
    if (botao) {
      botao.addEventListener("click", () => {
        const novaRodada = rodadaAtual + direcao;
        if (novaRodada >= 1 && novaRodada <= totalRodadas) {
          atualizarRodada(novaRodada);
        }
      });
    }
  };

  configurarBotao(btnAnteriorTop, -1);
  configurarBotao(btnProximaTop, +1);
  configurarBotao(btnAnteriorBottom, -1);
  configurarBotao(btnProximaBottom, +1);

  atualizarRodada(rodadaAtual);
});


// DICIONÁRIO DOS ESCUDOS (ajuste nomes se necessário)
const escudosTimes = {
  "KING LEONN": "../imagens/2_king_leonn.png",
  "Fedato Futebol Clube": "../imagens/2_fedato_futebol_clube.png",
  "BORGES CLIMA FUT F.C": "../imagens/2_borges_itaqui_fc.png",
  "OlhaEleAiF.C!": "../imagens/2_olhaeleaifc.png",
  "Analove10 ITAQUI GRANDE!!": "../imagens/2_analove10_itaqui_grande.png",
  "Gremiomaniasm": "../imagens/2_gremiomaniasm.png",
  "Pity10": "../imagens/2_pity10.png",
  "E.C. Bororé": "../imagens/2_ec_borore.png",
  "PUXE FC": "../imagens/2_puxe_fc.png",
  "Super Vasco f.c": "../imagens/2_super_vasco_fc.png",
  "Texas Club 2025": "../imagens/2_texas_club_2025.png",
  "lsauer fc": "../imagens/2_lsauer_fc.png",
  "Grêmio imortal 37": "../imagens/2_gremio_imortal_37.png",
  "mercearia Estrela ": "../imagens/2_mercearia_estrela.png",
  "pura bucha /botafogo": "../imagens/2_pura_bucha_botafogo.png",
  "seralex": "../imagens/2_seralex.png",
  "HS SPORTS F.C": "../imagens/2_hs_sports_fc.png",
  "Dom Camillo68": "../imagens/2_dom_camillo68.png",
  "Tatols Beants F.C": "../imagens/2_tatols_beants_fc.png",
  "TEAM LOPES 99": "../imagens/2_team_lopes_99.png",
  "MAFRA MARTINS FC": "../imagens/2_mafra_martins_fc.png",  
  "Tabajara de Inhaua FC2": "../imagens/2_tabajara_de_inhaua_fc2.png",
  "FIGUEIRA DA ILHA": "../imagens/2_figueira_da_ilha.png",
  "SERGRILLO": "../imagens/2_sergrillo.png",
  "S.E.R. GRILLO": "../imagens/2_ser_grillo.png",
  "Gig@ntte": "../imagens/2_gigntte.png",
  "KP JUV.": "../imagens/2_kp_juv.png",
  "O clube do povo Itaqui/Rss": "../imagens/2_o_clube_do_povo_itaqui_rss.png",
  "I.B.CASTILHO FC": "../imagens/2_i_b_castilho_fc.png",
  "FBC Colorado": "../imagens/2_fbc_colorado.png",
  "VASCO MARTINS FC": "../imagens/2_vasco_martins_fc.png",
  "A Lenda Super Vasco F.c ": "../imagens/2_a_lenda_super_vasco_fc.png",
};

function configurarBotoesNavegacao(totalRodadas) {
  document.getElementById("btn-anterior").addEventListener("click", () => {
    if (rodadaAtual > 1) {
      rodadaAtual--;
      atualizarRodada();
    }
  });

  document.getElementById("btn-proxima").addEventListener("click", () => {
    if (rodadaAtual < totalRodadas) {
      rodadaAtual++;
      atualizarRodada();
    }
  });
}

function atualizarRodada() {
  exibirPontuacoesRodada(rodadaAtual);
  exibirUltimoColocadoRodada(rodadaAtual);
  exibirResumoEliminacao(rodadaAtual);

  const titulo = document.getElementById("titulo-rodada");
  if (titulo) {
    titulo.textContent = `Rodada ${rodadaAtual}`;
  }
}


function exibirPontuacoesRodada(rodada) {
  const tbody = document.getElementById("classificacao-corpo");
  if (!tbody) return;

  tbody.innerHTML = "";
  const lista = [];

  for (const time in pontuacoesPorRodada) {
    const pontos = pontuacoesPorRodada[time][`Rodada ${rodada}`];
    if (typeof pontos === "number") {
      lista.push({ time, pontos });
    }
  }

  // Ordena por pontuação (do maior para o menor)
  lista.sort((a, b) => b.pontos - a.pontos);

  // Identifica os eliminados da rodada
  let eliminadosRodada = [];
  if (rodada >= 1 && rodada <= 9) {
    const menorPontuacao = lista[lista.length - 1]?.pontos;
    eliminadosRodada = lista.filter(item => item.pontos === menorPontuacao).map(item => item.time).slice(0, 1);
  } else if (rodada >= 10 && rodada <= 18) {
    const menor1 = lista[lista.length - 1]?.pontos;
    const menor2 = lista[lista.length - 2]?.pontos;
    eliminadosRodada = lista
      .filter(item => item.pontos === menor1 || item.pontos === menor2)
      .map(item => item.time)
      .slice(0, 2);
  } else {
    eliminadosRodada = []; // Rodada 19 = final
  }

  // Monta a tabela
  lista.forEach((item, index) => {
    const escudo = escudosTimes[item.time] || "../imagens/default.png";
    const isEliminado = eliminadosRodada.includes(item.time);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <div class="time-info">
          <img src="${escudo}" class="escudo" alt="${item.time}" />
          ${item.time}
          ${isEliminado ? '<span class="eliminado-tag">Eliminado</span>' : ''}
        </div>
      </td>
      <td>${item.pontos.toFixed(2)}</td>
    `;

    if (isEliminado) {
      row.classList.add("eliminado-atual");
    }

    tbody.appendChild(row);
  });
}


function exibirUltimoColocadoRodada(rodadaAtual) {
  const avisoContainer = document.getElementById("aviso-eliminado");
  if (!avisoContainer) return;

  const pontuacoesRodada = [];

  for (const time in pontuacoesPorRodada) {
    const pontos = pontuacoesPorRodada[time][`Rodada ${rodadaAtual}`];
    if (typeof pontos === "number") {
      pontuacoesRodada.push({ time, pontos });
    }
  }

  if (pontuacoesRodada.length === 0) {
    avisoContainer.innerHTML = "";
    return;
  }

  pontuacoesRodada.sort((a, b) => a.pontos - b.pontos);
  const ultimo = pontuacoesRodada[0];

  avisoContainer.innerHTML = `
    ❌ <strong>Último colocado da Rodada ${rodadaAtual}:</strong> ${ultimo.time} com ${ultimo.pontos.toFixed(2)} pontos. (Eliminado)
  `;
}


function exibirResumoEliminacao(rodadaAtual) {
  const container = document.getElementById("resumo-eliminacao");
  if (!container) return;

  const rodadaChave = `Rodada ${rodadaAtual}`;

  // 📊 Estatísticas da rodada
  const pontuacoesRodada = [];
  for (const time in pontuacoesPorRodada) {
    const pontos = pontuacoesPorRodada[time][rodadaChave];
    if (typeof pontos === "number") {
      pontuacoesRodada.push({ time, pontos });
    }
  }

  let estatisticasHTML = "";
  if (pontuacoesRodada.length > 0) {
    pontuacoesRodada.sort((a, b) => b.pontos - a.pontos);
    const maior = pontuacoesRodada[0];
    const menor = pontuacoesRodada[pontuacoesRodada.length - 1];
    const total = pontuacoesRodada.reduce((sum, obj) => sum + obj.pontos, 0);
    const media = (total / pontuacoesRodada.length).toFixed(2);

    estatisticasHTML = `
      <h3>📊 Resumo da Rodada ${rodadaAtual}</h3>
      <ul>
        <li><strong>✅ Maior pontuação:</strong> ${maior.time} com ${maior.pontos.toFixed(2)} pts</li>
        <li><strong>❌ Menor pontuação:</strong> ${menor.time} com ${menor.pontos.toFixed(2)} pts</li>
        <li><strong>📊 Média geral:</strong> ${media} pts</li>
      </ul>
    `;
  }

  // 🔥 Eliminações acumuladas
  let eliminacoesHTML = `<h3>🔥 Eliminações</h3><ul>`;
  
  for (let i = 1; i <= rodadaAtual; i++) {
    const chaveRodada = `Rodada ${i}`;
    const pontuacoes = [];

    for (const time in pontuacoesPorRodada) {
      const pontos = pontuacoesPorRodada[time][chaveRodada];
      if (typeof pontos === "number") {
        pontuacoes.push({ time, pontos });
      }
    }

    if (pontuacoes.length === 0) continue;

    pontuacoes.sort((a, b) => a.pontos - b.pontos); // menores primeiro

    if (i <= 9) {
      const eliminado = pontuacoes[0].time;
      eliminacoesHTML += `<li>❌ <strong>Rodada ${i}:</strong> ${eliminado}</li>`;
    } else if (i <= 18) {
      const elim1 = pontuacoes[0].time;
      const elim2 = pontuacoes[1]?.time;
      eliminacoesHTML += `<li>❌ <strong>Rodada ${i}:</strong> ${elim1} e ${elim2}</li>`;
    } else {
      eliminacoesHTML += `<li>🏆 <strong>Rodada ${i}:</strong> Final entre os 5 melhores (sem eliminação)</li>`;
    }
  }

  eliminacoesHTML += `</ul>`;
  container.innerHTML = `${estatisticasHTML}${eliminacoesHTML}`;
}
