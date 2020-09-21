const img = document.querySelector('.catImg')
const btn = document.querySelectorAll('button')
const span = document.querySelectorAll('span')
const modal = document.querySelector('#modal')
const modal2 = document.querySelector('#modal2')
const xBtn = document.querySelector('.modal2__top i')
const input = document.querySelectorAll('input')
let catImgUrl = ''

// 고양이 이미지 가져오기
function getCatImg () {
  const url = 'https://aws.random.cat/meow'
  fetch(url)
    .then(( res ) => res.json())
    .then(( data ) => {
      console.log(data.file)
      catImgUrl = data.file
      img.style.backgroundImage = `url("${data.file}")`
    })
    .then(() => {
      setTimeout(() => {
        const level = Math.floor(Math.random()*100)
        span[3].innerHTML = Math.floor(Math.random()*100)
        if ( level < 40 ) {
          span[1].innerHTML = '노멀'
          span[1].style.color = 'gray'
          span[2].innerHTML = Math.floor(Math.random()*400)
        } else if ( level < 70 ) {
          span[1].innerHTML = '레어'
          span[1].style.color = 'skyblue'
          span[2].innerHTML = 400 + Math.floor(Math.random()*300)
        } else if ( level < 85 ) {
          span[1].innerHTML = '에픽'
          span[1].style.color = 'purple'
          span[2].innerHTML = 700 + Math.floor(Math.random()*150)
        } else if ( level < 95 ) {
          span[1].innerHTML = '유니크'
          span[1].style.color = 'yellow'
          span[2].innerHTML = 850 + Math.floor(Math.random()*100)
        }  else if ( level < 98 ) {
          span[1].innerHTML = '레전드리'
          span[1].style.color = 'lime'
          span[2].innerHTML = 950 + Math.floor(Math.random()*30)
        } else {
          if ( Math.floor(Math.random()*10) === 0 ) {
            span[1].innerHTML = '먐먀'
            span[1].style.color = 'pink'
            span[2].innerHTML = 1020 + Math.floor(Math.random()*15)
          } else {
            span[1].innerHTML = '고양이신'
            span[1].style.color = 'red'
            span[2].innerHTML = 980 + Math.floor(Math.random()*25)
          }
        }
      }, 500)
    })
}

// 코인 얻기 버튼
btn[0].addEventListener('click', () => {
  modal.style.display = 'block'
})

// 뽑기 버튼
btn[2].addEventListener('click', () => {
  if ( window.confirm("한번 뽑는데 코인 1개가 소모됩니다. 뽑겠습니까?") ) {
    if ( span[0].innerHTML > 0 ) {
      span[0].innerHTML = --span[0].innerHTML
      localStorage.coin = span[0].innerHTML
      getCatImg()
    } else {
      window.alert("코인이 부족합니다!")
    }
  }
})

// 돌아가기 버튼
btn[4].addEventListener('click', () => {
  modal.style.display = 'none'
})

// localStorage에 코인 property 추가
if( !localStorage.coin ) {
  localStorage.setItem('coin', span[0].innerHTML)
} else {
  span[0].innerHTML = localStorage.coin
}

// 미니게임
function RCP ( e ) {
  const enemyRCP = Math.floor(Math.random()*3)
  const EF = document.querySelector('.enemyField')
  const RF = document.querySelector('.result')
  const coin = parseInt(span[0].innerHTML)
  switch(enemyRCP) {
    case 0:
      EF.innerHTML = '가위'
      break
    case 1:
      EF.innerHTML = '바위'
      break
    case 2:
      EF.innerHTML = '보'
      break
  }
  if( e.target.value === EF.innerHTML ) {
    RF.innerHTML = "비겼습니다!"
  } else {
    if ( e.target.value === "가위" ) {
      if ( EF.innerHTML === "바위" ) {
        RF.innerHTML = "졌습니다!"
      } else {
        RF.innerHTML = "이겼습니다!"
        span[0].innerHTML = coin + 2
        localStorage.coin = span[0].innerHTML
      }
    } else if ( e.target.value === "바위" ) {
      if ( EF.innerHTML === "가위" ) {
        RF.innerHTML = "이겼습니다!"
        span[0].innerHTML = coin + 2
        localStorage.coin = span[0].innerHTML
      } else {
        RF.innerHTML = "졌습니다!"
      }
    } else if ( e.target.value === "보" ) {
      if ( EF.innerHTML === "가위" ) {
        RF.innerHTML = "졌습니다!"
      } else {
        RF.innerHTML = "이겼습니다!"
        span[0].innerHTML = coin + 2
        localStorage.coin = span[0].innerHTML
      }
    }
  }
}
input[0].addEventListener('click', RCP)
input[1].addEventListener('click', RCP)
input[2].addEventListener('click', RCP)

// localStorage에 도감 property 추가
if ( !localStorage.illustBook ) {
  localStorage.setItem('illustBook', '')
} else {
  const localCatData = JSON.parse(localStorage.illustBook)
  localCatData.map((catData) => {
    const cat = document.createElement('div')
    cat.className = 'catCard'
    document.querySelector('.cardArea').appendChild(cat)
    const cardImg = document.createElement('div')
    cardImg.className = 'catCardImg'
    cat.appendChild(cardImg)
    const removeBtn = document.createElement('button')
    removeBtn.className = 'removeBtn'
    removeBtn.innerHTML = "삭제하기"
    cat.appendChild(removeBtn)
    cardImg.style.backgroundImage = `url("${catData.img}")`
  })
}

// 도감 열기, 닫기
btn[1].addEventListener('click', function () {
  modal2.style.display = 'block'
})
xBtn.addEventListener('click', function () {
  modal2.style.display = 'none'
})

// 도감 추가
const catInf = {level: '', attack: '', pretty: '', img: ''}
btn[3].addEventListener('click', function () {
  if ( window.confirm("지금 뽑은 고양이를 도감에 추가하시겠읍니까?") ) {
    if ( catImgUrl === '' ) {
      window.alert("추가할 수 있는 고양이가 없읍니다!")
    } else {
      catInf.level = span[1].innerHTML
      catInf.attack = span[2].innerHTML
      catInf.pretty = span[3].innerHTML
      catInf.img = catImgUrl
      if ( localStorage.illustBook === '' ) {
        localStorage.illustBook = JSON.stringify([catInf])
      } else {
        const localCatData = JSON.parse(localStorage.illustBook)
        localCatData.push(catInf)
        localStorage.illustBook = JSON.stringify(localCatData)
      }
    }
  }
})