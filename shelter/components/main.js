//pets
    import {pets} from "../index.js";

  const 
      Item = document.querySelectorAll('.slider__item'),   
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next'),
      generateSlides = (arr) => { 
        console.log(arr)
        Item.forEach((e, i) => { 
            e.querySelector('img').src = arr[i].img;
            e.querySelector('.slider__title').textContent = arr[i].name;
        })
      },
      random = (min, max) => Math.floor(Math.random() * (max - min)) + min,
      getSlide = (petsCopy) => {
          const slide = [];
          for (let i = 0; i < 3; i++) {
            const petIndex = random(0, petsCopy.length - 1);
            const pet = petsCopy.splice(petIndex, 1)[0];
            slide.push(pet)
          }
      
          return slide;
      },
      animate = (type) => { 
        console.log(type)
        Item.forEach((e, i) => {
          e.style.visibility = 'hidden';
          type === 'left' ? e.style.left = '-500px' : e.style.right = '-500px';
          type === 'left' ? e.style.right = 'auto' : e.style.left = 'auto';
          setTimeout(() => {
            e.style.visibility = 'visible';
            type === 'left' ? e.style.left = '0' : e.style.right = '0';
            e.style.transition = `${type} 0.3s ease-in-out`
          }, type === 'left' ? [...Item].reverse().indexOf(e)*100 + 400 : i*100 + 400)
        })
      };
  
    const initSlider = () => { 
      let petsCopy = [...pets]
      let currArr = [];
      let prevArr = [];
      let nextArr = [];
      currArr =  getSlide(petsCopy);
      nextArr = getSlide([...petsCopy]);
      prevArr = getSlide([...petsCopy]);
  
      generateSlides(currArr);
      
      next.addEventListener('click', (e)=>{
        e.target && generateSlides(nextArr);
        prevArr = currArr;
        currArr = nextArr;
        const notContainCurrentArray = [...pets].filter((item) => { 
          return !currArr.includes(item) 
        })
        nextArr = getSlide(notContainCurrentArray);
        animate('right')
  
      })
      prev.addEventListener('click', (e)=>{
        e.target && generateSlides(prevArr);
        nextArr = currArr;
        currArr = prevArr;
        const notContainCurrentArray = [...pets].filter((item) => { 
          return !currArr.includes(item) 
        })
        prevArr = getSlide(notContainCurrentArray);
        animate('left')
      })
    }
    initSlider();

//modals
const 
      mainBody = document.querySelector('body'),      popBg = document.querySelector('.pop'),
      pop = document.querySelector('.pop__container'),
      popClose = document.querySelector('.pop_button');
const getDataClikedPet = (item) => {
  let result = {}
  pets.map((pet, i, arr) => { 
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

Item.forEach((item) => { 
  item.addEventListener('click', (e) => { 
    console.log( getDataClikedPet(item))
    getDataClikedPet(item)
    togglePop();
  })
})
