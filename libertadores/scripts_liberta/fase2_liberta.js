// scripts/fase2_liberta.js

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  let rodadaAtual = 1;

  const painelGrupos = document.getElementById("painel-fase2");
if (!painelGrupos) {
  console.error("❌ Elemento #painel-fase2 não encontrado no DOM!");
  return;
}

  const tituloRodadaTop = document.getElementById("titulo-rodada");
  const tituloRodadaBottom = document.getElementById("titulo-rodada-bottom");

  const btnAnteriorTop = document.getElementById("btn-anterior");
  const btnProximaTop = document.getElementById("btn-proxima");
  const btnAnteriorBottom = document.getElementById("btn-anterior-bottom");
  const btnProximaBottom = document.getElementById("btn-proxima-bottom");

  function renderPainelCompleto(numeroRodada) {
    painelGrupos.innerHTML = "";
    tituloRodadaTop.textContent = `Rodada ${numeroRodada}`;
    tituloRodadaBottom.textContent = `Rodada ${numeroRodada}`;

    const rodada = rodadas.find(r => r.numero == numeroRodada);
    if (!rodada) return;

    const confrontosPorGrupo = {};
    rodada.jogos.forEach(jogo => {
      const grupo = jogo.grupo || "Outros";
      if (!confrontosPorGrupo[grupo]) confrontosPorGrupo[grupo] = [];
      confrontosPorGrupo[grupo].push(jogo);
    });

    Object.entries(classificacao).forEach(([grupo, times]) => {
      const linha = document.createElement("div");
      linha.className = "linha-grupo";

      // Classificação
      const colunaEsquerda = document.createElement("div");
      colunaEsquerda.className = "coluna-esquerda";

      const grupoDiv = document.createElement("div");
      grupoDiv.className = "tabela-grupo";

      const titulo = document.createElement("h2");
      titulo.textContent = grupo;
      grupoDiv.appendChild(titulo);

      const tabela = document.createElement("table");
      tabela.className = "tabela-classificacao";
      tabela.innerHTML = `
        <thead>
          <tr>
            <th>Time</th>
            <th>Pts</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>SG</th>
          </tr>
        </thead>
      `;
      const tbody = document.createElement("tbody");

      times.forEach((time, index) => {
        const tr = document.createElement("tr");
        if (index === 0) tr.classList.add("lider-grupo");
        tr.innerHTML = `
          <td>${time.time}</td>
          <td>${time.pts}</td>
          <td>${time.j}</td>
          <td>${time.v}</td>
          <td>${time.e}</td>
          <td>${time.d}</td>
          <td>${time.sg}</td>
        `;
        tbody.appendChild(tr);
      });

      tabela.appendChild(tbody);
      grupoDiv.appendChild(tabela);
      colunaEsquerda.appendChild(grupoDiv);

      // Confrontos
      const colunaDireita = document.createElement("div");
      colunaDireita.className = "coluna-direita";

      if (confrontosPorGrupo[grupo]) {
        const grupoConfrontos = document.createElement("div");
        grupoConfrontos.className = "grupo-confronto";

        confrontosPorGrupo[grupo].forEach(jogo => {
          const jogoDiv = document.createElement("div");
          jogoDiv.className = "jogo";

          const time1 = document.createElement("div");
          time1.className = "time";
          time1.innerHTML = `<img src="${jogo.escudo1}" alt="${jogo.time1}" onerror="this.onerror=null;this.src='imagens/escudos/padrao.png'">`;

          const time2 = document.createElement("div");
          time2.className = "time";
          // time2.innerHTML = `<img src="${jogo.escudo2}" alt="${jogo.time2}">`;
          time2.innerHTML = `<img src="${jogo.escudo2}" alt="${jogo.time2}" onerror="this.onerror=null;this.src='imagens/escudos/padrao.png'">`;



          const placar = document.createElement("div");
          placar.className = "placar";
          const p1 = jogo.pontuacao1 === null ? "?" : jogo.pontuacao1.toFixed(2);
          const p2 = jogo.pontuacao2 === null ? "?" : jogo.pontuacao2.toFixed(2);
          placar.textContent = `${p1} × ${p2}`;

          const resultado = document.createElement("div");
          resultado.className = "resultado";
          const span = document.createElement("span");
          span.className = "vencedor";

          if (jogo.pontuacao1 === null || jogo.pontuacao2 === null) {
            span.textContent = "🕒 Aguardando resultado";
            span.style.backgroundColor = "#ffc107";
            span.style.color = "#000";
          } else if (jogo.pontuacao1 > jogo.pontuacao2) {
            span.textContent = `✅ ${jogo.time1} venceu`;
          } else if (jogo.pontuacao2 > jogo.pontuacao1) {
            span.textContent = `✅ ${jogo.time2} venceu`;
          } else {
            span.textContent = `🤝 Empate`;
          }

          jogoDiv.appendChild(time1);
          jogoDiv.appendChild(placar);
          jogoDiv.appendChild(time2);
          resultado.appendChild(span);

          grupoConfrontos.appendChild(jogoDiv);
          grupoConfrontos.appendChild(resultado);
        });

        colunaDireita.appendChild(grupoConfrontos);
      }

      linha.appendChild(colunaEsquerda);
      linha.appendChild(colunaDireita);
      painelGrupos.appendChild(linha);
    });
  }

  function atualizarRodada(novaRodada) {
    rodadaAtual = novaRodada;
    renderPainelCompleto(novaRodada);

    const isFirst = novaRodada === 1;
    const isLast = novaRodada === rodadas.length;

    btnAnteriorTop.disabled = isFirst;
    btnProximaTop.disabled = isLast;
    btnAnteriorBottom.disabled = isFirst;
    btnProximaBottom.disabled = isLast;
  }

  btnAnteriorTop.addEventListener("click", () => {
    if (rodadaAtual > 1) atualizarRodada(rodadaAtual - 1);
  });
  btnProximaTop.addEventListener("click", () => {
    if (rodadaAtual < rodadas.length) atualizarRodada(rodadaAtual + 1);
  });
  btnAnteriorBottom.addEventListener("click", () => {
    if (rodadaAtual > 1) atualizarRodada(rodadaAtual - 1);
  });
  btnProximaBottom.addEventListener("click", () => {
    if (rodadaAtual < rodadas.length) atualizarRodada(rodadaAtual + 1);
  });

  atualizarRodada(rodadaAtual);
});

