// Get the modal
const userPicModal = document.getElementsByClassName('modal')[0];
const modModal = document.getElementsByClassName('modal')[0];
const delModal = document.getElementsByClassName('modal')[1];

// Get the button that opens the modal
const pictureBtnUser = document.querySelectorAll('.modal-btn')[0];
const productModifyBtn = document.querySelectorAll('.modal-btn')[0];
const deleteBtn = document.querySelectorAll('.modal-btn')[1];


function show() {
  userPicModal.style.display = 'block';
}

function modProductModal() {
  modModal.style.display = 'block';
  delModal.style.display = 'none';
}
function delProductModal() {
  modModal.style.display = 'none';
  delModal.style.display = 'block';
}

// Get the <span> element that closes the modal
const userSpan = document.getElementsByClassName('close')[0];
const modSpan = document.getElementsByClassName('close')[0];
const delSpan = document.getElementsByClassName('close')[0];

function hide() {
  userPicModal.style.display = 'none';
  modModal.style.display = 'none';
  delModal.style.display = 'none';
}

// When the user clicks on <span> (x), close the modal
userSpan.addEventListener('click', hide);
modSpan.addEventListener('click', hide);
delSpan.addEventListener('click', hide);

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === userPicModal) {
    userPicModal.style.display = 'none';
  } else if (event.target === modModal) {
    modModal.style.display = 'none';
  } else if (event.target === delModal) {
    delModal.style.display = 'none';
  }
};

// When the user clicks the button, open the modal
pictureBtnUser.addEventListener('click', show);
productModifyBtn.addEventListener('click', modProductModal);
deleteBtn.addEventListener('click', delProductModal);
