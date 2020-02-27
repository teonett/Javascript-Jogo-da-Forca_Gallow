const criaController = jogo => {

    const $entrada = $('.entrada');
    const $gaps = $('.gaps');

    const exibegaps = () => {

        $gaps.empty();
        jogo.getgaps().forEach(function (gap) {
            $('<li>')
                .addClass('gap')
                .text(gap)
                .appendTo($gaps);
        });
    };

    const mudaPlaceHolder = texto => $entrada.attr('placeholder', texto);

    const guardaSecretWord = () => {

        try {
            jogo.setSecretWord($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chuta | hunt');
            exibegaps();
        } catch(err) {
            alert(err.message);
        }
    };

    const reinicia = () => {

        jogo.reinicia();
        $gaps.empty();
        mudaPlaceHolder('palavra secreta | secret word');
    };

    const leChute = () => {

        try {
            jogo.processaChute($entrada.val().trim().substr(0, 1));
            $entrada.val('');
            exibegaps();
    
            if(jogo.ganhouOuPerdeu()) {
    
                setTimeout(() => {
                    if(jogo.ganhou()) {
                        alert('Parabéns, você ganhou |  Congratulations you win');
                    } else if (jogo.perdeu()) {
                        alert('Que pena, tente novamente | What pity, try again')
                    }
                    reinicia();                    
                }, 200);
            }
        } catch(err) {
            alert(err.message);
        }
    };

    const inicia = () => {

        $entrada.keypress(event => {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaSecretWord();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    return { inicia };
};