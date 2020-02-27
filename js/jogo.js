const criaJogo =  sprite => {

    let secretword = '';
    let gaps = [];
    let etapa = 1;

    const winner =  () => gaps.length
            ? !gaps.some(function (gap) {
                return gap == '';
            })
            : false;

    const looser = () => sprite.isFinished();
    
    const winnerOulooser = () => winner() || looser();

    const reinicia = () => {

        step = 1;
        gaps = [];
        secretword = '';
        sprite.reset();
    };

    const processaChute = chute => {

        if (!chute.trim()) throw Error('Chute inválido | Invalid hunt');

        const exp = new RegExp(chute, 'gi');
        let resultado, hit = false;

        while (resultado = exp.exec(secretword)) {

            hit = gaps[resultado.index] = chute;
        }

        if (!hit) sprite.nextFrame();
    };

    const criagaps = () => {

        for (let i = 0; i < secretword.length; i++) {
            gaps.push('');
        }
    };

    const proximaEtapa = () => etapa = 2;

    const setsecretword = palavra => {

        if (!palavra.trim()) throw Error('Palavra secreta inválida | Invalid secret word' );

        secretword = palavra;
        criagaps();
        proximaEtapa();
    };

    const getgaps = () => gaps;

    const getEtapa = () => etapa;

    return {
        setsecretword,
        getgaps,
        getEtapa,
        processaChute,
        winner,
        looser,
        winnerOulooser,
        reinicia
    };
};