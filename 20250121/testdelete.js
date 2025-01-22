// window.localStorage.clear();
let isid = false;
let isnick = false;
let isage = false;
let isname = false;
let iscar = false;
let isbincheck = [0, 0, 0, 0, 0];

const idd = document.querySelector(".idd");
const idd_value = document.querySelector(".idd_value");
const namee = document.querySelector(".namee");
const namee_value = document.querySelector(".namee_value");
const agee = document.querySelector(".agee");
const agee_value = document.querySelector(".agee_value");
const car = document.querySelector(".car");
const car_value = document.querySelector(".car_value");
const nick = document.querySelector(".nick");
const nick_value = document.querySelector(".nick_value");

const btn = document.querySelector(".btn");

const datas = document.querySelector(".main-wrap");
const input = document.querySelector(".input-wrap");

datas.innerHTML = `
    <table>
    <thead>
      <tr>
        <td>이름</td>
        <td>나이</td>
        <td>커리어</td>
        <td>별명</td>
        <td>관리</td>
      </tr>
    </thead>
    <tbody class="tablebody">
    </tbody>
    </table>`;
const tbodys = document.querySelector(".tablebody");
let data = [];
//사용자 정보 가져오기
const getUserInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo"));

  if (userList === null) {
    return [];
  } else {
    // 배열을 빼고 넣어주기
    data.push(...userList);
    data.map((x, i) => {
      tbodys.innerHTML += `
    <tr>
      <td>${x.name}</td>
      <td>${x.age}</td>
      <td class="test${x.id}">${x.car}</td>
      <td>${x.nick}</td>
      <td><div class="flexbtn">
      <button id="${x.id}" class="changebtn" onclick=changeData(${x.id})>수정</button><button class="changebtn" onclick=removeData(${x.id})>삭제</button>
      </div></td>
    </tr>
  `;
    });
    return data;
  }
};

const userInfo = getUserInfo();

// 사용자가 입력한 정보 확인

const numberMaxLength = (e) => {
  //나이 수 제한
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }

  if (agee.value >= 150 || agee.value < 0) {
    agee_value.textContent = "제대로 된 나이를 입력해주세요.";
    isage = true;
  } else {
    agee_value.textContent = "";
    isage = false;
  }

  checkBin(agee, 2);
};
const checkId = () => {
  checkBin(idd, 0);
  let countid = data.filter((word) => word.id === idd.value);

  if (countid.length !== 0) {
    isid = true;
  } else {
    isid = false;
  }
  if (isid === true) {
    idd_value.textContent = "이미 존재하는 아이디입니다.";
  } else {
    idd_value.textContent = "";
  }
};
const checkName = () => {
  checkBin(namee, 1);
};
const checkCar = () => {
  checkBin(car, 3);
  if (car.value.length < 15 && car.value.length > 0) {
    car_value.textContent = "경력은 15자리 이상 작성해주세요.";
    iscar = true;
  } else if (car.value.length === 0) {
    car_value.textContent = "";
    iscar = true;
  } else if (car.value.length >= 15) {
    car_value.textContent = "";
    iscar = false;
  }
};
const checkNick = () => {
  checkBin(nick, 4);

  let countnick = data.filter((word) => word.nick === nick.value);

  if (countnick.length !== 0) {
    isnick = true;
  } else {
    isnick = false;
  }

  if (nick.value.length === 1) {
    console.log("dd", nick.value.length);
    nick_value.textContent = "별명은 2자리 이상 적어주세요.";
    isnick = true;
  } else if (isnick === true) {
    nick_value.textContent = "이미 존재하는 별명입니다.";
  } else {
    nick_value.textContent = "";
  }
};
// 버튼 비활성화
const check = () => {
  let c = isbincheck.filter((x, i) => x === 1);
  if (c.length === 5) {
    btn.disabled = false;
  } else {
    btn.disabled = true; //비활성화
  }
};
// 빈값인지 확인
const checkBin = (type, index) => {
  if (type.value.trim().length !== 0) {
    isbincheck[index] = 1;
  } else {
    isbincheck[index] = 0;
  }
  check();
};

