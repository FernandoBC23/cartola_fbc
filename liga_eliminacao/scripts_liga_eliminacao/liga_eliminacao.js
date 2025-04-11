// liga_eliminacao.js

let rodadaAtual = 1;
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
    rodadaAtual = novaRodada;
    exibirPontuacoesRodada(rodadaAtual);
    exibirUltimoColocadoRodada(rodadaAtual);
    exibirResumoEliminacao(rodadaAtual);

    // Atualiza títulos
    if (tituloRodadaTop) tituloRodadaTop.textContent = `Rodada ${rodadaAtual}`;
    if (tituloRodadaBottom) tituloRodadaBottom.textContent = `Rodada ${rodadaAtual}`;

    // Ativa/desativa botões
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
  "KING LEONN": "../imagens/king_leonn.png",
  "Fedato Futebol Clube": "../imagens/fedato_futebol_clube.png",
  "BORGES CLIMA FUT F.C": "../imagens/borges_itaqui_fc.png",
  "OlhaEleAiF.C!": "../imagens/olhaeleaifc.png",
  "Analove10 ITAQUI GRANDE!!": "../imagens/analove10_itaqui_grande.png",
  "Gremiomaniasm": "../imagens/gremiomaniasm.png",
  "Pity10": "../imagens/pity10.png",
  "E.C. Bororé": "../imagens/ec_borore.png",
  "PUXE FC": "../imagens/puxe_fc.png",
  "Super Vasco f.c": "../imagens/super_vasco_fc.png",
  "Texas Club 2025": "../imagens/texas_club_2025.png",
  "lsauer fc": "../imagens/lsauer_fc.png",
  "Grêmio imortal 37": "../imagens/gremio_imortal_37.png",
  "mercearia Estrela ": "../imagens/mercearia_estrela.png",
  "pura bucha /botafogo": "../imagens/pura_bucha_botafogo.png",
  "seralex": "../imagens/seralex.png",
  "HS SPORTS F.C": "../imagens/hs_sports_fc.png",
  "Dom Camillo68": "../imagens/dom_camillo68.png",
  "Tatols Beants F.C": "../imagens/tatols_beants_fc.png",
  "TEAM LOPES 99": "../imagens/team_lopes_99.png",
  "MAFRA MARTINS FC": "../imagens/mafra_martins_fc.png",  
  "Tabajara de Inhaua FC2": "../imagens/tabajara_de_inhaua_fc2.png",
  "FIGUEIRA DA ILHA": "../imagens/figueira_da_ilha.png",
  "SERGRILLO": "../imagens/sergrillo.png",
  "S.E.R. GRILLO": "../imagens/ser_grillo.png",
  "Gig@ntte": "../imagens/gigntte.png",
  "KP JUV.": "../imagens/kp_juv.png",
  "O clube do povo Itaqui/Rss": "../imagens/o_clube_do_povo_itaqui_rss.png",
  "I.B.CASTILHO FC": "../imagens/i_b_castilho_fc.png",
  "FBC Colorado": "../imagens/fbc_colorado.png",
  "VASCO MARTINS FC": "../imagens/vasco_martins_fc.png",
  "KillerColorado": "../imagens/killercolorado.png",
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

// function exibirPontuacoesRodada(rodada) {
//   const tbody = document.getElementById("classificacao-corpo");
//   if (!tbody) return;

//   tbody.innerHTML = "";
//   const lista = [];

//   for (const time in pontuacoesPorRodada) {
//     const pontos = pontuacoesPorRodada[time][`Rodada ${rodada}`];
//     if (typeof pontos === "number") {
//       lista.push({ time, pontos });
//     }
//   }

//   // Ordena por pontuação
//   lista.sort((a, b) => b.pontos - a.pontos);

//   // Identifica o eliminado com base na menor pontuação da rodada atual
//   const menorPontuacao = lista.length > 0 ? lista[lista.length - 1].pontos : null;
//   const eliminadoDaRodadaAtual = lista.find(item => item.pontos === menorPontuacao)?.time || null;

//   lista.forEach((item, index) => {
//     const escudo = escudosTimes[item.time] || "../imagens/default.png";
//     const isEliminado = item.time === eliminadoDaRodadaAtual;

//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td>${index + 1}</td>
//       <td>
//         <div class="time-info">
//           <img src="${escudo}" class="escudo" alt="${item.time}" />
//           ${item.time}
//           ${isEliminado ? '<span class="eliminado-tag">Eliminado</span>' : ''}
//         </div>
//       </td>
//       <td>${item.pontos.toFixed(2)}</td>
//     `;

//     if (isEliminado) {
//       row.classList.add("eliminado-atual");
//     }

//     tbody.appendChild(row);
//   });
// }

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


// function exibirResumoEliminacao(rodadaAtual) {
//   const container = document.getElementById("resumo-eliminacao");
//   if (!container) return;

//   const rodadaChave = `Rodada ${rodadaAtual}`;

//   // 📊 Estatísticas da rodada
//   const pontuacoesRodada = [];
//   for (const time in pontuacoesPorRodada) {
//     const pontos = pontuacoesPorRodada[time][rodadaChave];
//     if (typeof pontos === "number") {
//       pontuacoesRodada.push({ time, pontos });
//     }
//   }

//   let estatisticasHTML = "";
//   if (pontuacoesRodada.length > 0) {
//     pontuacoesRodada.sort((a, b) => b.pontos - a.pontos);
//     const maior = pontuacoesRodada[0];
//     const menor = pontuacoesRodada[pontuacoesRodada.length - 1];
//     const total = pontuacoesRodada.reduce((sum, obj) => sum + obj.pontos, 0);
//     const media = (total / pontuacoesRodada.length).toFixed(2);

//     estatisticasHTML = `
//       <h3>📊 Resumo da Rodada ${rodadaAtual}</h3>
//       <ul>
//         <li><strong>✅ Maior pontuação:</strong> ${maior.time} com ${maior.pontos.toFixed(2)} pts</li>
//         <li><strong>❌ Menor pontuação:</strong> ${menor.time} com ${menor.pontos.toFixed(2)} pts</li>
//         <li><strong>📊 Média geral:</strong> ${media} pts</li>
//       </ul>
//     `;
//   }

//   // 🔥 Eliminações reais: menor pontuação de cada rodada com dados
//   let eliminacoesHTML = `<h3>🔥 Eliminações</h3><ul>`;

//   for (let i = 1; i <= rodadaAtual; i++) {
//     const chaveRodada = `Rodada ${i}`;
//     const pontuacoes = [];

//     for (const time in pontuacoesPorRodada) {
//       const pontos = pontuacoesPorRodada[time][chaveRodada];
//       if (typeof pontos === "number") {
//         pontuacoes.push({ time, pontos });
//       }
//     }

//     if (pontuacoes.length > 0) {
//       pontuacoes.sort((a, b) => a.pontos - b.pontos); // menor pontuação
//       const eliminado = pontuacoes[0].time;
//       eliminacoesHTML += `<li>❌ <strong>Rodada ${i}:</strong> ${eliminado}</li>`;
//     }
//   }

//   eliminacoesHTML += `</ul>`;
//   container.innerHTML = `${estatisticasHTML}${eliminacoesHTML}`;
// }

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
