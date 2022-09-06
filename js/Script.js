'use strict';

import secondSlayder from './/modules/SecondSlayder';
import  firstSlayder from './/modules/FirstSlayder';
import   modalWindow from './/modules/ModalWin';
import         timer from './/modules/Timer';
import         cards from './/modules/Cards';
import          calc from './/modules/Calc';
import          form from './/modules/Form';

window.addEventListener('DOMContentLoaded', () =>{
    firstSlayder({
        itemClass:'.tabheader__item',
        contentClass:'.tabcontent',
        activeClass:'.tabheader__item_active'
    });
    secondSlayder({
        wrapper: '.offer__slider-wrapper',
        inner:'.offer__slider-inner',
        item:'.offer__slide',
        nav: '.offer__slider-nav',
        arrowPrev:'.offer__slider-prev',
        arrowNext:'.offer__slider-next',
        curr:'#current',
        total:'#total'
    });
    calc();
    cards();
    form();
    modalWindow();
    timer({
        deadLine:'2022-09-10',
        timerWrap:'.timer'
    });
}); 

