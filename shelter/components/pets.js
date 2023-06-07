import {pets} from "../index.js";
//pagination 
  const 
    list = document.querySelector('.slider_list'),   
    listItems = list.querySelectorAll('.slider__item'),
    firstPage = document.querySelector('.first_page'),
    prevPage = document.querySelector('.prev_page'),
    pageNumber = document.querySelector('.page_number'),
    nextPage = document.querySelector('.next_page'),
    lastPage = document.querySelector('.last_page');

function initPagination() { 
    let 
        renderList = (arr) => { 
            listItems.forEach((e, i) => { 
                if ( arr[i] ) { 
                    e.querySelector('img').src = arr[i].img;
                    e.querySelector('.slider__title').textContent = arr[i].name;
                }
            })
        },
        shuffle = (array) =>  array.sort(() => Math.random() - 0.5),
        genRandArrData = (arr) => { 
            let result = [];
            for(let i = 0; i<6; i++) { 
                result.push(...shuffle([...arr]));
            }
            return result
        },
        pageSize = () => { 
            let copyArr = [...listItems];
            copyArr.forEach((e, i ,array) => {
                window.getComputedStyle(e).display !== 'none' ? '': copyArr.splice(i);
            })
            return copyArr.length;
        },
        chunkData = function(arr, size) {
            const result = []
            for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size))
            }
            return result
        },
        disableLast = () => { 
            nextPage.classList.add('disabled')
            lastPage.classList.add('disabled')
        },
        disablePrev = () => { 
            firstPage.classList.add('disabled')
            prevPage.classList.add('disabled')
        },
        enableLast = () => {
            nextPage.classList.remove('disabled')
            lastPage.classList.remove('disabled')
        },
        enablePrev = () => { 
            firstPage.classList.remove('disabled')
            prevPage.classList.remove('disabled')
        },
        data = genRandArrData(pets),
        pgSize = pageSize(),
        countOfPage = data.length / pgSize,
        currentPageNumber = 1,
        chunkedData = chunkData(data, pgSize),
        first = () => { 
            currentPageNumber = 1;
            pageNumber.textContent = 1;
            disablePrev();
            enableLast();
            renderList(chunkedData[currentPageNumber - 1]);
        },
        prev = () => { 
            if (currentPageNumber > 1) { 
                currentPageNumber -= 1;
                pageNumber.textContent = currentPageNumber;
                renderList(chunkedData[currentPageNumber - 1])
            }
            if ( currentPageNumber < countOfPage) { 
                enableLast()
            }
            if ( currentPageNumber === 1) { 
                disablePrev()
            }
        },
        next = () => {
            if (currentPageNumber < countOfPage) { 
                currentPageNumber += 1;
                pageNumber.textContent = currentPageNumber;
                renderList(chunkedData[currentPageNumber - 1])
            }
            if ( currentPageNumber > 1) { 
                enablePrev()
            }
            if ( currentPageNumber === countOfPage) { 
                disableLast()
            }
        },
        last = () => {
            currentPageNumber = countOfPage;
            pageNumber.textContent = countOfPage;
            enablePrev();
            disableLast();
            renderList(chunkedData[currentPageNumber - 1])
        }
    

    window.addEventListener("resize", () => {
        pgSize =  pageSize();
        countOfPage = data.length / pgSize;
        chunkedData = chunkData(data, pgSize);
        console.log(countOfPage)
        first()
    });

    firstPage.addEventListener('click', (e) => { 
        first();
    })
    prevPage.addEventListener('click', (e) => { 
        prev();
    })
    nextPage.addEventListener('click', (e) => { 
        next()
    })
    lastPage.addEventListener('click', (e) => { 
        last()
    })

    //modals
    const 
    mainBody = document.querySelector('body'),      
    popBg = document.querySelector('.pop'),
    pop = document.querySelector('.pop__container'),
    popClose = document.querySelector('.pop_button');
    const getDataClikedPet = (item) => {
        let result = {}
        chunkedData[currentPageNumber-1].map((pet, i, arr) => { 
        if ( item.querySelector('.slider__title').textContent == pet.name ) { 
        console.log(arr[i])
        result =  arr[i]
        }
        })
        if(result) { 
            pop.querySelector('.pop__img').src = result.img;
            pop.querySelector('.pop_title').textContent = result.name;
            pop.querySelector('.pop__subheading').textContent = `${result.type} - ${result.breed}`;;
            pop.querySelector('.pop__text').textContent = result.description;
            pop.querySelector('.pop__age').textContent = result.age;
            pop.querySelector('.pop__dis').textContent = result.diseases;
            pop.querySelector('.pop__inc').textContent = result.inoculations;
            pop.querySelector('.pop__parasit').textContent = result.parasites;
        }
    }
    const togglePop = () => { 
    popBg.classList.toggle('active');
    pop.classList.toggle('active');
    mainBody.style.overflowY = ( mainBody.style.overflowY == 'scroll' || !mainBody.style.overflowY) ? 'hidden' : 'scroll'
    }
    popClose.addEventListener('click', (e) => { 
    e.target && togglePop();
    })

    window.addEventListener('click', (e) => {   
    e.target.classList.contains('pop') && 
    e.target.classList.contains('active') && 
    togglePop()
    })

    listItems.forEach((item) => { 
        item.addEventListener('click', (e) => { 
            console.log('1321')
            console.log( getDataClikedPet(item))
            getDataClikedPet(item)
            togglePop();
        })
    })
}
initPagination()