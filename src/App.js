import "./App.css";
import { useState } from "react";
import Table from "./components/Table";

function App() {
  const data = [
    [
      "Город",
      "Район",
      "Отрасль",
      "Год",
      "Год",
      "Год",
      "Год",
      "Год",
      "Год",
      "Год",
      "Год",
    ],
    [
      "Город",
      "Район",
      "Отрасль",
      "2018",
      "2018",
      "2019",
      "2019",
      "2020",
      "2020",
      "2021",
      "2021",
    ],
    [
      "Город",
      "Район",
      "Отрасль",
      "Значение1",
      "Значение2",
      "Значение1",
      "Значение2",
      "Значение1",
      "Значение2",
      "Значение1",
      "Значение2",
    ],
    [
      "Питер",
      "Адмиралтейский",
      "Здравоохранение",
      1070.49,
      3907.9,
      null,
      1231.12,
      3907.9,
      null,
      45765.34,
      76356.12,
    ],
    [
      "Питер",
      "Адмиралтейский",
      "Образование",
      322.49,
      3907.9,
      22.88,
      565.12,
      3907.9,
      12313.1,
      9869.34,
      776.12,
    ],
    [
      "Питер",
      "Адмиралтейский",
      "Экономика",
      75675.49,
      12.9,
      11.11,
      1.12,
      390.9,
      null,
      145765.34,
      743356.12,
    ],
    [
      "Питер",
      "Петроградский",
      "Экономика",
      1070.49,
      3907.9,
      null,
      1231.12,
      3907.9,
      45765.34,
      45765.34,
      356.0,
    ],
    [
      "Питер",
      "Петроградский",
      "Финансы",
      7.9,
      3907.9,
      1231.12,
      1231.12,
      3907.9,
      null,
      45765.34,
      7356.12,
    ],
    [
      "Питер",
      "Калининский",
      "Здравоохранение",
      1070.49,
      3907.9,
      null,
      1231.12,
      3907.9,
      null,
      45765.34,
      76356.12,
    ],
    [
      "Питер",
      "Калининский",
      "Образование",
      1070.49,
      37.9,
      70.49,
      1231.12,
      3907.9,
      null,
      45765.34,
      7635.12,
    ],
    [
      "Питер",
      "Калининский",
      "Экономика",
      7.9,
      3907.9,
      70.49,
      1231.12,
      3907.9,
      null,
      45765.34,
      76356.12,
    ],
    [
      "Москва",
      "Адмиралтейский",
      "Здравоохранение",
      1070.49,
      3907.9,
      null,
      1231.12,
      3907.9,
      null,
      45765.34,
      76356.12,
    ],
    [
      "Москва",
      "Адмиралтейский",
      "Образование",
      322.49,
      3907.9,
      22.88,
      565.12,
      3907.9,
      12313.1,
      9869.34,
      776.12,
    ],
    [
      "Москва",
      "Адмиралтейский",
      "Экономика",
      75675.49,
      12.9,
      11.11,
      1.12,
      390.9,
      null,
      145765.34,
      743356.12,
    ],
    [
      "Москва",
      "Петроградский",
      "Экономика",
      1070.49,
      3907.9,
      null,
      1231.12,
      3907.9,
      45765.34,
      45765.34,
      356.0,
    ],
    [
      "Москва",
      "Петроградский",
      "Финансы",
      7.9,
      3907.9,
      1231.12,
      1231.12,
      3907.9,
      null,
      45765.34,
      7356.12,
    ],
    [
      "Москва",
      "Калининский",
      "Здравоохранение",
      1070.49,
      3907.9,
      null,
      1231.12,
      3907.9,
      null,
      45765.34,
      76356.12,
    ],
    [
      "Москва",
      "Калининский",
      "Образование",
      1070.49,
      37.9,
      70.49,
      1231.12,
      3907.9,
      null,
      45765.34,
      7635.12,
    ],
    [
      "Москва",
      "Калининский",
      "Экономика",
      7.9,
      3907.9,
      70.49,
      1231.12,
      3907.9,
      null,
      45765.34,
      76356.12,
    ],
  ];

  const [renderData, setRenderData] = useState([...data]);
  const dataCopy = [...data];
  const [sortData, setSortData] = useState({ sortBy: null, sortDir: null });
  const [merged, setMerged] = useState([]);

  const mergeRows = (row, rowIndex, colIndex) => {
    let result = [];
    let returnData = [];
    let returnRenderData = [...renderData];
    let flag = true;
    for (let j = rowIndex; flag && j < returnRenderData.length; j++) {
      for (let i = 0; flag && i <= colIndex; i++) {
        if (returnRenderData[j][i] !== row[i]) {
          flag = false;
        }
      }
      if (flag) {
        result.push(returnRenderData[j]);
      }
    }
    setMerged((prevState) => [...prevState, result]);
    // проход по каждому из массивов для подсчета суммы
    result.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        if (typeof el[i] === "string") {
          // записываем строчные элементы в пустой массив
          if (i >= returnData.length) {
            returnData.push(el[i]);
          } else {
            // несовпадения заменяем на '...'
            if (returnData[i] !== el[i] && returnData[i] !== "...") {
              returnData.splice(i, 1, "...");
            }
          }
        } else {
          // вставка числовых значений первого массива
          if (typeof returnData[i] === "undefined") {
            returnData.push(el[i]);
          } else {
            //подсчет итоговых значений
            returnData[i] += +el[i];
          }
        }
      }
    });
    // округление числовых значений
    returnData.forEach((el, i) => {
      if (typeof el === "number") {
        returnData.splice(i, 1, Math.round(el * 100) / 100);
      }
    });
    //замена исходных массивов на результирующий для перерисовки
    returnRenderData.splice(rowIndex, result.length, returnData);
    setRenderData(returnRenderData);
  };

  const divideRows = (row, rowIndex) => {
    console.log(merged);
    let returnRenderData = [...renderData];
    let result = [];
    // делаем копию свернутых строк
    let mergedCopy = [...merged]
    // находим столбец, до которого будем искать совпадения
    const findingIndex = row.indexOf("...");
    // создаем строку для сравнения
    const findingItems = row.slice(0, findingIndex);
    // все строки, подходящие по поиску
    merged.forEach((el) => {
      for (let i = 0; i < el.length; i++) {
        if (
          findingItems.every((item, index) => {
            return item === el[i][index]
          })
        ) {
          if (el[i][findingIndex + 1] !== "...") {
            result.push(el[i]);
          }
          console.log('result',result)
          mergedCopy[merged.indexOf(el)].splice(i, 1, null)
        }
      }
    });
    console.log(mergedCopy)

    for (let i = rowIndex; i < rowIndex + result.length; i++) {
      returnRenderData.splice(i, i === rowIndex ? 1 : 0, result[i - rowIndex]);
    }
    console.log(returnRenderData);
    console.log(mergedCopy);
    console.log(mergedCopy.map(el => el.filter(item => item!==null)).filter(el => el.length>0));
    setMerged(mergedCopy.map(el => el.filter(item => item!==null)).filter(el => el.length>0))
    setRenderData(returnRenderData);
  };

  const sorter = (col) => {
    // копируем дату
    setMerged([]);
    let returnRenderData = [...dataCopy];
    switch (sortData.sortDir) {
      case "asc":
        // если кликнули на ту же ячейку повторно
        if (sortData.sortBy === col) {
          returnRenderData.sort((a, b) => {
            if (typeof b[col] !== "string") {
              if (+a[col] < +b[col]) {
                return 1;
              } else {
                return -1;
              }
            } else return 0;
          });
          setSortData((prevState) => ({
            ...prevState,
            sortBy: col,
            sortDir: "desc",
          }));
        }
        // если кликнули на другую и нужно сортировать по возрастанию
        else {
          returnRenderData.sort((a, b) => {
            if (typeof b[col] !== "string") {
              if (+a[col] > +b[col]) {
                return 1;
              } else {
                return -1;
              }
            } else return 0;
          });
          setSortData((prevState) => ({
            ...prevState,
            sortBy: col,
            sortDir: "asc",
          }));
        }
        break;
      case "desc":
        // если кликнули на ту же ячейку повторно
        if (sortData.sortBy === col) {
          setSortData((prevState) => ({
            ...prevState,
            sortBy: null,
            sortDir: null,
          }));
        }
        // если кликнули на другую и нужно сортировать по возрастанию
        else {
          returnRenderData.sort((a, b) => {
            if (typeof b[col] !== "string") {
              if (+a[col] > +b[col]) {
                return 1;
              } else {
                return -1;
              }
            } else return 0;
          });
          setSortData((prevState) => ({
            ...prevState,
            sortBy: col,
            sortDir: "asc",
          }));
        }
        break;
      case null:
        // сортировка по возрастанию
        returnRenderData.sort((a, b) => {
          if (typeof b[col] !== "string") {
            if (+a[col] > +b[col]) {
              return 1;
            } else {
              return -1;
            }
          } else return 0;
        });
        setSortData((prevState) => ({
          ...prevState,
          sortBy: col,
          sortDir: "asc",
        }));
        break;
      default:
        break;
    }
    setRenderData([...returnRenderData]);
  };

  return (
    <div className="App">
      <table className="Table">
        <Table
          data={renderData}
          mergeRows={mergeRows}
          divideRows={divideRows}
          sorter={sorter}
          sortData={sortData}
        />
      </table>
    </div>
  );
}

export default App;
