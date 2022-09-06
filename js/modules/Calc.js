function calculator () {
    const gender = document.querySelector('#gender'),
          parameters = document.querySelectorAll('.calculating__choose_medium input'),
          activity = document.querySelector('.calculating__choose_big'),
          result = document.querySelector('.calculating__result span');

    let localStor = {
        sex:'female',
        act:1.375,
        setings: ['','','']
    };

    function listner (section) {
        section.addEventListener('click', (e)=>{
            if (e.target.classList.contains('calculating__choose-item')) {
                for(let value of section.children) {
                    value.classList.remove('calculating__choose-item_active');
                }

                e.target.classList.add('calculating__choose-item_active');

                if (e.target.getAttribute('data-active')) {
                    localStor.act = +e.target.getAttribute('data-active');
                    localStorage.setItem('calc',JSON.stringify(localStor));

                } else if (e.target.getAttribute('data-male')) {
                    localStor.sex =  e.target.getAttribute('data-male');
                    localStorage.setItem('calc',JSON.stringify(localStor));
                }
            }
            calcResult ();
        });
    }
    
    function calcResult () {
        if (checkedInputs()) {
            if (localStor.sex == "female") {
                // BMR = 447,593 + (9,247 * вес в кг) + (3,098 * рост в см) - (4,330 * возраст в годах).
                result.textContent = ((447.593 + (9.247 * (+localStor.setings[1])) + (3.098 * (+localStor.setings[0]) - (4.330 * (+localStor.setings[2]))))*localStor.act).toFixed();
            
            } else if (localStor.sex == "male") {
                // BMR = 88,362 + (13,397 * вес в кг) + (4,799 * рост в см) - (5,677 * возраст в годах).
                result.textContent = ((88.362 + (13.397 * (+localStor.setings[1])) + (4.799 * (+localStor.setings[0]) - (5.677 * (+localStor.setings[2]))))*localStor.act).toFixed();
            }
        } else {
            result.textContent = "0";
        }

        function checkedInputs () {
            let flag = true;
            localStor.setings.forEach(set =>{
                if (set == '') {
                    flag = false;
                }
            });
            
            return flag;
        }
    }
    
    if (localStorage.getItem('calc')) {
        localStor = JSON.parse(localStorage.getItem('calc', localStor));
        calcResult();
    }

    document.querySelector(`[data-male="${localStor.sex}"]`).classList.add('calculating__choose-item_active');
    document.querySelector(`[data-active="${localStor.act}"]`).classList.add('calculating__choose-item_active');

    parameters.forEach((atr,i) =>{
        atr.value = localStor.setings[i]|| '';
        atr.addEventListener('input',()=>{
            atr.value = atr.value.replace(/\D/g, '');
            if (atr.value.length >3) {
                atr.value =+atr.value.match(/.../);
            }
            localStor.setings[i] = +atr.value;
            localStorage.setItem('calc',JSON.stringify(localStor));
            calcResult();
        });
    });

    listner(gender);
    listner(activity);
    // new MutationObserver((calcResult)).observe(calculator, {
    //     attributes: true,
    //     childList: true,
    //     subtree: true
    // });
}

export default calculator;