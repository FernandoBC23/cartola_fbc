// scripts/fase2_liberta.js (totalmente ajustado)

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  let rodadaAtual = (() => 7)(); // Começa na rodada 7
  const RODADA_MAXIMA = 12; // Vai até a rodada 12

  const painelGrupos = document.getElementById("painel-fase2");
  if (!painelGrupos) {
    console.error("❌ Elemento #painel-fase2 não encontrado no DOM!");
    return;
  }


    // === Função para gerar o nome do arquivo de escudo de forma segura ===
    const gerarNomeArquivo = (nome) => {
      if (!nome) {
        return "escudo_padrao"; // Pode colocar uma imagem padrão se o nome vier vazio
      }
      return nome
        .normalize("NFD")                    // Remove acentos
        .replace(/[\u0300-\u036f]/g, "")     // Remove marcas de acento
        .replace(/\s+/g, "_")                // Substitui espaços por _
        .replace(/[^\w\-]/g, "")             // Remove caracteres especiais
        .toLowerCase();                     // Tudo minúsculo
    };

  
  
    const escudosTimes = {
      "FBC Colorado": "../imagens/fbc_colorado.png",
      "Texas Club 2025": "../imagens/texas_club_2025.png",
      "Real SCI": "../imagens/real_sci.png",
      "Gig@ntte": "../imagens/gigntte.png",  
      "Gremiomaniasm": "../imagens/gremiomaniasm.png",  
      "F.C. Rei Das Copas": "../imagens/fc_rei_das_copas.png",
      "Rolo Compressor ZN": "../imagens/rolo_compressor_zn.png", 
      "KING LEONN": "../imagens/king_leonn.png",
      "Laranjja Mecannica": "../imagens/laranjja_mecannica.png",
      "Fedato Futebol Clube": "../imagens/fedato_futebol_clube.png", 
      "TEAM LOPES 99": "../imagens/team_lopes_99.png",
      "pura bucha /botafogo": "../imagens/pura_bucha_botafogo.png",
      "cartola scheuer": "../imagens/cartola_scheuer.png", 
      "Analove10 ITAQUI GRANDE!!":"../imagens/analove10_itaqui_grande.png", 
      "lsauer fc": "../imagens/lsauer_fc.png", 
      "BORGES ITAQUI F.C.": "../imagens/borges_itaqui_fc.png",  
      "Tabajara de Inhaua FC2": "../imagens/tabajara_de_inhaua_fc2.png", 
      "seralex": "../imagens/seralex.png",
      "E.C. Bororé": "../imagens/ec_borore.png", 
      "Tatols Beants F.C": "../imagens/tatols_beants_fc.png",
      "MauHumor F.C.": "../imagens/mauhumor_fc.png", 
      "TATITTA FC": "../imagens/tatitta_fc.png",
      "HS SPORTS F.C": "../imagens/hs_sports_fc.png",
      "Dom Camillo68": "../imagens/dom_camillo68.png",  
      "Grêmio imortal 37": "../imagens/gremio_imortal_37.png", 
      "Super Vasco f.c": "../imagens/super_vasco_fc.png",
      "A Lenda Super Vasco F.c": "../imagens/a_lenda_super_vasco_fc.png",  
      "ITAQUI F. C.": "../imagens/itaqui_f_c.png",
      "TORRESMO COM PINGA": "../imagens/torresmo_com_pinga.png",
      "Lá do Itaqui": "../imagens/la_do_itaqui.png",
      "FC Los Castilho": "../imagens/fc_los_castilho.png",
      "KillerColorado": "../imagens/killercolorado.png",
    };
  
    const clubesTimes = {
      "A Lenda Super Vasco F.c": "CBB",
      "BORGES ITAQUI F.C.": "EST",
      "Dom Camillo68": "UCH",
      "pura bucha /botafogo": "BOT",
  
      "lsauer fc": "BSC",
      "Tabajara de Inhaua FC2": "IDV",
      "Rolo Compressor ZN": "UNI",
      "HS SPORTS F.C": "RIV",
  
      "Analove10 ITAQUI GRANDE!!": "CCO",
      "cartola scheuer": "LDU",
      "Grêmio imortal 37": "TAC",
      "TEAM LOPES 99": "FLA", 
  
      "Fedato Futebol Clube": "ALI",
      "Super Vasco f.c": "LIB", 
      "Tatols Beants F.C": "TAL",  
      "Texas Club 2025": "SAO",
  
      "ITAQUI F. C.": "COL",
      "Real SCI": "RAC",
      "Gremiomaniasm": "ATL",
      "E.C. Bororé": "FOR",
  
      "Lá do Itaqui": "INT",
      "FC Los Castilho": "NAC",
      "TORRESMO COM PINGA": "BAH",
      "seralex": "ATN",
  
      "F.C. Rei Das Copas": "CCP",
      "TATITTA FC": "BOL",  
      "KillerColorado": "SCR",
      "KING LEONN": "PAL",
  
      "FBC Colorado": "VEL",     
      "Gig@ntte": "SAB",  
      "Laranjja Mecannica": "PEN",               
      "MauHumor F.C.": "OLI",
    }; 


  function renderPainelCompleto(numeroRodada) {
    painelGrupos.innerHTML = "";

    const confrontosRodada = confrontosFase2.filter(j => j.Rodada === (numeroRodada - 6));
    const resultadosRodada = resultadosFase2.filter(j => j.rodada === numeroRodada);

    const confrontosPorGrupo = {};
    confrontosRodada.forEach(jogo => {
      const grupo = jogo.Grupo || "Outros";
      if (!confrontosPorGrupo[grupo]) confrontosPorGrupo[grupo] = [];
      confrontosPorGrupo[grupo].push(jogo);
    });

    Object.entries(classificacaoFase2).forEach(([grupo, times]) => {
      const linha = document.createElement("div");
      linha.className = "linha-grupo";

      const colunaEsquerda = document.createElement("div");
      colunaEsquerda.className = "coluna-esquerda";

      const grupoDiv = document.createElement("div");
      grupoDiv.className = "tabela-grupo";

      const titulo = document.createElement("div");
      titulo.className = "titulo-grupo";
      titulo.textContent = grupo;
      grupoDiv.appendChild(titulo);

      const tabela = document.createElement("table");
      tabela.className = "tabela-classificacao";
      tabela.innerHTML = `
        <thead>
          <tr>
            <th>Pos</th>
            <th>Time</th>
            <th>Pts</th>
            <th>J</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>Total</th>
          </tr>
        </thead>
      `;
      const tbody = document.createElement("tbody");

      times.forEach((time, index) => {
        const tr = document.createElement("tr");
        if (index === 0 || index === 1) tr.classList.add("lider-grupo");
        tr.innerHTML = `          
          <td>${index + 1}</td>
          <td>${time["nome"]}</td>
          <td>${time["pontos"]}</td>
          <td>${(time["vitorias"] ?? 0) + (time["empates"] ?? 0) + (time["derrotas"] ?? 0)}</td>
          <td>${time["vitorias"] ?? 0}</td>
          <td>${time["empates"] ?? 0}</td>
          <td>${time["derrotas"] ?? 0}</td>
          <td>${(time["totalCartola"] ?? 0).toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
      });

      tabela.appendChild(tbody);
      grupoDiv.appendChild(tabela);
      colunaEsquerda.appendChild(grupoDiv);

      const colunaDireita = document.createElement("div");
      colunaDireita.className = "coluna-direita";

      if (confrontosPorGrupo[grupo]) {
        const grupoConfrontos = document.createElement("div");
        grupoConfrontos.className = "grupo-confronto";

        confrontosPorGrupo[grupo].forEach(jogo => {
          const jogoDiv = document.createElement("div");
          jogoDiv.className = "jogo";


          // === Função para gerar o caminho do escudo ===
          const escudoSrc = (nome) => {
            return `../imagens/${gerarNomeArquivo(nome)}.png`;
          };


          // const escudoSrc = nome => {
          //   if (escudosTimes[nome]) {
          //     return escudosTimes[nome];
          //   } else {
          //     return `../imagens/${gerarNomeArquivo(nome)}.png`;
          //   }
          // };
          

          const time1 = document.createElement("div");
          time1.className = "time";
          time1.innerHTML = `<img src="${escudoSrc(jogo.mandante.nome)}" alt="${jogo.mandante.nome}">`;

          const time2 = document.createElement("div");
          time2.className = "time";
          time2.innerHTML = `<img src="${escudoSrc(jogo.visitante.nome)}" alt="${jogo.visitante.nome}">`;

          const resultado = resultadosRodada.find(r =>
            r.mandante.nome === jogo.mandante.nome &&
            r.visitante.nome === jogo.visitante.nome
          );
          

          const p1 = resultado?.mandante?.pontos != null ? resultado.mandante.pontos.toFixed(2) : "?";
          const p2 = resultado?.visitante?.pontos != null ? resultado.visitante.pontos.toFixed(2) : "?";

          const placar = document.createElement("div");
          placar.className = "placar";
          placar.innerHTML = `
            <span class="placar-numero">${p1}</span>
            <span class="placar-x"> X </span>
            <span class="placar-numero">${p2}</span>
          `;

          const resultadoDiv = document.createElement("div");
          resultadoDiv.className = "resultado";
          const span = document.createElement("span");
          span.className = "vencedor";

          if (!resultado || resultado.mandante.pontos == null || resultado.visitante.pontos == null) {
            span.textContent = "🕒 Aguardando Confronto";
            span.style.backgroundColor = "#ffc107";
            span.style.color = "#000";
          } else if (resultado.mandante.pontos > resultado.visitante.pontos) {
            span.textContent = `✅ ${resultado.mandante.nome} venceu`;
          } else if (resultado.mandante.pontos < resultado.visitante.pontos) {
            span.textContent = `✅ ${resultado.visitante.nome} venceu`;
          } else {
            span.textContent = `🤝 Empate`;
          }

          jogoDiv.appendChild(time1);
          jogoDiv.appendChild(placar);
          jogoDiv.appendChild(time2);
          resultadoDiv.appendChild(span);

          grupoConfrontos.appendChild(jogoDiv);
          grupoConfrontos.appendChild(resultadoDiv);
        });

        const separador = document.createElement("div");
        separador.className = "separador-grupo";
        grupoConfrontos.appendChild(separador);

        colunaDireita.appendChild(grupoConfrontos);
      }

      const navegacaoRodadaGrupo = criarNavegacaoRodadaGrupo(grupo, numeroRodada);
      colunaDireita.appendChild(navegacaoRodadaGrupo);

      linha.appendChild(colunaEsquerda);
      linha.appendChild(colunaDireita);
      painelGrupos.appendChild(linha);
    });
  }

  function atualizarRodada(novaRodada) {
    rodadaAtual = novaRodada;
    renderPainelCompleto(novaRodada);
  }

  function criarNavegacaoRodadaGrupo(grupo, rodadaParaExibir) {
    const container = document.createElement("div");
    container.className = "rodada-container";

    const navegacao = document.createElement("div");
    navegacao.className = "navegacao-rodada";

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "◀️ Rodada Anterior";
    btnAnterior.addEventListener("click", () => {
      if (rodadaAtual > 7) atualizarRodada(rodadaAtual - 1);
    });

    const titulo = document.createElement("div");
    titulo.className = "titulo-rodada";
    titulo.textContent = `Rodada ${rodadaParaExibir}`;

    const btnProxima = document.createElement("button");
    btnProxima.textContent = "Próxima Rodada ▶️";
    btnProxima.addEventListener("click", () => {
      if (rodadaAtual < RODADA_MAXIMA) atualizarRodada(rodadaAtual + 1);
    });

    if (rodadaAtual === 7) btnAnterior.disabled = true;
    if (rodadaAtual === RODADA_MAXIMA) btnProxima.disabled = true;

    navegacao.appendChild(btnAnterior);
    navegacao.appendChild(titulo);
    navegacao.appendChild(btnProxima);

    container.appendChild(navegacao);
    return container;
  }

  atualizarRodada(rodadaAtual);
});