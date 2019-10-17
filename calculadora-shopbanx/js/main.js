var taxaMinima = 2;


var camposPagina = [
    "",
    "#debito_visa_master",
    "#credito_a_vista_visa_master",
    "#credito_1_a_6x_visa_master",
    "#credito_7_a_12x_visa_master"
];

var valorPorPagina = [
    700,
    150,
    100,
    50
];

function calculaSomaTaxasPagina(pagina){
    return parseFloat($(camposPagina[pagina]).val().replace("%",""));
}

function calculaTaxaMinimaPagina(pagina, proximaPagina){
   
    var valorPagina = 0;
    var valorMinimoPorPagina = 0;


    for(i=1; i<=pagina; i++){
        valorPagina += (calculaSomaTaxasPagina(i) / 100) * valorPorPagina[i];

        valorMinimoPorPagina += (taxaMinima / 100) * valorPorPagina[i] ;
    }

    var diferenca = valorMinimoPorPagina - valorPagina;

    if(diferenca > 0){

        var valorProximaPagina = (calculaSomaTaxasPagina(i)/100) * valorPorPagina[proximaPagina];

        if(valorProximaPagina - ((taxaMinima / 100) * valorPorPagina[proximaPagina] ) < diferenca){

            var incremento = diferenca / valorPorPagina[proximaPagina];

            var novoValor = 
                    parseFloat($(camposPagina[proximaPagina]).val().replace("%",""))
                    +
                    (incremento)

            if(novoValor%0.01 > 0){
                novoValor=novoValor+0.01;
            }
            $(camposPagina[proximaPagina]).val(
                (
                  novoValor  
                ).toFixed(2)+"%"
            );
            
        }
    }  
}

function populaContrato(){
    for(i = 1; i<camposPagina.length; i++){
        $(camposPagina[i]+"-val").html(
             $(camposPagina[i]).val()
        )
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
            if(currentIndex<newIndex && newIndex < camposPagina.length && currentIndex > 0 ){
                calculaTaxaMinimaPagina(currentIndex, newIndex);
            }else if(newIndex == camposPagina.length+1){
                populaContrato();
            }
            
            return true;
        },
        enableFinishButton: false,
        forceMoveForward: false
    });
    $(".percent").mask('0.00%', {reverse: true});
    $(".money").mask('#.##0', {reverse: true});
    valorPorPagina[0] = parseFloat($("#valor_debito").val().replace(".",""));
    valorPorPagina[1] = parseFloat($("#valor_credito_a_vista").val().replace(".",""));

});
