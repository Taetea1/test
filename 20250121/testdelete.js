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
    <tr class="remo">
      <td>${x.name}</td>
      <td>${x.age}</td>
      <td>${x.car}</td>
      <td>${x.nick}</td>
      <td><button onclick=changeData(${x.id})>수정</button><button class="removebtn" onclick=removeData(${x.id})>삭제</button></td>
    </tr>
  `;
    });
    return data;
  }
};

const userInfo = getUserInfo();

//나이 수 제한
const numberMaxLength = (e) => {
  if (agee.value >= 150 || agee.value <= 0) {
    agee_value.textContent = "제대로 된 나이를 입력해주세요.";
    isage = true;
  } else {
    agee_value.textContent = "";
    isage = false;
  }
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }

  checkBin(agee, 2);
};
// 사용자가 입력한 정보 확인
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
  if (isnick === true) {
    nick_value.textContent = "이미 존재하는 별명입니다.";
  } else {
    nick_value.textContent = "";
  }
};
const check = () => {
  let c = isbincheck.filter((x, i) => x === 1);
  if (c.length === 5) {
    btn.disabled = false;
  } else {
    btn.disabled = true; //비활성화
  }
};
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
    <tr class="remo">
      <td>${data[data.length - 1].name}</td>
      <td>${data[data.length - 1].age}</td>
      <td>${data[data.length - 1].car}</td>
      <td>${data[data.length - 1].nick}</td>
      <td><button onclick="changeData(${
        data[data.length - 1].id
      })">수정</button><button class="removebtn" onclick=removeData(${
      data[data.length - 1].id
    })>삭제</button></td>
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
//수정
const changeData = (id) => {
  btn;
};
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
    <tr class="remo">
      <td>${x.name}</td>
      <td>${x.age}</td>
      <td>${x.car}</td>
      <td>${x.nick}</td>
      <td><button>수정</button><button class="removebtn" onclick=removeData(${x.id})>삭제</button></td>
    </tr>
  `;
  });
  window.location.reload();
};
