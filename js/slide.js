(() => {

    const photoInfo = 
        {
            photo : [],
            photoValue : 11
        };


    // 객체 이미지 넣기
    function setImage() {
        let imgElem;
        for(let i=1; i<=photoInfo.photoValue; i++) {
            imgElem = `../images/photo/movie_image${i}.jpg`;
            photoInfo.photo.push(imgElem);
        }
    }
    setImage();

    const $left_btn = document.querySelector('.fa-arrow-left');
    const $right_btn = document.querySelector('.fa-arrow-right');
    const $image = document.querySelector('.image');
    const $counting = document.querySelector('.count');
    let count = 0;

    // 이미지 카운팅
    $counting.innerHTML = `${count + 1} / ${photoInfo.photoValue}`;

    // 이미지 버튼 이벤트
    $right_btn.addEventListener('click', () => {
        if(count >= 10) return;
        count++;
        $image.src = `${photoInfo.photo[count]}`;
        $counting.innerHTML = `${count + 1} / ${photoInfo.photoValue}`;
    });

    $left_btn.addEventListener('click', () => {
        if(count <= 0) return;
        count--;
        $image.src = `${photoInfo.photo[count]}`;
        $counting.innerHTML = `${count + 1} / ${photoInfo.photoValue}`;
    });
})();