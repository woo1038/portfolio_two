(() => {

    const $making_toggleBtn = document.querySelector('.makingToggle-btn');
    const $making_box = document.querySelector('.making-box');
    $making_toggleBtn.addEventListener('click', hide);
    let $flag1 = false;
    let $flag2 = false;

    function hide() {
        if($flag1 === true) {
            $making_box.style.display = 'none';
            $making_toggleBtn.innerHTML = `제작노트 보기`;
            $flag1 = false;
        }else {
            $making_box.style.display = 'inline';
            $making_toggleBtn.innerHTML = `제작노트 접기`;
            $flag1 = true;
        }
    }

    const $content_toggleBtn = document.querySelector('.contentToggle-btn');
    const $text_container = document.querySelector('.text-container');
    $content_toggleBtn.addEventListener('click', show);
    
    function show() {
        if($flag2 === false) {
            $text_container.style.height = `auto`;
            $content_toggleBtn.innerHTML = `내용 접기`;
            $flag2 = true;
        }else {
            $text_container.style.height = `300px`;
            $content_toggleBtn.innerHTML = `내용 더보기`;
            $flag2 = false;
        }
    }

})();