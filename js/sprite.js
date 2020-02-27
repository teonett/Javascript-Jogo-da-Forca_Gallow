const createSprite = selector => {

    const moveFrame = (from, to) => {

        $el.removeClass(from)
            .addClass(to);
    };

    const hasNext = () => current + 1 <= last;

    const nextFrame = () => {

        if (hasNext()) moveFrame(frames[current], frames[++current]);
    };

    const reset = () => {

        moveFrame(frames[current], frames[0]);
        current = 0;
    };

    const isFinished = () => !hasNext();

    const $el = $(selector);

    const frames = [
        'movement1', 'movement2', 'movement3', 'movement4', 'movement5',
        'movement6', 'movement7', 'movement8', 'movement9'
    ];

    let current = 0;
    const last = frames.length - 1;

    $el.addClass(frames[current]);

    return {
        nextFrame,
        reset,
        isFinished
    };
};