btn.addEventListener("click", () => {
  if (
    isid === false &&
    isnick === false &&
    isage === false &&
    iscar === false &&
    isname === false
  ) {
    // 데이터 넣기
    let userInfo1 = {
      id: idd.value,
      name: namee.value,
      age: agee.value,
      car: car.value,
      nick: nick.value,
    };
    data.push(userInfo1);

    localStorage.setItem("userInfo", JSON.stringify(data));

    tbodys.innerHTML += `
    <tr>
      <td>${data[data.length - 1].name}</td>
      <td>${data[data.length - 1].age}</td>
      <td class="test${data[data.length - 1].id}">${
      data[data.length - 1].car
    }</td>
      <td>${data[data.length - 1].nick}</td>
      <td><div class="flexbtn">
      <button id="${
        data[data.length - 1].id
      }" class="changebtn" onclick=changeData(${
      data[data.length - 1].id
    })>수정</button><button class="changebtn" onclick=removeData(${
      data[data.length - 1].id
    })>삭제</button>
    </div></td>
    </tr>`;
    // 초기화
    idd.value = "";
    namee.value = "";
    agee.value = "";
    car.value = "";
    nick.value = "";
    isbincheck.fill(0);
    btn.disabled = true;
  }
});

// 삭제
const removeData = (id) => {
  // item.id는 문자
  const leftData = data.filter((item) => item.id !== String(id));
  localStorage.setItem("userInfo", JSON.stringify(leftData));

  let userLists = JSON.parse(localStorage.getItem("userInfo"));
  data = [];

  data.push(...userLists);

  tbodys.innerHTML = "";

  data.map((x, i) => {
    tbodys.innerHTML += `
    <tr>
      <td>${x.name}</td>
      <td>${x.age}</td>
      <td class="test${x.id}">${x.car}</td>
      <td>${x.nick}</td>
      <td><div class="flexbtn"><button id="${x.id}" class="changebtn" onclick=changeData(${x.id})>수정</button><button class="changebtn" onclick=removeData(${x.id})>삭제</button></div></td>
    </tr>
  `;
  });
  window.location.reload();
};
//수정
let c;
let btnsss;
let ischangecar = false;
const changeData = (id) => {
  const inputtest = document.querySelector(`.test${id}`);
  btnsss = document.getElementById(`${id}`);
  if (btnsss.innerText === "수정") {
    btnsss.innerText = "수정완료";
    inputtest.innerHTML = `<input class="c" value=${inputtest.innerText} oninput="checkChangeCar()" />
    <div class="changecar"></div>`;
    c = document.querySelector(".c");
  } else if (btnsss.innerText === "수정완료" && ischangecar === false) {
    btnsss.innerText = "수정";

    //직접변경
    let changecar = JSON.parse(localStorage.getItem("userInfo"));

    // 객체의 인덱스 찾기
    let index = changecar.findIndex((obj) => obj.id === `${id}`);
    changecar[index].car = c.value;
    localStorage.setItem(`userInfo`, JSON.stringify(changecar));

    inputtest.innerHTML = `<td class="test${id}">${data[index].car}</td>`;
    window.location.reload();
  }
};
const checkChangeCar = () => {
  const carEle = document.querySelector(".changecar");
  if (c.value.length < 15 && c.value.length > 0) {
    carEle.textContent = "경력은 15자리 이상 작성해주세요.";
    ischangecar = true;
    btnsss.disabled = true; //비활성화
  } else if (c.value.length === 0) {
    carEle.textContent = "";
    ischangecar = true;
    btnsss.disabled = true; //비활성화
  } else if (c.value.length >= 15) {
    carEle.textContent = "";
    ischangecar = false;
    btnsss.disabled = false;
  }
};
