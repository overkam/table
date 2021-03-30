import "./Table.css";

function Table(props) {
  const sortDir = props.sortData.sortDir === null ? "" : props.sortData.sortDir;
  let className;
  let resultNumbers = [];
  let resultColspan;

  const addClassName = (el) => {
    className = "tableHead";
    for (let i = 0; i < el.length; i++) {
      if (typeof el[i] !== "string") {
        className = "tableBody";
        break;
      }
    }
    return className;
  };

  const renderRow = (el, rowIndex) => {
    const classNameValue = className;

    return (
      <>
        {el.map((item, itemIndex) => {
          let rowspan = 1;
          let colspan = 1;
          //строчный элемент
          if (typeof item === "string") {
            //проверка на элемент свернутой ячейки
            if (el[itemIndex + 1] === "...") {
              return (
                <td
                  id={`${rowIndex} ${itemIndex}`}
                  onClick={() => props.divideRows(el, rowIndex, itemIndex)}
                  className={item !== "..." ? "divide" : null}
                >
                  {item}
                  <img
                    className="arrow"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMy4yNDUgNGwtMTEuMjQ1IDE0LjM3NC0xMS4yMTktMTQuMzc0LS43ODEuNjE5IDEyIDE1LjM4MSAxMi0xNS4zOTEtLjc1NS0uNjA5eiIvPjwvc3ZnPg=="
                  ></img>
                </td>
              );
            }
            // возврат пустой ячейки для заполнения не являющейся свернутой
            if (item === el[itemIndex - 1]) {
              if (item !== "...") return null;
            } else {
              // проверка на соответствие следующего элемента
              if (item === el[itemIndex + 1]) {
                for (let i = itemIndex + 1; i < el.length; i++) {
                  // увеличение ширины ячейки
                  if (item === el[i]) {
                    colspan++;
                  }
                }
              }
            }
            // первый столбец
            if (itemIndex === 0) {
              // не первая или последняя строка
              if (rowIndex > 0 || rowIndex === props.data.length - 1) {
                // удалить повторяющийся элемент
                if (item === props.data[rowIndex - 1][itemIndex]) {
                  return null;
                }
              }
              if (
                props.data[rowIndex + 1] &&
                item === props.data[rowIndex + 1][itemIndex]
              ) {
                //подсчет элементов под ячейкой для увеличения rowSpan
                let flag = true;
                for (let i = rowIndex + 1; flag; i++) {
                  if (
                    i < props.data.length &&
                    item === props.data[i][itemIndex]
                  ) {
                    // увеличение
                    ++rowspan;
                  } else {
                    flag = false;
                  }
                }
              }
            }
            // следющие столбцы
            else {
              // проверка на существование следющей строки
              if (props.data[rowIndex + 1]) {
                // элемент совпадает с нижестоящим элементом
                if (item === props.data[rowIndex + 1][itemIndex]) {
                  let flag = true;
                  // проходимся по всем нижестоящим строкам
                  for (
                    let i = rowIndex + 1;
                    flag && i < props.data.length;
                    i++
                  ) {
                    // проверка на совпадение района и города
                    for (let j = itemIndex; j > -1; j--) {
                      if (el[j] !== props.data[i][j]) {
                        flag = false;
                      }
                    }
                    if (
                      i < props.data.length &&
                      item === props.data[i][itemIndex]
                    ) {
                      // увеличение
                      flag && rowspan++;
                    } else {
                      flag = false;
                    }
                  }
                }
              }
              // удление повторяющихся элементов
              if (rowIndex > 0) {
                // элемент совпадает с вышестоящим элементом
                if (item === props.data[rowIndex - 1][itemIndex]) {
                  let flag = true;
                  for (let j = itemIndex; j > -1; j--) {
                    if (el[j] !== props.data[rowIndex - 1][j]) {
                      flag = false;
                    }
                  }
                  if (flag) return null;
                }
              }
            }
          } else {
            // подсчет итогов по столбцу после отрисовки последней строки
            if (rowIndex === props.data.length - 1) {
              let counter = null;
              //проход по всем ячейкам столбца
              for (let i = 0; i < props.data.length; i++) {
                //проверка на числовое значение элемента
                if (typeof props.data[i][itemIndex] !== "string") {
                  counter += +props.data[i][itemIndex];
                }
              }
              // добавление подписи Итог
              if (resultNumbers.length === 0) {
                resultColspan = itemIndex;
                resultNumbers.push("Итог");
              }
              //округление
              resultNumbers.push(Math.round(counter * 100) / 100);
            }
          }

          return (
            <td
              rowSpan={rowspan}
              colSpan={colspan}
              onClick={
                // назначение обработчика на сворачивание строк
                rowspan > 1
                  ? () =>
                      classNameValue === "tableBody" &&
                      //удалить
                      //строку
                      props.sortData.sortBy === null
                        ? props.mergeRows(el, rowIndex, itemIndex)
                        : null
                  : // назначение обработчика сортировки
                  rowIndex < props.data.length - 1 &&
                    typeof item === "string" &&
                    typeof props.data[rowIndex + 1][itemIndex] !== "string"
                  ? () => props.sorter(itemIndex)
                  : null
              }
              className={
                // присовоение класса фиксированной ширины первым трем столбцам, чтобы при сворачивании не изменялась ширина таблицы
                className === "tableHead"
                  ? rowIndex === 0 && itemIndex < 3
                    ? itemIndex === 0
                      ? `fixedWidth${itemIndex} leftUp`
                      : `fixedWidth${itemIndex}`
                    : rowIndex === 2
                    ? itemIndex === el.length-1 ? "sorter rightDown" : "sorter"
                    : rowIndex === 0 && itemIndex === 3
                    ? "rightUp"
                    : null
                  : rowspan > 1 &&
                    //удалить
                    //строку
                    props.sortData.sortBy === null
                  ? // присовение класса сворачивающей кнопки для отображения стрелки при наведении
                    "merge"
                  : null
              }
              data-title="Sort"
            >
              {item || 0}
              {/* наличие стрелки для сворачивания*/}
              {rowspan > 1 &&
              className === "tableBody" &&
              item !== "..." &&
              typeof item === "string" ? (
                <img
                  className="arrow" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAuNDc3IDBoLTguOTc3bDEyLjAyNCAxMi0xMi4wMjQgMTJoOC45NzdsMTIuMDIzLTEyeiIvPjwvc3ZnPg=="></img>
              ) : null}
              {/* отображение стрелки сортировки */}
              {itemIndex === props.sortData.sortBy &&
              rowIndex < props.data.length - 1 &&
              typeof item === "string" &&
              typeof props.data[rowIndex + 1][itemIndex] !== "string" ? (
                props.sortData.sortDir === "asc" ? (
                  <img
                    className="arrowUp"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAzLjc5NWwyLjk5NS0yLjk4IDExLjEzMiAxMS4xODUtMTEuMTMyIDExLjE4Ni0yLjk5NS0yLjk4MSA4LjE2Ny04LjIwNS04LjE2Ny04LjIwNXptMTguMDQgOC4yMDVsLTguMTY3IDguMjA1IDIuOTk1IDIuOTggMTEuMTMyLTExLjE4NS0xMS4xMzItMTEuMTg2LTIuOTk1IDIuOTggOC4xNjcgOC4yMDZ6Ii8+PC9zdmc+"
                  />
                ) : (
                  <img
                    className="arrowDown"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMCAzLjc5NWwyLjk5NS0yLjk4IDExLjEzMiAxMS4xODUtMTEuMTMyIDExLjE4Ni0yLjk5NS0yLjk4MSA4LjE2Ny04LjIwNS04LjE2Ny04LjIwNXptMTguMDQgOC4yMDVsLTguMTY3IDguMjA1IDIuOTk1IDIuOTggMTEuMTMyLTExLjE4NS0xMS4xMzItMTEuMTg2LTIuOTk1IDIuOTggOC4xNjcgOC4yMDZ6Ii8+PC9zdmc+"
                  />
                )
              ) : null}
            </td>
          );
        })}
      </>
    );
  };

  return (
    <tbody>
      {props.data.map((el, index) => (
        <tr className={addClassName(el)} key={index}>
          {renderRow(el, index)}
        </tr>
      ))}
      {resultNumbers.length ? (
        <tr className="tableFoot">
          {resultNumbers.map((el, index) => (
            <td
              className={typeof el !== "string" ? "textLeft" : null}
              colSpan={index === 0 ? resultColspan : 1}
            >
              {el}
            </td>
          ))}
        </tr>
      ) : null}
    </tbody>
  );
}

export default Table;
