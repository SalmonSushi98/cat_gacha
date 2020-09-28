const img = document.querySelector('.catImg')
const btn = document.querySelectorAll('button')
const span = document.querySelectorAll('span')
const modal = document.querySelector('#modal')
const modal2 = document.querySelector('#modal2')
const xBtn = document.querySelector('.modal2__top i')
const input = document.querySelectorAll('input')
let catImgUrl = ''
let isNew = true

// 등급 색깔
const coloring = (level) => {
  switch(level) {
    case "노멀" :
      return 'gray'
    case "레어" :
      return 'skyblue'
    case "에픽" :
      return 'purple'
    case "유니크" :
      return 'yellow'
    case "레전드리" :
      return 'lime'
    case "고양이신" :
      return 'red'
    case "먐먀" :
      return 'pink'
  }
}


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
      isNew = true
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
  localStorage.setItem('illustBook', "[]")
} else {
  const localCatData = JSON.parse(localStorage.illustBook)
  localCatData.map(( catData ) => {
    const cardArea = document.querySelector('.cardArea')
    const cat = document.createElement('div')
    cat.className = 'catCard'
    cat.level = catData.level
    cat.attack = catData.attack
    cat.pretty = catData.pretty
    cardArea.appendChild(cat)
    const cardImg = document.createElement('div')
    cardImg.className = 'catCardImg'
    cardImg.style.backgroundImage = `url("${catData.img}")`
    cardImg.addEventListener('click', () => {
      console.log(cat.level, cat.attack, cat.pretty)
      modal2.style.display = 'none'
      img.style.backgroundImage = `url("${catData.img}")`
      span[1].innerHTML = cat.level
      span[1].style.color = coloring(cat.level)
      span[2].innerHTML = cat.attack
      span[3].innerHTML = cat.pretty
      catImgUrl = catData.img
      isNew = false
    })
    cat.appendChild(cardImg)
    const detailBox = document.createElement('div')
    detailBox.className = 'detailBox'
    cat.appendChild(detailBox)
    const detail__level = document.createElement('span')
    detail__level.innerHTML = cat.level
    detail__level.style.color = coloring(cat.level)
    const detail__other = document.createElement('span')
    detail__other.innerHTML = ` / ${cat.attack} / ${cat.pretty}`
    detailBox.appendChild(detail__level)
    detailBox.appendChild(detail__other)
    const removeBtn = document.createElement('button')
    removeBtn.className = 'removeBtn'
    removeBtn.innerHTML = "삭제하기"
    cat.appendChild(removeBtn)
    const divCatImgUrl = cardImg.style.backgroundImage.substr(5).replace('")', '')
    removeBtn.addEventListener('click', () => {
      localCatData.forEach(( catData, index ) => {
        if ( catData.img === divCatImgUrl && catData.level === cat.level && catData.attack === cat.attack && catData.pretty === cat.pretty ) {
          localCatData.splice(index, 1)
          localStorage.illustBook = JSON.stringify(localCatData)
          cardArea.removeChild(cardArea.children[index])
        }
      })
    })
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
    if ( catImgUrl === '' || span[1].innerHTML === '' || span[2].innerHTML === '' || span[3].innerHTML === '' ) {
      window.alert("추가할 수 있는 고양이가 없읍니다!")
    } else if ( !isNew ) {
      window.alert("이 고양이는 이미 도감에 있읍니다!")
    } else {
      catInf.level = span[1].innerHTML
      catInf.attack = span[2].innerHTML
      catInf.pretty = span[3].innerHTML
      catInf.img = catImgUrl
      const localCatData = JSON.parse(localStorage.illustBook)
      localCatData.push(catInf)
      localStorage.illustBook = JSON.stringify(localCatData)
      const cardArea = document.querySelector('.cardArea')
      const cat = document.createElement('div')
      cat.className = 'catCard'
      cat.level = catInf.level
      cat.attack = catInf.attack
      cat.pretty = catInf.pretty
      cardArea.appendChild(cat)
      const cardImg = document.createElement('div')
      cardImg.className = 'catCardImg'
      cardImg.style.backgroundImage = `url("${catImgUrl}")`
      cardImg.addEventListener('click', () => {
        console.log(cat.level, cat.attack, cat.pretty)
        modal2.style.display = 'none'
        img.style.backgroundImage = cardImg.style.backgroundImage
        span[1].innerHTML = cat.level
        span[1].style.color = coloring(cat.level)
        span[2].innerHTML = cat.attack
        span[3].innerHTML = cat.pretty
        catImgUrl = cardImg.style.backgroundImage.substr(5).replace('")', '')
        isNew = false
      })
      cat.appendChild(cardImg)
      const detailBox = document.createElement('div')
      detailBox.className = 'detailBox'
      cat.appendChild(detailBox)
      const detail__level = document.createElement('span')
      detail__level.innerHTML = cat.level
      detail__level.style.color = coloring(cat.level)
      const detail__other = document.createElement('span')
      detail__other.innerHTML = ` / ${cat.attack} / ${cat.pretty}`
      detailBox.appendChild(detail__level)
      detailBox.appendChild(detail__other)
      const removeBtn = document.createElement('button')
      removeBtn.className = 'removeBtn'
      removeBtn.innerHTML = "삭제하기"
      cat.appendChild(removeBtn)
      const divCatImgUrl = cardImg.style.backgroundImage.substr(5).replace('")', '')
      removeBtn.addEventListener('click', () => {
        const localCatData2 = JSON.parse(localStorage.illustBook)
        localCatData2.forEach(( catData, index ) => {
          if ( catData.img === divCatImgUrl ) {
            localCatData2.splice(index, 1)
            localStorage.illustBook = JSON.stringify(localCatData2)
            cardArea.removeChild(cardArea.children[index])
          }
        })
      })
    }
    isNew = false
  }
})