const createSprite = selector => {

    const movemovement = (from, to) => {

        $el.removeClass(from)
            .addClass(to);
    };

    const hasNext = () => current + 1 <= last;

    const nextMovement = () => {

        if (hasNext()) movemovement(movements[current], movements[++current]);
    };

    const reset = () => {

        movemovement(movements[current], movements[0]);
        current = 0;
    };

    const isFinished = () => !hasNext();

    const $el = $(selector);

    const movements = [
        'movement1', 'movement2', 'movement3', 'movement4', 'movement5',
        'movement6', 'movement7', 'movement8', 'movement9'
    ];

    let current = 0;
    const last = movements.length - 1;

    $el.addClass(movements[current]);

    return {
        nextMovement,
        reset,
        isFinished
    };
};

