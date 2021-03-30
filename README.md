В корне приложения App вынесены функции для слияния и разделения строк mergeRows и divideRows. Также там находится функция сортировки sort.
Они, вместе с копией data передаются в компонент Table для отрисовки. Сначала в функцию renderRows передаются строки, внутри этой функции строка сперва обрабатывается на наличие совпадений идущих горизонтально, для увеличения аттрибута colspan, чтобы соединить стоящие справа ячейки, после чего ищутся совпадения под ячейкой, для увеличения аттрибута rowspan. Он увеличивается, если каждая ячейка слева от него строго равна ячейке идущей под ней соответственно, т.е. для объединения районов, нужно, чтобы у них совпадали города и т.д.
Также, если у ячейки аттрибут rowspan больше 1, то есть, ее потенциально можно свернуть, и если она принадлежит к телу таблицы, на нее навешивается обработчик onClick из свойства props для слияния строк mergeRows.
При клике на такую ячейку, в обработчик передается строка полностью, ячейкой которой является кликнутая ячейка, а также номера строки и столбца. Исходя из этих данных, ищутся совпадения в отрисованной data, по строчным значениям кликнутой ячейки и ячейкам слева от нее, т.е. при клике на район Адмиралтейский города Питер, функция ищет совпадения по двум этим ячейкам, собирает их в результирующий массив, далее считает суммы числовых значений по каждому столбцу, формирует итоговую строку для отрисовки, добавляя вместо отраслей строчное выражение '...', заменяет найденные до этого строки на нее и сохраняет в стейте строк для отрисовывания, после чего запускается механизм перерисовки и новая data передается в Table.
В свою очередь, если в компоненте Table функция находит строковое значение '...', что свидетельствует о свернутой строке, на ячейку, идущую перед ней, навешивается обработчик onClick для разделения строк divideRows. В него передается разделенная строка и номер строки, чтобы в копии изначальной data функция нашла совпадения строчных значений идущих перед '...' и заменила найденными строками объединенную, после чего, сохранив обновленный массив строк в стейте, снова запустится механизм отрисовки.
На ячейки, имеющие строковый тип и идущие перед ячейками, имеющими числовой тип, навешивается обработчик сортировки sort. Он принимает в себя номер столбца, который нужно отсортировать, и с помощью функции switch сортирует в порядке возрастания. Если кликнуть на сортирующую ячейку того же столбца, произойдет сортировка по убываю. Следующий клик приведет таблицу в изначальное состояние. Если же после сортировки любого типа кликнуть на ячейку сортировки другого столбца, сортировка снова пройдет по возрастанию.

Также была попытка релизовать слияние и разделение строк в отсортированной таблице, я оставил функцию divideRows в том состоянии, где не смог придумать, как решить данную задачу. У меня была идея заносить в стейт объединенных строк массивы, содержащие эти строки, чтобы потом искать в каждом из них нужные для разделения. Проблема была в том, что я не понял, как различать объедниенные в разных местах строки для разделения в тех местах, где они были объединены. Для того, чтобы посмотреть, как работала последняя версия таблицы, нужно удалить комментарии на строках 163-164 и 188-189.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
