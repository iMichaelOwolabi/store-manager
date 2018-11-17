// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const pictureBtnUser = document.querySelectorAll('.profile-pic')[0];
const pictureBtnAdmin = document.querySelectorAll('.profile-pic')[1];

function show() {
  modal.style.display = 'block';
}
// When the user clicks the button, open the modal
pictureBtnUser.addEventListener('click', show);
pictureBtnAdmin.addEventListener('click', show);

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

function hide() {
  modal.style.display = 'none';
}
// When the user clicks on <span> (x), close the modal
span.addEventListener('click', hide);

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
