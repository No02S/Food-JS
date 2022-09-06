import {getRes} from './services/services';

function cards () {
    const container = document.querySelector('.menu__field .container'),
          card = container.querySelector('.menu__item');
    card.querySelector('.menu__item-total').innerHTML = "<span></span> руб/день";
    container.style.flexWrap = 'wrap';
    container.innerHTML = '';
    class cardItem {
        constructor (obj, ...classes) {
            this.card = card.cloneNode(true);
            this.card.style.marginBottom = '50px';
            this.card.querySelector('img').setAttribute('src',obj.img);
            this.card.querySelector('img').setAttribute('alt',obj.imgAlt);
            this.card.querySelector('.menu__item-subtitle').textContent = obj.title;
            this.card.querySelector('.menu__item-descr').textContent = obj.descr;
            this.card.querySelector('.menu__item-total span').textContent = this.convertInSomeValute(obj.price,obj.course); 

            if (classes.length != 0) {
                classes.forEach(currentClass => this.card.classList.add(currentClass));
            }
            container.append(this.card);
        }
        convertInSomeValute(price,course = 1) {
            return price * course;
        }
    }
    getRes('./dataBase.json', "cards")
        .then(data =>{
            data.forEach(card=>{
                new cardItem(card);
            });
        })
        .catch(error => {
            const errorArea = document.querySelector('.menu__field', '.container');
            errorArea.innerHTML = `ошибка загрузки меню, пожалуйста попробуйте позднее...<br> ${error}`.toUpperCase();
            errorArea.style.textAlign ="center";
            errorArea.style.fontSize = "25px";
        });
}

export default cards;