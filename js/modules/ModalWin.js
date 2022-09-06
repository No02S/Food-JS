export function modalHide (modal) {
    modal.style.animation = "hidden 0.5s forwards";
    setTimeout(function(){
        modal.style.display = "none";
    },500);
    document.body.style.overflow = '';
}

function modalWin() {
    const modalBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClouse = document.querySelector('[data-close]'),
          modalOpen = setTimeout(modalVis,30000);
    clearTimeout(modalOpen);
    function modalVis () {
        modal.style.animation = "visible 0.5s forwards";
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        clearTimeout(modalOpen);
    }

    modalBtn.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            modalVis();
        });
    });
    modal.addEventListener('click', (elem)=>{
        if(elem.target === modal || elem.target == modalClouse) {
            modalHide(modal);
        }
    });

    document.addEventListener('valuedown', (e)=>{
        if(e.code === "Escape" && window.getComputedStyle(modal).display == "block") {
            modalHide(modal);
        }
    });
    
    function openModalEndPage () {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            modalVis();
            window.removeEventListener('scroll', openModalEndPage);
        }
    }
    window.addEventListener('scroll', openModalEndPage);
}

export default modalWin;