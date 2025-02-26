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
    <tr id=id${x.id}>
      <td class="test3${x.id}">${x.name}</td>
      <td class="test2${x.id}">${x.age}</td>
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
    btn.disabled = true; //비활성화
    isage = true;
  } else {
    agee_value.textContent = "";
    isage = false;
    btn.disabled = false;
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
    btn.disabled = true; //비활성화
  } else if (isnick === true) {
    nick_value.textContent = "이미 존재하는 별명입니다.";
    btn.disabled = true; //비활성화
  } else {
    nick_value.textContent = "";
    btn.disabled = false;
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
    <tr id=id${data[data.length - 1].id}>
      <td class="test3${data[data.length - 1].id}">${
      data[data.length - 1].name
    }</td>
      <td class="test2${data[data.length - 1].id}">${
      data[data.length - 1].age
    }</td>
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
}); //수정버튼

//수정
let ischangecar = false;
let ischangeage = false;
let ischangename = false;
const changeData = (id) => {
  const inputtest3 = document.querySelector(`.test3${id}`);
  const inputtest2 = document.querySelector(`.test2${id}`);
  const inputtest = document.querySelector(`.test${id}`);
  let btnsss = document.getElementById(`${id}`);
  if (btnsss.innerText === "수정") {
    console.log(btnsss);
    btnsss.innerText = "수정완료";
    inputtest3.innerHTML = `
    <input class="c c3${id}" oninput=checkChangename(${id}) value="${inputtest3.innerText}" />`;
    inputtest2.innerHTML = `
    <input type=number maxlength=3 oninput=numberMaxLength2(this) onkeyup=changeAGE(${id}) class="c c2${id}" value="${inputtest2.innerText}" />
    <div class="changecar changecar2${id}"></div>`;
    inputtest.innerHTML = `
    <input class="c c${id}" oninput=checkChangeCar(${id}) value="${inputtest.innerText}"/>
    <div class="changecar changecar${id}"></div>`;
  } else if (
    btnsss.innerText === "수정완료" &&
    ischangecar === false &&
    ischangeage === false &&
    ischangename === false
  ) {
    console.log(btnsss);
    btnsss.innerText = "수정";

    //직접변경
    let changecar = JSON.parse(localStorage.getItem("userInfo"));

    // 나중에 만들어줘야 각각을 알 수 있음
    let c3 = document.querySelector(`.c3${id}`);
    let c2 = document.querySelector(`.c2${id}`);
    let c = document.querySelector(`.c${id}`);
    // 객체의 인덱스 찾기
    let index = changecar.findIndex((obj) => obj.id === `${id}`);
    changecar[index].name = c3.value;
    changecar[index].age = c2.value;
    changecar[index].car = c.value;
    localStorage.setItem(`userInfo`, JSON.stringify(changecar));

    // 바뀐값 전역변수에 넣어주기
    let userL = JSON.parse(localStorage.getItem("userInfo"));
    data = [];
    data.push(...userL);

    inputtest3.innerHTML = `<td class="test3${id}">${c3.value}</td>`;
    inputtest2.innerHTML = `<td class="test2${id}">${c2.value}</td>`;
    inputtest.innerHTML = `<td class="test${id}">${c.value}</td>`;
  }
};

const changedisable = (id) => {
  let bbb = document.getElementById(`${id}`);
  if (
    ischangeage === false &&
    ischangecar === false &&
    ischangename === false
  ) {
    bbb.disabled = false;
  } else {
    bbb.disabled = true;
  }
};

// 수정할때 검사할 함수들
const checkChangename = (id) => {
  let nameinput = document.querySelector(`.c3${id}`);
  let b3 = document.getElementById(`${id}`);
  console.log("nameinput", nameinput.value);

  if (nameinput.value.length <= 0) {
    ischangename = true;
    b3.disabled = true; //비활성화
  } else {
    ischangename = false;
  }

  changedisable(id);
};

const numberMaxLength2 = (e) => {
  //나이 수 제한
  if (e.value.length > e.maxLength) {
    e.value = e.value.slice(0, e.maxLength);
  }
};
const changeAGE = (id) => {
  const ageEle = document.querySelector(`.changecar2${id}`);
  let b2 = document.getElementById(`${id}`);
  let ageinput = document.querySelector(`.c2${id}`);
  console.log("ageinput", ageinput.value);
  if (ageinput.value >= 150 || ageinput.value < 0) {
    ageEle.textContent = "제대로 된 나이를 입력해주세요.";
    ischangeage = true;
    b2.disabled = true; //비활성화
  } else {
    ageEle.textContent = "";
    ischangeage = false;
  }
  if (ageinput.value.length <= 0 && ageinput.value.length >= 3) {
    ageEle.textContent = "";
    ischangeage = true;
    b2.disabled = true; //비활성화
  }
  changedisable(id);
};

const checkChangeCar = (id) => {
  let b1 = document.getElementById(`${id}`);
  let carinput = document.querySelector(`.c${id}`);
  const carEle = document.querySelector(`.changecar${id}`);
  console.log("carinput", carinput.value);
  if (carinput.value.length < 15 && carinput.value.length > 0) {
    carEle.textContent = "경력은 15자리 이상 작성해주세요.";
    ischangecar = true;
    b1.disabled = true; //비활성화
  } else if (carinput.value.length === 0) {
    carEle.textContent = "";
    ischangecar = true;
    b1.disabled = true; //비활성화
  } else if (carinput.value.length >= 15) {
    carEle.textContent = "";
    ischangecar = false;
  }
  changedisable(id);
};

// 삭제
const removeData = (id) => {
  // 데이터덮어씌우기
  let removebtn = document.getElementById(`${id}`);
  let leftData = data.filter((item) => item.id !== String(id));
  localStorage.setItem("userInfo", JSON.stringify(leftData));
  let userLists = JSON.parse(localStorage.getItem("userInfo"));
  data = [];
  data.push(...userLists);
  console.log(removebtn);
  if (!removebtn) {
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
  } else {
    let tr = document.querySelector(`.tablebody > tr[id=id${id}]`);
    tr.remove();
  }
};
