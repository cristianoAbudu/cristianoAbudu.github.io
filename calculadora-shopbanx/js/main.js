var taxaMinima = 1.84;


var camposPagina = [
    ["#debito_visa_master", "#debito_elo", "#debito_hipercard"],
    ["#credito_a_vista_visa_master", "#credito_a_vista_elo", "#credito_a_vista_hipercard"],
    ["#credito_1_a_6x_visa_master", "#credito_1_a_6x_elo", "#credito_1_a_6x_hipercard"],
    ["#credito_7_a_12x_visa_master", "#credito_7_a_12x_elo", "#credito_7_a_12x_hipercard"],
    ["#taxa_antecipacao"]

];

function calculaSomaTaxasPagina(pagina){
    var somaTaxasPagina = 0;

    for(i=0; i<camposPagina[pagina].length; i++){
        somaTaxasPagina += parseFloat($(camposPagina[pagina][i]).val().replace("%",""))
    }

    return somaTaxasPagina;
}

function calculaTaxaMinimaPagina(pagina, proximaPagina){
    var somaTaxasPaginaAtual = calculaSomaTaxasPagina(pagina);

    var taxaMinimaPorPagina = taxaMinima * camposPagina[pagina].length;

    var diferenca = taxaMinimaPorPagina - somaTaxasPaginaAtual;

    if(diferenca > 0){
        var somaTaxasProximaPagina = calculaSomaTaxasPagina(proximaPagina);

        var taxaMinimaProximaPagina = taxaMinima * camposPagina[proximaPagina].length;

        var incremento = (taxaMinimaProximaPagina + diferenca) - somaTaxasProximaPagina;

        if(incremento > 0){

            for(i=0; i<camposPagina[proximaPagina].length; i++){
                var novoValor = 
                        parseFloat($(camposPagina[proximaPagina][i]).val().replace("%",""))
                        +
                        (incremento/camposPagina[proximaPagina].length)

                if(novoValor%0.01 > 0){
                    novoValor=novoValor+0.01;
                }
                $(camposPagina[proximaPagina][i]).val(
                    (
                      novoValor  
                    ).toFixed(2)+"%"
                );
            }
        }
    }  
}

function populaContrato(){
    for(i = 0; i<camposPagina.length; i++){
        for(j=0; j<camposPagina[i].length; j++){
            $(camposPagina[i][j]+"-val").html(
                 $(camposPagina[i][j]).val()
            )
        }
    }
    $("#antecipacao_automatica-val").html(
         $("#antecipacao_automatica").is(':checked')?
         "Sim":
         "Não"
    );
}

$(function(){
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: false,
        autoFocus: true,
        transitionEffectSpeed: 500,
        titleTemplate : '<span class="title">#title#</span>',
        labels: {
            previous : 'Anterior',
            next : 'Próximo',
            finish : 'Validar',
            current : 'Current'
        },
        onStepChanging: function (event, currentIndex, newIndex) { 
            if(currentIndex<newIndex && newIndex < camposPagina.length){
                calculaTaxaMinimaPagina(currentIndex, newIndex);
            }else if(newIndex == camposPagina.length){
                populaContrato();
            }
            
            return true;
        },
        enableFinishButton: false,
        forceMoveForward: false
    });
    $(":text").mask('0.00%', {reverse: true});

});
