/*Сверстайте кнопку, которая будет содержать в себе icon_01
(как в примере в последнем видео).
При клике на кнопку иконка должна меняться на icon_02.
Повторный клик меняет иконку обратно. */

const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {

    btn.classList.toggle('btn--magic');
    btn.childNodes[3].classList.toggle('active');
    btn.childNodes[5].classList.toggle('active');

    // console.log(btn.childNodes[3])

});