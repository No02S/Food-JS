import {getZero, getRes} from './services/services';

function secondSlayder({wrapper, inner,item,nav, arrowPrev, arrowNext,curr,total}) {
    const prev = document.querySelector(arrowPrev),
          next = document.querySelector(arrowNext),
          idCurr = document.querySelector(curr),
          idTottal =document.querySelector(total),
          sliderWrapper = document.querySelector(wrapper),
          navBar = document.querySelector(nav),
          slider = sliderWrapper.querySelector(inner),
          wrapperWidth = window.getComputedStyle(sliderWrapper).width;

    let sliderElements,
        navBarElements; 
    getRes('./dataBase.json',"slayderImgs")
        .then((data)=>{
            data.forEach(img =>{
                let offer = document.createElement('div');
                offer.classList.add(item.slice(1));
                offer.append(document.createElement('img'));
                offer.firstElementChild.setAttribute('src',img.src);
                offer.firstElementChild.setAttribute('alt',img.alt);
                slider.append(offer);

                let navMark = document.createElement('div');
                navMark.classList.add('navMark');
                navBar.append(navMark);
            });
            idTottal.textContent = getZero(data.length);

            navBar.firstElementChild.classList.add('active');

            navBarElements = navBar.querySelectorAll('.navMark');

            sliderElements = slider.querySelectorAll(item);
            sliderElements.forEach(elem => elem.style.width = wrapperWidth);

            sliderWrapper.style.overflow = "hidden";

            slider.style.width = 100 *  sliderElements.length + "%";
            slider.style.display = "flex";
            slider.style.transition = "0.5s all";
            
            swapSlide(prev, 'prev');
            swapSlide(next, 'next');
            navBarElements.forEach((elem,i) =>swapSlide(elem,'nav',i));

            if(localStorage.getItem('slider')) {
                let volt = localStorage.getItem('slider');
                changeNav(volt);
                idCurr.textContent = getZero(volt);
                sliderRelialazeTwo(+wrapperWidth.replace(/\D/gi,'') * (volt-1));
            }
        });

    function swapSlide (arrow,nav,i) {
        let val;
        arrow.addEventListener('click', () =>{
            val = +idCurr.textContent;
            if (nav == 'prev') {
                val +=-1;
                if (val == 0) {val = +idTottal.textContent;}
            }
            if(nav == 'next') {
                val += +1;
                if (val > +idTottal.textContent) {val = 1;}
            }
            if(nav == 'nav') {
                val = i+1;
            }

            idCurr.textContent = getZero(val);
            localStorage.setItem('slider', val);
            changeNav(val);
            // console.log(+wrapperWidth.match(/\d/gi).reduce((cur,val)=>cur + val));
            // console.log(+wrapperWidth.match(/\d/gi).join(''));
            // console.log(+wrapperWidth.replace(/\D/gi,''));
            sliderRelialazeTwo(+wrapperWidth.replace(/\D/gi,'') * (val-1));
        });
    }

    function changeNav (i) {
        navBarElements.forEach((elem)=>{
            elem.classList.remove('active');
        });
        navBarElements[i-1].classList.add('active');
    }

    function sliderRelialazeTwo(value) {
        slider.style.transform = `translateX(-${value}px)`;
    }
}

export default secondSlayder;

