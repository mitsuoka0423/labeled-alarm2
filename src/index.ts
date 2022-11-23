import VanillaSwipe from "vanilla-swipe";

const VS = new VanillaSwipe({
  element: document.getElementById("touch-area"),
  onSwiped: handler,
  mouseTrackingEnabled: true,
});
VS.init();

const label = document.getElementById("timer-label") as HTMLInputElement;
const time = document.getElementById("timer-time") as HTMLInputElement;
const result = document.getElementById("result") as HTMLElement;

function setLabelWithAutoReset({
  element,
  text,
  time = 5000,
}: {
  element: HTMLElement;
  text: string;
  time?: number;
}) {
  element.innerText = text;
  setTimeout(() => {
    element.innerText = "";
  }, time);
}

function handler() {
  console.log(arguments[1].directionY);
  if (arguments[1].directionY !== "TOP") {
    return;
  }

  console.log("swiped up");
  console.log({ label: label.value, time: time.value });

  if (!label.value || !time.value) {
    setLabelWithAutoReset({
      element: result,
      text: "時間とラベルを両方入力してください。",
    });
    return;
  }

  localStorage.setItem("test", JSON.stringify({ label, time }));
  setLabelWithAutoReset({
    element: result,
    text: `${time.value}にアラームを設定しました。`,
  });
  label.value = "";
  time.value = "";
}
