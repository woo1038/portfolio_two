(() => {
    fetch("person.json")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for(let i=0; i<data.items.length; i++) {
            
            const image = data.items[i].fields.image.fields.file.url;
            const alt = data.items[i].fields.role;
            const name = data.items[i].fields.name;
            const role = data.items[i].fields.role;


            const $ul = document.querySelector('.item-container');
            const $create_li = document.createElement('li');
            $create_li.classList = 'item';
            $ul.appendChild($create_li);

            const $create_img = document.createElement('img');
            $create_img.src = `${image}`;
            $create_img.alt = `${alt}`;
            $create_li.appendChild($create_img);

            const $create_h2 = document.createElement('h2');
            $create_h2.innerHTML = `${name}`;
            $create_h2.classList = 'name';
            $create_li.appendChild($create_h2);

            const $create_h3 = document.createElement('h3');
            $create_h3.innerHTML = `${role}`;
            $create_h3.classList = 'role';
            $create_li.appendChild($create_h3);
        }

        const $display_item = document.querySelectorAll('.item');
        for(let i=16; i<data.items.length; i++) {
            $display_item[i].style.display = 'none';
        }


        const toggle_btn = document.querySelector('.imageToggle-btn');
        toggle_btn.addEventListener('click', () => {
            for(let i=16; i<data.items.length; i++) {
                if($display_item[i].style.display === 'none') {
                    $display_item[i].style.display = 'list-item';
                    toggle_btn.innerHTML = `접기`;
                }else {
                    $display_item[i].style.display = 'none';
                    toggle_btn.innerHTML = `펼쳐보기`;
                    
                }
            }
        })


        const $search = document.querySelector('.search');
        $search.addEventListener('change', () => {
    
            const $item = document.querySelectorAll('.item');

            for (let i = 0; i < $item.length; i++) {
                const $role = $item[i].querySelectorAll('.role');
                const $name = $item[i].querySelectorAll('.name');
                if ($role[0].innerHTML.toUpperCase().indexOf($search.value.toUpperCase()) > -1 ||
                    $name[0].innerHTML.toUpperCase().indexOf($search.value.toUpperCase()) > -1) {
                    $role[0].parentElement.style.display = 'block';
                } else {
                    $role[0].parentElement.style.display = 'none';
                }
            }
        })
    });
})();