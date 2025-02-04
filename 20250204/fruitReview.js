const changeType = (type) => {
  let box = document.querySelector(".box");
  box.innerHTML = `<img src="./image/fruit${type}.png" alt="과일이미지${type}" />`;
};
