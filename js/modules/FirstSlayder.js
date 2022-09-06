function firstSlayder ({itemClass,contentClass,activeClass}) {
    const tabs = document.querySelectorAll(itemClass),
          tabsContent = document.querySelectorAll(contentClass);

    tabs.forEach((item,i) =>{
        if (item.classList.contains(activeClass.slice(1))) {
            tabsContent[i].classList.add('show');
        }
        item.addEventListener('click',() =>{
            tabs.forEach((tab,i) =>{
                tabsContent[i].classList.remove('show');
                tab.classList.remove(activeClass.slice(1));
            });
            item.classList.add(activeClass.slice(1));
            tabsContent[i].classList.add('show');
        });
    });
}

export default firstSlayder;