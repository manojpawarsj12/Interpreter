const fs = require("fs");
const code = fs.readFileSync("ip1.txt", "utf8").toString() + "\0";
let pc = 0;
const print = console.log;
const Look = () => {
  if (code[pc] === "#") {
    while (code[pc] !== "\n" && code[pc] !== "\0") {
      pc++;
    }
  }
  return code[pc];
};
const Take = () => {
  const c = Look();
  pc++;
  return c;
};
const TakeString = (word) => {
  let copypc = pc;
  for (let c of word) {
    print(c);
    if (Take() !== c) {
      pc = copypc;
      return false;
    }
  }

  return true;
};

const Next = () => {
  while (
    Look() === " " ||
    Look() === "\t" ||
    Look() === "\n" ||
    Look() === "\r"
  ) {
    Take();
  }
  return Look();
};
const TakeNext = (c) => {
  if (Next() === c) {
    Take();
    return true;
  }
  return false;
};
const IsDigit = (c) => {
  return c >= "0" && c <= "9";
};

const IsAlpha = (c) => {
  return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
};
const IsAlNum = (c) => {
  return IsDigit(c) || IsAlpha(c);
};
const IsAddOp = (c) => {
  return c == "+" || c == "-";
};
const IsMulOp = (c) => {
  return c == "*" || c == "/";
};
const TakeNextAlNum = () => {
  let alnum = "";
  if (IsAlpha(Next())) {
    while (IsAlNum(Look())) {
      alnum += Take();
    }
  }

  return alnum;
};

const DoPrint = () => {
  print("print");
};
const Statement = () => {
  if (TakeString("print")) {
    DoPrint();
  } else {
    Error("Invalid statement");
  }
};
const Block = () => {
  if (TakeString("{")) {
    while (!TakeString("}")) {
      Block();
    }
  } else {
    Statement();
  }
};

const Program = () => {
  while (Next() !== "\0") {
    Block();
  }
};

print(pc);
Program();
