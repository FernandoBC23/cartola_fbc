// document.addEventListener("DOMContentLoaded", () => {
//   const rodadaAtual = 1;
//   exibirPontuacoesRodada(rodadaAtual);

//   const classificacao = gerarClassificacaoGeral(pontuacoesPorRodada);
//   exibirClassificacao(classificacao);
// });

// DICIONÁRIO DOS ESCUDOS
const escudosTimes = {
  "FBC Colorado": "../imagens/fbc_colorado.png",
  "Texas Club 2025": "../imagens/texas_club_2025.png",
  "Real SCI": "../imagens/real_sci.png",
  "Gig@ntte": "../imagens/gigntte.png",
  "PraiaBravaFC": "../imagens/praiabravafc.png",
  "OlhaEleAiF.C!": "../imagens/olhaeleaifc.png",
  "Gremiomaniasm": "../imagens/gremiomaniasm.png",
  "Sport Clube PAIM": "../imagens/sport_clube_paim.png",
  "PUXE FC": "../imagens/puxe_fc.png",
  "RS Expressões da Arte": "../imagens/rs_expressoes_da_arte.png",
  "ZIVI FC": "../imagens/zivi_fc.png",
  "O clube do povo Itaqui/Rss": "../imagens/o_clube_do_povo_itaqui_rss.png",
  "F.C. Rei Das Copas": "../imagens/fc_rei_das_copas.png",
  "Rolo Compressor ZN": "../imagens/rolo_compressor_zn.png",
  "Taura da Fronteira FCIII": "../imagens/taura_da_fronteira_fciii.png",
  "Eleis-Itaqui": "../imagens/eleis_itaqui.png",
  "KING LEONN": "../imagens/king_leonn.png",
  "Laranjja Mecannica": "../imagens/laranjja_mecannica.png",
  "Fedato Futebol Clube": "../imagens/fedato_futebol_clube.png",
  "Perronee F.C": "../imagens/perronee_fc.png",
  "Pity10": "../imagens/pity10.png",
  "pra sempre imortal fc": "../imagens/pra_sempre_imortal_fc.png",
  "RHANKA DENTY FC25": "../imagens/rhanka_denty_fc25.png",
  "TEAM LOPES 99": "../imagens/team_lopes_99.png",
  "pura bucha /botafogo": "../imagens/pura_bucha_botafogo.png",
  "cartola scheuer": "../imagens/cartola_scheuer.png",
  "Remo Santo Ângelo": "../imagens/remo_santo_angelo.png",
  "Analove10 ITAQUI GRANDE!!":"../imagens/analove10_itaqui_grande.png",
  "DM Studio": "../imagens/dm_studio.png",
  "lsauer fc": "../imagens/lsauer_fc.png",
  "VASCO MARTINS FC": "../imagens/vasco_martins_fc.png",
  "KP JUV.": "../imagens/kp_juv.png",
  "BORGES ITAQUI F.C.": "../imagens/borges_itaqui_fc.png",
  "Profit Soccer": "../imagens/profit_soccer.png",
  "Tabajara de Inhaua FC2": "../imagens/tabajara_de_inhaua_fc2.png",
  "TIGRE LEON": "../imagens/tigre_leon.png",
  "S.E.R. GRILLO": "../imagens/ser_grillo.png",
  "seralex": "../imagens/seralex.png",
  "E.C. Bororé": "../imagens/ec_borore.png",
  "MAFRA MARTINS FC": "../imagens/mafra_martins_fc.png",
  "BordonFC": "../imagens/bordonfc.png",
  "Tatols Beants F.C": "../imagens/tatols_beants_fc.png",
  "FIGUEIRA DA ILHA": "../imagens/figueira_da_ilha.png",
  "MauHumor F.C.": "../imagens/mauhumor_fc.png",
  "A Lenda Super Vascão f.c": "../imagens/a_lenda_super_vascao_fc.png",
  "TATITTA FC": "../imagens/tatitta_fc.png",
  "HS SPORTS F.C": "../imagens/hs_sports_fc.png",
  "Dom Camillo68": "../imagens/dom_camillo68.png",
  "mercearia Estrela": "../imagens/mercearia_estrela.png",
  "CosmoCity ZO": "../imagens/cosmocity_zo.png",
  "clarinvalau fc": "../imagens/clarinvalau_fc.png",
  "Grêmio imortal 37": "../imagens/gremio_imortal_37.png",
  "SERGRILLO": "../imagens/sergrillo.png",
  "Super Vasco f.c": "../imagens/super_vasco_fc.png",
  "A Lenda Super Vasco F.c": "../imagens/a_lenda_super_vasco_fc.png",
  "Paulo Virgili FC": "../imagens/paulo_virgili_fc.png",
  "CALOMBO ITAQUI RS": "../imagens/calombo_itaqui_rs.png",
  "Luis lemes inter": "../imagens/luis_lemes_inter.png",
  "emer jr fc": "../imagens/emer_jr_fc.png",
  "Cril Futebol Club": "../imagens/cril_futebol_club.png",
};

