
$(function () {
  const rodadaIda = 12;
  const rodadaVolta = 13;

  const rodadaAtual = (() => {
    const rIds = resultados_oitavas_sula.map(r => r.rodada);
    return rIds.length ? Math.max(...rIds) : rodadaIda;
  })();

  const jogos = [...new Set(confrontos_oitavas_sula.map(j => j.jogo))];

  const teams = jogos.map(jogo => {
    const ida = confrontos_oitavas_sula.find(c => c.jogo === jogo && c.rodada === rodadaIda);
    return [ida?.mandante?.nome ?? "?", ida?.visitante?.nome ?? "?"];
  });

  const results = jogos.map(jogo => {
    const ida = resultados_oitavas_sula.find(r => r.jogo === jogo && r.rodada === rodadaIda);
    const volta = resultados_oitavas_sula.find(r => r.jogo === jogo && r.rodada === rodadaVolta);

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

  // Determinar qual jogo está sendo disputado com base na rodada atual
  // let descricaoRodada = "";
  // if (rodadaAtual < rodadaVolta) {
  //   descricaoRodada = "🕒 Jogo de Ida (Rodada " + rodadaIda + ")";
  // } else if (rodadaAtual === rodadaVolta) {
  //   descricaoRodada = "🏁 Jogo de Volta (Rodada " + rodadaVolta + ")";
  // } else {
  //   descricaoRodada = "✅ Confrontos Finalizados (até Rodada " + rodadaAtual + ")";
  // }

  // Exibir rodada atual e fase
  const containerRodada = $("<div>")
    .addClass("info-rodada")
    .html(`<span>${descricaoRodada}</span>`);

  // $("body").prepend(containerRodada);
  $(".header").after(containerRodada);


  $(".team").addClass("highlight");  // só para testar

  // Aplicar classes condicionalmente após renderização
  $(".round .team").each(function () {
    const texto = $(this).text().trim();

    // Se o time avançou mas ainda não deve aparecer (jogo de ida)
    if (rodadaAtual < rodadaVolta && texto !== "TBD") {
      $(this).addClass("classificado-oculto");
    }

    // Se já pode mostrar (jogo de volta ou mais)
    if (rodadaAtual >= rodadaVolta && texto !== "TBD") {
      $(this).addClass("classificado-visivel");
    }
  });

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
});
