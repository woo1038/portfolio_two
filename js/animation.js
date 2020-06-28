(() => {
    
    let yOffset = 0; // window.pageYOffsset 대신 쓸 변수
    let currentScene = 0;      // 현재 보고잇는 scene

    const sceneInfo = [
        {
            //scene 0
            type : 'sticky',
            heightNum : 10,
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-0'),
                canvas : document.querySelector('#video-canvas-0'),
                context : document.querySelector('#video-canvas-0').getContext('2d'),
                background : document.querySelector('.sticky-elem'),
                videoImages : []
            },
            values : {
                videoImageCount : 236,
                imageSequence : [0, 235],
                canvas_opacity : [1, 0, { start: 0.9, end: 1}],
                background_opacity :  [1, 0, { start: 0.9, end: 1}],
            }
        }
    ];

    function setCanvasImage() {
        let imgElem;
        for (let i=0; i<sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image(); // document.createElement('image');랑 같음
            imgElem.src = `./images/scene00${229 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
    }
    setCanvasImage();


    function checkMenu() {
        if (yOffset > 44) {
            document.body.classList.add('local-nav-sticky');
        } else {
            document.body.classList.remove('local-nav-sticky');
        }
    }
    


    function setLayout() {
        // 각 스크롤 섹션 높이 세팅
        for (let i=0; i<sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        // scene변경시 먼저 변하는 에러수정
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i=0; i<sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
    }


    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[0].scrollHeight;   //scene의 전체 높이
        const scrollRatio = currentYOffset / scrollHeight;   // 스크롤 비율

        if (values.length === 3) {
            // start ~ end 사이 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;    // 내가 현재 scene에서 사용할 비율

            // 현재 드래그가 애니메이션 사용할 범위 안에 들어가면 실행 하는 if문
            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }else if(currentYOffset < partScrollStart) {
                rv = values[0];
            }else if(currentYOffset > partScrollEnd) {
                rv = values[1];
            } 
        }else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];       // 어디부터 어디까지 실행(비율적으로 계산)
        }

        return rv;
    }


    function playAnimation() {
        // 세션 도착시간에 맞춰 애니메이션 실행
        const objs = sceneInfo[0].objs;
        const values = sceneInfo[0].values;

        let text = document.querySelector('.local-nav-links');

        let sequence = Math.round(calcValues(values.imageSequence, window.pageYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, window.pageYOffset);

        if (window.pageYOffset / sceneInfo[0].scrollHeight > 0.99) {
            for (let i = 1; i <= 7; i += 2) {
                text.childNodes[i].style.color = 'black';
            }
        } else {
            for (let i = 1; i <= 7; i += 2) {
                text.childNodes[i].style.color = 'white';
            }
        }
    }

    function scrollLoop() {
        // 각 세션 나누기

        if (yOffset > sceneInfo[0].scrollHeight) {
            currentScene = 1;
        }

        if (yOffset < sceneInfo[0].scrollHeight) {
            currentScene = 0;
        }
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
        checkMenu();
    });

    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    window.addEventListener('resize', setLayout);

})();