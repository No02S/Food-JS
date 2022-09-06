import {modalHide} from './ModalWin';
const $ = require('jquery');
function form () {
    const forms = document.querySelectorAll('form'),
          modal = document.querySelector('.modal');
    forms.forEach((curForm)=>bindpostData(curForm, curForm.parentElement.parentElement.querySelector('.shadow')));

    function bindpostData (form, shadow) {
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            shadow.style.display = "block";

            const info = document.createElement('div');
            info.classList.add('loader');
            shadow.append(info);
            const formData = new FormData(form);
            
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            async function postData () {
                await $.ajax({
                    url: 'server.php',
                    type: 'POST',
                    data: {myJson:  json , fileName: 'answers.json'},
                    dataType: 'html',
                });
                await fetch('./answers.json')
                    .then(data => data.text())
                    .then((data) => {
                        if (data == '') {
                            throw new Error();
                        }
                        info.classList.add('success');
                        info.innerHTML = '&#10004;';
                        form.reset();
                    
                    }).catch(()=>{
                        info.classList.add('error');
                        info.innerHTML = '&#x2718;';
        
                    }).finally (()=>{
                        info.classList.remove('loader');
                        setTimeout(()=>{
                            if (info.classList.contains('success')){
                                modalHide(modal);
                            }   
                            info.style.animation = "hidden 0.5s forwards";
                            shadow.style.backgroundColor = "rgba(51, 51, 51, 0.0)";
                            setTimeout(()=>{
                                shadow.style.display = "";
                                shadow.style.backgroundColor = "";
                                info.remove();
                            },500);
                        },2000);
                    });
            }
            postData();
        });
    }
}

export default form;