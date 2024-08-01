document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.slide-up');

    
    const isInViewport = (elem) => {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top < window.innerHeight && 
            bounding.bottom > 0
        );
    };

    
    const checkSlide = () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('in-view');
            }
        });
    };
 
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    };

    window.addEventListener('scroll', throttle(checkSlide, 100));
    checkSlide();
});