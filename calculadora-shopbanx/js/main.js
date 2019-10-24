var taxaMinima = 2;


var camposPagina = [
    "",
    "#debito_visa_master",
    "#credito_a_vista_visa_master",
    "#credito_1_a_6x_visa_master",
    "#credito_7_a_12x_visa_master"
];

var valorPorPagina = [
    0,
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
            $(camposPagina[proximaPagina]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            
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
    
    $(".percent").mask('0,##%', {reverse: true});
    $(".money").mask('#.##0', {reverse: true});
    valorPorPagina[0] = parseFloat($("#valor_debito").val().replace(".",""));
    valorPorPagina[1] = parseFloat($("#valor_credito_a_vista").val().replace(".",""));
    
    $("#debito_visa_master").on(
        "blur", 
        function(){
            calculaTaxaMinimaPagina(1, 2);
        }
    );

    $("#credito_a_vista_visa_master").on(
        "blur", 
        function(){
            calculaTaxaMinimaPagina(2, 3);
        }
    );

    $("#credito_1_a_6x_visa_master").on(
        "blur", 
        function(){
            calculaTaxaMinimaPagina(3, 4);
        }
    );

    
});
