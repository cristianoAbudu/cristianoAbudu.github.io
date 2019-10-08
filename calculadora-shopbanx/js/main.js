$(function(){
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
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
            
            return true;
        },
        enableFinishButton: false,
        forceMoveForward: false
    });
    
});
