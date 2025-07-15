$(function () {
  const rodadaIda = 15;
  const rodadaVolta = 16;

  const rodadaAtual = (() => {
    const rIds = resultados_quartas_sula.map(r => r.rodada);
    return rIds.length ? Math.max(...rIds) : rodadaIda;
  })();

  const jogos = [...new Set(confrontos_quartas_sula.map(j => j.jogo))];

  const teams = jogos.map(jogo => {
    const ida = confrontos_quartas_sula.find(c => c.jogo === jogo && c.rodada === rodadaIda);
    return [ida?.mandante?.nome ?? "?", ida?.visitante?.nome ?? "?"];
  });

  const results = jogos.map(jogo => {
    const ida = resultados_quartas_sula.find(r => r.jogo === jogo && r.rodada === rodadaIda);
    const volta = resultados_quartas_sula.find(r => r.jogo === jogo && r.rodada === rodadaVolta);

    const ida_p1 = ida?.mandante?.pontos ?? null;
    const ida_p2 = ida?.visitante?.pontos ?? null;

    const volta_p1 = volta?.visitante?.pontos ?? null;
    const volta_p2 = volta?.mandante?.pontos ?? null;

    const ida_disputada = ida_p1 !== null && ida_p2 !== null;
    const volta_disputada = volta_p1 !== null && volta_p2 !== null;

    if (ida_disputada && volta_disputada) {
      return [
        parseFloat((ida_p1 + volta_p1).toFixed(2)),
        parseFloat((ida_p2 + volta_p2).toFixed(2))
      ];
    } else if (ida_disputada && !volta_disputada) {
      return [
        parseFloat(ida_p1.toFixed(2)),
        parseFloat(ida_p2.toFixed(2))
      ];
    } else {
      return [null, null];
    }
  });

  // faixa laranja da rodada
  // let descricaoRodada = "";
  // if (rodadaAtual < rodadaVolta) {
  //   descricaoRodada = "🕒 Jogo de Ida (Rodada " + rodadaIda + ")";
  // } else if (rodadaAtual === rodadaVolta) {
  //   descricaoRodada = "🏁 Jogo de Volta (Rodada " + rodadaVolta + ")";
  // } else {
  //   descricaoRodada = "✅ Confrontos Finalizados (até Rodada " + rodadaAtual + ")";
  // }

  const containerRodada = $("<div>")
    .addClass("info-rodada")
    .html(`<span>${descricaoRodada}</span>`);

  $(".header").after(containerRodada);

  // Inicializar bracket
  $('#bracket').bracket({
    init: {
      teams: teams,
      results: [results]
    },
    teamWidth: 200,
    scoreWidth: 50,
    matchMargin: 40,
    roundMargin: 60,
    centerConnectors: true,
    disableToolbar: true,
    save: function () {} // Desativa edição
  });

  // Aplicar estilos para visibilidade dos classificados
  $(".round .team").each(function () {
    const texto = $(this).text().trim();

    if (rodadaAtual < rodadaVolta && texto !== "TBD") {
      $(this).addClass("classificado-oculto");
    }

    if (rodadaAtual >= rodadaVolta && texto !== "TBD") {
      $(this).addClass("classificado-visivel");
    }
  });

  // (Opcional) Exibir em texto os jogos
  
  // const containerTimes = $("<div>")
  //   .addClass("info-times")
  //   .html(teams.map(t => `<span>${t[0]} vs ${t[1]}</span>`).join("<br>"));

  // const containerResultados = $("<div>")
  //   .addClass("info-resultados")
  //   .html(results.map(r => `<span>${r[0] ?? "?"} - ${r[1] ?? "?"}</span>`).join("<br>"));

  // $(".header").after(containerTimes, containerResultados);
  
});
