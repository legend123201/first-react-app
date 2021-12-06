import { Block } from "@mui/icons-material";
import React, { useEffect, useState } from "react"; //đây là dòng import thư viện
import Square from "./Square";
import "./styles.css";

const Game = () => {
  let name = "Bảo";
  let a = [1, 2];

  //state là biến nội tại trong component, chỉ được sử dụng trong component mà tạo nó thôi
  //nên sử dụng biến const, vì nó giúp chương trình hiểu đc sẽ ko có sự thay đổi nào, tăng performance và bảo mật của app
  const [state, setState] = useState("cá vàng!");
  const [age, setAge] = useState(16);
  const [listSquare, setListSquare] = useState(Array(9).fill(0));
  const [classSquare, setClassSquare] = useState("square");
  const [squareArr, setSquareArr] = useState([]);
  const n = 3;

  useEffect(() => {
    console.log("hello");

    let initialSquareArr = [];
    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        initialSquareArr.push({
          toaDoX: x,
          toaDoY: y,
          value: null,
        });
      }
    }
    console.log(initialSquareArr);
    setSquareArr(initialSquareArr);
  }, []);

  const handleClick = () => {
    console.log("Clicked!");
    name = "Lưu";
    console.log(name);
    setState("Cá mập!");
    setAge(age + 1);
  };

  const handleClick2 = (a) => {
    alert(a);
  };

  const handleClickOnSquare = (index, value) => {
    let copyArr = [...listSquare]; //cách 2 là dùng slice, sợt trên mạng cách copy arr trong js
    copyArr[index] = 1;
    setListSquare(copyArr);

    // if (value === 1) {
    //   setClassSquare("square bg-red");
    // } else {
    //   setClassSquare("square");
    // }
  };

  const handleClickOnSquareNewest = (squareObject) => {
    console.log(squareObject);

    let copyArr = squareArr.map((value) => {
      if (
        value.toaDoX === squareObject.toaDoX &&
        value.toaDoY === squareObject.toaDoY
      ) {
        return { ...value, value: 1 };
      }
      return value;
    });
    setSquareArr(copyArr);
  };

  // const renderBoard = () => {
  //   let html = "";
  //   for (let x = 1; x <= n; i++) {
  //     for (let y = 1; y <= n; j++) {
  //       if (y === 1) {
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <h3>{name}</h3>
      <h3>{state}</h3>
      <h2>h3</h2>
      <h1>Độ tuổi của bạn là: {age}</h1>
      <button onClick={handleClick}> Click</button>

      <button
        onClick={() => {
          handleClick2("alert");
        }}
      >
        {" "}
        Click
      </button>

      {a.map((value, index) => (
        <span key={index}>{value}</span>
      ))}

      {listSquare.map((value, index) => (
        <Square key={index} value={value} index={index}></Square>
      ))}

      {listSquare.map((value, index) => (
        <button
          className={value === 1 ? "square bg-red" : "square"}
          onClick={() => {
            handleClickOnSquare(index, value);
          }}
        >
          {value}
        </button>
      ))}

      {squareArr.map((value, index) => {
        if (value.toaDoY === 1) {
          return (
            <>
              <div></div>
              <button
                className={value.value === 1 ? "square bg-red" : "square"}
                onClick={() => {
                  handleClickOnSquareNewest(value);
                }}
              >
                {value.toaDoX + "" + value.toaDoY}
              </button>
            </>
          );
        } else {
          return (
            <button
              className={value.value === 1 ? "square bg-red" : "square"}
              onClick={() => {
                handleClickOnSquareNewest(value);
              }}
            >
              {value.toaDoX + "" + value.toaDoY}
            </button>
          );
        }
      })}
    </>
  );
};

export default Game;
