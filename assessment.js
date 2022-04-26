'use strict'
const userNameInput = document.getElementById('user-name')
const assessmentButton = document.getElementById('assessment')
const resultDivided = document.getElementById('result-area')
const tweetDivided = document.getElementById('tweet-area')
assessmentButton.onclick = () => { //assessmentButtonというオブジェクトにおいて、クリックしたときに関数が実行されるｓ
    const userName = userNameInput.value
    if (userName.length === 0){ //文字列無し
        // 名前が空のとは処理を終了
        return; //戻り値なし
    }
    // TODO　診断結果表示エリアの作成
    resultDivided.innerText = ""
    const header = document.createElement('h3')
    header.innerText = 'Result'
    resultDivided.appendChild(header)

    const paragraph = document.createElement('p')
    const result = assessment(userName)
    paragraph.innerText = result
    resultDivided.appendChild(paragraph)
    // TODO ツイートエリアの作成
    tweetDivided.innerText = ""
    const anchor = document.createElement('a') //aタグ＝アンカー
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=MyHogwartsHouse&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue)
    anchor.className = 'twitter-hashtag-button'
    anchor.setAttribute('data-text', result)
    anchor.innerText = 'Tweet #MyHogwartsHouse'

    tweetDivided.appendChild(anchor)

    const script = document.createElement('script')
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    tweetDivided.appendChild(script)
}
const answers = [
    '{userName} is a Griffindor! ',
    '{userName} is a Hufflepuff! ',
    '{userName} is a Ravenclaw! ',
    '{userName} is a Slytherin! ',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を習得してそれを足し合わせる
    let sumOfCharCode = 0
    for (let i = 0; i < userName.length; i++) { //userName.length は文字列の長さを表す
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数字を求める
    const index = sumOfCharCode % answers.length
    let result = answers[index]

    result = result.replaceAll('{userName}', userName)
    return result;
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        assessmentButton.onclick()
    }
}
console.log(assessment('Harry Potter'))
console.log(assessment('Hermione Granger'))
console.log(assessment('Ronald Weasely'))