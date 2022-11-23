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
  target,
  text,
  time = 5000,
}: {
  target: HTMLElement;
  text: string;
  time?: number;
}) {
  target.innerText = text;
  setTimeout(() => {
    target.innerText = "";
  }, time);
}

function handler() {
  console.log(arguments[1].directionY);
  if (arguments[1].directionY !== "TOP") {
    setLabelWithAutoReset({
      target: result,
      text: "時間とラベルを入力して上にスワイプして保存します",
    });
    return;
  }

  console.log("swiped up");
  console.log({ label: label.value, time: time.value });

  if (!label.value || !time.value) {
    setLabelWithAutoReset({
      target: result,
      text: "時間とラベルを入力して上にスワイプして保存します",
    });
    return;
  }

  localStorage.setItem("test", JSON.stringify({ label, time }));
  setLabelWithAutoReset({
    target: result,
    text: `${time.value}に${label.value}をするアラームを設定しました`,
  });
  label.value = "";
  time.value = "";
}
