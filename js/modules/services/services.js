export function getZero(num) {
    if(num>= 0 && num<10) {
        return `0${num}`;
    } else {
        return num;
    }
}

export async function getRes (url,item)  {
    const g = await fetch(url)
        .then(data =>{
            if (!data.ok) {
                throw new Error(`ошибка ${data.status}`);
            }else {
                return data.json();
            }
        }).then(data =>{
                for(let key in data) {
                    if(key == item) {
                        return data[key];
                    }
                }
        }).catch(error => {
        });

    return await g;
}


