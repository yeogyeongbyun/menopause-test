const app = document.getElementById('app');
const backBtn = document.getElementById('backBtn');
const screen= document.getElementById('screen'); //새로 넣음음

const questions = [
    { id: 1, img: 'q1.png', text: 'Q1. 쉽게 화가 나고 짜증이 많아졌습니다.' },
    { id: 2, img: 'q2.png', text: 'Q2. 피부가 자주 건조하고 가렵습니다.' },
    { id: 3, img: 'q3.png', text: 'Q3. 기운이 없고 몸이 축 처집니다.' },
    { id: 4, img: 'q4.png', text: 'Q4. 피부에 땀이 많이 납니다.' },
    { id: 5, img: 'q5.png', text: 'Q5. 사소한 일에도 불안하고 긴장됩니다.' },
    { id: 6, img: 'q6.png', text: 'Q6. 더위와 추위를 동시에 느끼곤 합니다.' },
    { id: 7, img: 'q7.png', text: 'Q7. 말수가 적고 예민해졌습니다.' },
    { id: 8, img: 'q8.png', text: 'Q8. 몸이 뜨겁고 입이 마르는 편입니다.' },
    { id: 9, img: 'q9.png', text: 'Q9. 땀도 나면서 몸속에서 열이 나는 느낌이 듭니다.' },
    { id: 10, img: 'q10.png', text: 'Q10. 가슴이 두근거리고 불안함을 자주 느낍니다.' },
    { id: 11, img: 'q11.png', text: 'Q11. 자주 피곤하고 의욕이 없습니다.' },
    { id: 12, img: 'q12.png', text: 'Q12. 손이나 발에 땀이 많습니다.' },
    { id: 13, img: 'q13.png', text: 'Q13. 열이 자주 나는 느낌이 있습니다.' },
    { id: 14, img: 'q14.png', text: 'Q14. 화를 참기 어렵고 짜증이 납니다.' },
    { id: 15, img: 'q15.png', text: 'Q15. 더웠다가 추웠다가 몸 상태가 오락가락합니다.' },
    { id: 16, img: 'q16.png', text: 'Q16. 의욕이 없고 몸이 무기력합니다.' },
    { id: 17, img: 'q17.png', text: 'Q17. 땀이 많고 몸이 자주 젖는 편입니다.' },
    { id: 18, img: 'q18.png', text: 'Q18. 긴장하거나 초조한 마음이 자주 듭니다.' },
    { id: 19, img: 'q19.png', text: 'Q19. 몸에 열이 자주 오릅니다.' },
    { id: 20, img: 'q20.png', text: 'Q20. 별일이 아닌데도 불안한 감정이 생깁니다.' },
    { id: 21, img: 'q21.png', text: 'Q21. 아무것도 하기 싫고 무기력한 느낌이 듭니다.' },
    { id: 22, img: 'q22.png', text: 'Q22. 몸에 열이 있고 땀이 나기도 합니다.' },
    { id: 23, img: 'q23.png', text: 'Q23. 자주 예민해지고 짜증이 납니다.' },
    { id: 24, img: 'q24.png', text: 'Q24. 더운 날씨에도 땀이 많습니다.' }
];

let current = 0;
const answers = {};

// 뒤로가기 버튼 클릭 이벤트
backBtn.onclick = () => {
    if (current > 0) {
        renderQuestion(current - 1);
    } else {
        renderStart();
    }
};

let isTransitioning=false;

//화면 전환 애니메이션 함수 (fade-out > 내용 교체 > fade-in)
function smoothRender(newHtml, callback) {
  if (isTransitioning) return;
  isTransitioning = true;

  const temp= document.createElement('div');
  temp.innerHTML= newHtml;
  const newContent= temp.firstElementChild;

  const oldContent= screen.firstElementChild;

  screen.classList.remove('fade-in');
  screen.classList.add('fade-out');

  setTimeout(() => {
    if (oldContent) screen.removeChild(oldContent);
    screen.appendChild(newContent);

    screen.classList.remove('fade-out');
    screen.classList.add('fade-in');

    isTransitioning= false;
    if (callback) callback();
  }, 200);
}


