// 질문 리스트와 각 질문에 해당하는 프로그램
const questions = [
  {
    text: "애인이 내 사진을 SNS에 올리려고 하는 경우가 많았다.",
    program: "하트시그널",
  },
  {
    text: "나는 사람들의 관심이 부담스럽지 않고, 오히려 즐긴다.",
    program: "솔로 지옥",
    alternativeProgram: "나는 솔로",
  },
  {
    text: "나는 모르는 사람에게 인스타그램으로 DM을 자주 받는다.",
    program: "솔로 지옥",
    alternativeProgram: "나는 솔로",
  },
  {
    text: "먼저 나서지 않아도 다가와주는 사람들이 많은 편이다.",
    program: "하트시그널",
    alternativeProgram: "나는 솔로",
  },
  {
    text: "마음에 드는 사람이 생기면 어떻게 다가갈지 안다.",
    program: "솔로 지옥",
    alternativeProgram: "나는 솔로",
  },
  {
    text: "나는 내 직업을 사랑하고 열정적으로 임한다.",
    program: "하트시그널",
    multiplePrograms: ["하트시그널", "솔로 지옥", "나는 솔로"],
  },
  {
    text: "소개팅 제의가 자주 들어오는 편이다.",
    program: "하트시그널",
  },
  {
    text: "나는 나를 좋아하는 사람보다 내가 좋아하는 사람이 좋다.",
    program: "솔로 지옥",
    alternativeProgram: "하트시그널",
  },
  {
    text: "꾸준히 하는 운동이 있다.",
    program: "솔로 지옥",
    multiplePrograms: ["하트시그널", "솔로 지옥"],
    alternativeProgram: "나는 솔로",
  },
  {
    text: "굳이 애인이 있는 것을 SNS에 티내고 싶지 않다.",
    program: "솔로 지옥",
  },
  {
    text: "가는 사람 안잡고 오는 사람 안막는다.",
    program: "솔로 지옥",
  },
  {
    text: "나는 질투 혹은 집착이 있는 편이다.",
    program: "환승연애",
  },
  {
    text: "애인에게 자주 속상하고 서운한 감정을 느낀다.",
    program: "환승연애",
  },
  {
    text: "사람들 앞에서 나서게 되면 긴장되고 어색하다.",
    program: "나는 솔로",
    alternativeProgram: "솔로 지옥",
  },
  {
    text: "나는 굳이 타인에게 먼저 다가가지 않고, 오는 사람도 경계가 된다.",
    program: "나는 솔로",
  },
  {
    text: "낯선 사람과 이야기하는 것이 어색하지 않다.",
    program: "솔로 지옥",
    multiplePrograms: ["하트시그널", "솔로 지옥"],
  },
  {
    text: "보통 자연스러운 만남을 통해 인연을 가지는 편이다.",
    program: "하트시그널",
    multiplePrograms: ["하트시그널", "환승연애", "나는 솔로"],
  },
  {
    text: "헤어지고 나서 새로운 연애를 시작하기까지 텀이 짧은 편이다.",
    program: "솔로 지옥",
    alternativeProgram: "환승 연애",
  },
];

let scores = {
  하트시그널: 0,
  "솔로 지옥": 0,
  환승연애: 0,
  "나는 솔로": 0,
};

window.onload = function () {
  const questionContainer = document.getElementById("question-container");

  // 질문을 랜덤하게 섞기
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

  shuffledQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    questionDiv.innerHTML = `
        <p>${index + 1}. ${question.text}</p>
        <label>
            <input type="radio" name="question${index}" value="yes" required> 예
        </label>
        <label>
            <input type="radio" name="question${index}" value="no" required> 아니오
        </label>
      `;

    questionContainer.appendChild(questionDiv);
  });

  document
    .getElementById("quizForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // 폼 제출 시 새로고침 방지
      scores = { 하트시그널: 0, "솔로 지옥": 0, 환승연애: 0, "나는 솔로": 0 }; // 점수 초기화

      const formData = new FormData(this);
      formData.forEach((value, key) => {
        const questionIndex = parseInt(key.replace("question", ""));
        const currentQuestion = shuffledQuestions[questionIndex];

        if (value === "yes") {
          // 예일 경우 기본 프로그램에 점수 추가
          if (currentQuestion.multiplePrograms) {
            currentQuestion.multiplePrograms.forEach((program) => {
              scores[program]++;
            });
          } else {
            scores[currentQuestion.program]++;
          }
        } else if (value === "no") {
          // 아니오일 경우 alternativeProgram에 점수 추가
          if (currentQuestion.alternativeProgram) {
            scores[currentQuestion.alternativeProgram]++;
          }
        }
      });

      // 점수가 가장 높은 프로그램 찾기
      let maxScore = 0;
      let programStyle = "";

      for (let program in scores) {
        if (scores[program] > maxScore) {
          maxScore = scores[program];
          programStyle = program;
        }
      }

      // 결과 보여주기
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = `당신은 ${programStyle} 스타일입니다!`;
      resultDiv.classList.remove("hidden");

      // 결과 부분으로 스크롤 이동
      resultDiv.scrollIntoView({ behavior: "smooth" });
    });
};