document.addEventListener("DOMContentLoaded", () => {
  criarAbas();
  exibirClassificacaoPor("geral", "");
});

function criarAbas() {
  const container = document.getElementById("tabs-container");

  const abas = [
    { label: "Geral", type: "geral", key: "" },
    { label: "Turno 1", type: "turnos", key: "turno_1" },
    { label: "Turno 2", type: "turnos", key: "turno_2" },
    ...Object.keys(classificacaoLigaClassica.meses).map(mes => ({
      label: mes,
      type: "meses",
      key: mes
    }))
  ];

  abas.forEach((aba, index) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (index === 0 ? " active" : "");
    btn.textContent = aba.label;
    btn.dataset.type = aba.type;
    btn.dataset.key = aba.key;

    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
      btn.classList.add("active");
      exibirClassificacaoPor(aba.type, aba.key);
    });

    container.appendChild(btn);
  });
}

function exibirClassificacaoPor(tipo, chave) {
  let dados = [];

  if (tipo === "geral") {
    const geral = classificacaoLigaClassica.geral;
    for (const time in geral) {
      const rodadas = geral[time];
      const totalPontos = Object.values(rodadas).reduce((acc, val) => acc + val, 0);
      dados.push({ time, totalPontos });
    }
  } else {
    const registros = classificacaoLigaClassica[tipo][chave];
    for (const time in registros) {
      dados.push({ time, totalPontos: registros[time] });
    }
  }

  dados.sort((a, b) => b.totalPontos - a.totalPontos);
  renderizarTabela(dados);
}

function renderizarTabela(classificacao) {
  const tbody = document.getElementById("classificacao-corpo");
  tbody.innerHTML = "";

  classificacao.forEach((item, index) => {
    const escudo = escudosTimes[item.time] || "escudos/default.png";
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <div class="time-info">
          <img src="${escudo}" class="escudo" alt="${item.time}" />
          ${item.time}
        </div>
      </td>
      <td>${item.totalPontos.toFixed(2)}</td>
    `;

    tbody.appendChild(row);
  });
}

function renderizarTabela(classificacao) {
  const tbody = document.getElementById("classificacao-corpo");
  tbody.innerHTML = "";

  classificacao.forEach((item, index) => {
    const escudo = escudosTimes[item.time] || "escudos/default.png";
    const posicao = index + 1;

    let destaque = "";
    let icone = "";

    switch (posicao) {
      case 1:
        destaque = "primeiro";
        icone = "🥇";
        break;
      case 2:
        destaque = "segundo";
        icone = "🥈";
        break;
      case 3:
        destaque = "terceiro";
        icone = "🥉";
        break;
      case 4:
      case 5:
        destaque = "top5";
        icone = "⭐";
        break;
    }

    const row = document.createElement("tr");
    if (destaque) row.classList.add(destaque);

    row.innerHTML = `
      <td>${posicao} ${icone}</td>
      <td>
        <div class="time-info">
          <img src="${escudo}" class="escudo" alt="${item.time}" />
          ${item.time}
        </div>
      </td>
      <td>${item.totalPontos.toFixed(2)}</td>
    `;

    tbody.appendChild(row);
  });
}