// 시작 화면 렌더링
function renderStart() {
    current = 0;
    backBtn.style.display = 'none';  // 시작 화면에선 뒤로가기 버튼 숨김

    smoothRender(`
      <div class="start-screen">
        <img src="assets/첫화면.png" alt="시작화면" />
        <button id="startBtn" class="start-transparent-btn" aria-label="시작하기"></button>
      </div>`, () => {
        document.getElementById('startBtn').onclick= () => renderQuestion(0);
      })
}

// 질문 화면 렌더링
function renderQuestion(idx) {
    current = idx;
    backBtn.style.display = 'block';  // 질문 화면에선 뒤로가기 버튼 보임

    const q = questions[idx];
    const pct = ((idx + 1) / questions.length) * 100;


    const options = [
        { label: '그렇다', score: 4 },
        { label: '조금 그렇다', score: 3 },
        { label: '보통이다', score: 2 },
        { label: '조금 그렇지 않다', score: 1 },
        { label: '그렇지 않다', score: 0 }
    ];

    const questionHtml= `
      <div class="question-screen">
        <div class="progress-bar">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <img src="assets/${q.img}" alt="질문 이미지" />
        <div class="transparent-overlay">
          ${options.map(opt => `
            <button class="transparent-btn" data-score="${opt.score}" aria-label="${opt.label}">${opt.label}</button>
          `).join('')}
        </div>
      </div>
    `;

    smoothRender(questionHtml, () => {
      document.querySelectorAll('.transparent-btn').forEach(btn => {
        btn.onclick= e => {
          //수정정
          document.querySelectorAll('.transparent-btn').forEach(b => b.classList.remove('selected'));
          e.currentTarget.classList.add('selected');
          
          answers[q.id] = +e.currentTarget.dataset.score;
          setTimeout(() => {
            if (current + 1< questions.length) {
              renderQuestion(current +1);
            } else {
              renderResult();
            }
          }, 200);
        }
      })
    })    
}

// 결과 화면 렌더링
function renderResult() {
    backBtn.style.display = 'none';  // 결과 화면에선 뒤로가기 버튼 숨김

    const { bodyType, emotionType } = calculateResult();
    const resultKey = `${bodyType}-${emotionType}`;

    app.innerHTML = `
      <div class="result-screen">
        <img src="assets/${resultKey}.png" alt="${resultKey} 결과 이미지" class="result-image" onerror="this.style.display='none';" />
        <button class="share-overlay-btn" aria-label="공유하기"></button>
      </div>
    `;

    //fade 
    fadeIn(app.querySelector('.result-screen'));
}

function calculateResult() {
    const body = { 발열: 0, 발한: 0, 혼열: 0 };
    const emotion = { 분노: 0, 무기력: 0, 불안: 0 };

    // 신체 유형 점수 합산
    [2, 8, 13, 19].forEach(i => body.발열 += answers[i] || 0);
    [4, 12, 17, 24].forEach(i => body.발한 += answers[i] || 0);
    [6, 9, 15, 22].forEach(i => body.혼열 += answers[i] || 0);

    // 감정 유형 점수 합산
    [1, 7, 14, 23].forEach(i => emotion.분노 += answers[i] || 0);
    [3, 11, 16, 21].forEach(i => emotion.무기력 += answers[i] || 0);
    [5, 10, 18, 20].forEach(i => emotion.불안 += answers[i] || 0);

    // 가장 높은 항목 추출 (동점이면 랜덤)
    const pickMax = obj => {
        const max = Math.max(...Object.values(obj));
        const candidates = Object.keys(obj).filter(k => obj[k] === max);
        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    return {
        bodyType: pickMax(body),       // 예: '발열'
        emotionType: pickMax(emotion)  // 예: '분노'
    };
}

renderStart();
