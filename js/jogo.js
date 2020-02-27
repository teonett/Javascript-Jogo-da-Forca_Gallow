const criaJogo =  sprite => {

    let palavraSecreta = '';
    let lacunas = [];
    let etapa = 1;

    const ganhou =  () => lacunas.length
            ? !lacunas.some(function (lacuna) {
                return lacuna == '';
            })
            : false;

    const perdeu = () => sprite.isFinished();
    
    const ganhouOuPerdeu = () => ganhou() || perdeu();

    const reinicia = () => {

        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
    };

    const processaChute = chute => {

        if (!chute.trim()) throw Error('Chute inválido | Invalid hunt');

        const exp = new RegExp(chute, 'gi');
        let resultado, acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {

            acertou = lacunas[resultado.index] = chute;
        }

        if (!acertou) sprite.nextFrame();
    };

    const criaLacunas = () => {

        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
        }
    };

    const proximaEtapa = () => etapa = 2;

    const setPalavraSecreta = palavra => {

        if (!palavra.trim()) throw Error('Palavra secreta inválida | Invalid secret word');

        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    const getLacunas = () => lacunas;

    const getEtapa = () => etapa;

    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    };
};