const questions = [
  {
    text: "애인이 내 사진을 SNS에 올리려고 하는 경우가 많았다.",
    program: "하트시그널",
  },
  //   {
  //     text: "나는 사람들의 관심이 부담스럽지 않고, 오히려 즐긴다.",
  //     program: "솔로 지옥",
  //     alternativeProgram: "나는 솔로",
  //   },
  //   {
  //     text: "나는 모르는 사람에게 인스타그램으로 DM을 자주 받는다.",
  //     program: "솔로 지옥",
  //     alternativeProgram: "나는 솔로",
  //   },
  //   {
  //     text: "먼저 나서지 않아도 다가와주는 사람들이 많은 편이다.",
  //     program: "하트시그널",
  //     alternativeProgram: "나는 솔로",
  //   },
  //   {
  //     text: "마음에 드는 사람이 생기면 어떻게 다가갈지 안다.",
  //     program: "솔로 지옥",
  //     alternativeProgram: "나는 솔로",
  //   },
  //   {
  //     text: "나는 내 직업을 사랑하고 열정적으로 임한다.",
  //     program: "하트시그널",
  //     multiplePrograms: ["하트시그널", "솔로 지옥", "나는 솔로"],
  //   },
  //   {
  //     text: "소개팅 제의가 자주 들어오는 편이다.",
  //     program: "하트시그널",
  //   },
  //   {
  //     text: "나는 나를 좋아하는 사람보다 내가 좋아하는 사람이 좋다.",
  //     program: "솔로 지옥",
  //     alternativeProgram: "하트시그널",
  //   },
  //   {
  //     text: "꾸준히 하는 운동이 있다.",
  //     program: "솔로 지옥",
  //     multiplePrograms: ["하트시그널", "솔로 지옥"],
  //     alternativeProgram: "나는 솔로",
  //   },
  //   {
  //     text: "굳이 애인이 있는 것을 SNS에 티내고 싶지 않다.",
  //     program: "솔로 지옥",
  //   },
  //   {
  //     text: "가는 사람 안잡고 오는 사람 안막는다.",
  //     program: "솔로 지옥",
  //   },
  //   {
  //     text: "나는 질투 혹은 집착이 있는 편이다.",
  //     program: "환승연애",
  //   },
  //   {
  //     text: "애인에게 자주 속상하고 서운한 감정을 느낀다.",
  //     program: "환승연애",
  //   },
  //   {
  //     text: "사람들 앞에서 나서게 되면 긴장되고 어색하다.",
  //     program: "나는 솔로",
  //     alternativeProgram: "솔로 지옥",
  //   },
  //   {
  //     text: "나는 굳이 타인에게 먼저 다가가지 않고, 오는 사람도 경계가 된다.",
  //     program: "나는 솔로",
  //   },
  //   {
  //     text: "낯선 사람과 이야기하는 것이 어색하지 않다.",
  //     program: "솔로 지옥",
  //     multiplePrograms: ["하트시그널", "솔로 지옥"],
  //   },
  //   {
  //     text: "보통 자연스러운 만남을 통해 인연을 가지는 편이다.",
  //     program: "하트시그널",
  //     multiplePrograms: ["하트시그널", "환승연애", "나는 솔로"],
  //   },
  //   {
  //     text: "헤어지고 나서 새로운 연애를 시작하기까지 텀이 짧은 편이다.",
  //     program: "솔로 지옥",
  //     alternativeProgram: "환승연애",
  //   },
  //   {
  //     text: "장기간 사귄 전 애인이 있다.",
  //     program: "환승연애",
  //   },
];

let scores = {
  하트시그널: 0,
  "솔로 지옥": 0,
  환승연애: 0,
  "나는 솔로": 0,
};

let currentQuestionIndex = 0;
window.onload = function () {
  const questionContainer = document.getElementById("question-container");
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  const progress = document.getElementById("progress");

  // 모든 질문을 한 번에 표시
  function showQuestions() {
    shuffledQuestions.forEach((currentQuestion, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");

      questionDiv.innerHTML = `
          <p>${index + 1}. ${currentQuestion.text}</p>
          <label>
              <input type="radio" name="question${index}" value="yes" required> 예
          </label>
          <label>
              <input type="radio" name="question${index}" value="no" required> 아니오
          </label>
        `;

      questionContainer.appendChild(questionDiv);
      questionDiv.classList.add("visible");
    });
  }

  showQuestions();

  document
    .getElementById("quizForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      scores = { 하트시그널: 0, "솔로 지옥": 0, 환승연애: 0, "나는 솔로": 0 };

      const formData = new FormData(this);
      formData.forEach((value, key) => {
        const questionIndex = parseInt(key.replace("question", ""));
        const currentQuestion = shuffledQuestions[questionIndex];

        if (value === "yes") {
          if (currentQuestion.multiplePrograms) {
            currentQuestion.multiplePrograms.forEach((program) => {
              scores[program]++;
            });
          } else {
            scores[currentQuestion.program]++;
          }
        } else if (value === "no") {
          if (currentQuestion.alternativeProgram) {
            scores[currentQuestion.alternativeProgram]++;
          }
        }
      });

      let maxScore = 0;
      let programStyle = "";

      for (let program in scores) {
        if (scores[program] > maxScore) {
          maxScore = scores[program];
          programStyle = program;
        }
      }

      const resultDiv = document.getElementById("result");
      const resultText = document.getElementById("result-text");
      const resultTip = document.getElementById("result-tip");

      resultText.textContent = `${programStyle} 스타일입니다!`;

      const tips = {
        하트시그널:
          "사람들과 자연스럽게 어울리며, 상대를 편안하게 하는 매력이 있고 누구나 호감을 가질만한 외모를 가진 당신은",
        "솔로 지옥":
          "독립적이고, 자유로운 연애를 지향하며 자신의 매력을 잘 알고 있고, 정복욕이 있는 매력적인 당신은",
        환승연애:
          "감정의 변화가 많고, 사랑하는 사람에게 사랑과 관심 받기를 원하는 순수한 로맨티스트인 당신은",
        "나는 솔로":
          "새로운 만남에 열려 있고 진솔하고 담백한 매력이 있는 당신은",
      };

      resultTip.textContent = tips[programStyle];

      resultDiv.classList.remove("hidden");
      resultDiv.scrollIntoView({ behavior: "smooth" });
    });

  document.getElementById("shareBtn").addEventListener("click", () => {
    const textToShare = document.getElementById("result-text").textContent;
    navigator
      .share({
        title: "연애 스타일 테스트 결과",
        text: textToShare,
      })
      .catch((err) => {
        console.log("공유 실패", err);
      });
  });
};
