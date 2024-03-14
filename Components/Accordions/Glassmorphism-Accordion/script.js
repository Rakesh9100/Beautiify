let accordion_btns = document.querySelectorAll('.accordion_container .accordion .header'),
    accordion_bodys = document.querySelectorAll('.accordion_container .accordion .body');

if (accordion_btns && accordion_bodys) {
    accordion_btns = Array.isArray(accordion_btns) ? accordion_btns : Object.values(accordion_btns);
    accordion_btns.forEach(accordion_btn => {
        accordion_btn.addEventListener('click', function () {
            process_accordion(this);
        });
    });

    function process_accordion(x) {
        set_height_0();

        let next_sibling = x.nextElementSibling;
        if (next_sibling.offsetHeight > 0) {
            next_sibling.style.height = '0px';
            x.closest('.accordion').classList.remove('active');
        } else {
            next_sibling.style.height = next_sibling.scrollHeight + 30 + 'px';
            x.closest('.accordion').classList.add('active');
        }
    }

    function set_height_0() {
        accordion_bodys = Array.isArray(accordion_bodys) ? accordion_bodys : Object.values(accordion_bodys);
        accordion_bodys.forEach(accordion_body => {
            accordion_body.style.height = '0px';
            accordion_body.closest('.accordion').classList.remove('active');
        });
    }
}