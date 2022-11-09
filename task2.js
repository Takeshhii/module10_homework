/*Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. */

const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    console.log(`Ширина экрана ${window.screen.width }
 Высота экрана ${window.screen.height}`)

    alert(`Ширина экрана ${window.screen.width } и Высота экрана ${window.screen.height}`);

});
