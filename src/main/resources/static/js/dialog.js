
const TextTypes = {
  SMALL: 'small',
  BIG: 'big',
};
const Display = {
  SHOW: 'block',
  HIDE: 'none',
};



function MyDialog(button) {
  this.show = false;
  this.textType = TextTypes.SMALL;
  this.closeButton = document.getElementById("close");
  this.closeButton.onclick = this.onCloseHandler.bind(this);
  this.dialogModal = document.getElementById("myModal");
  this.textElement = document.getElementById("text");
  this.loaderElement = document.getElementById("loader");
  this.requestButton = document.getElementById("request-button");
  this.requestButton.onclick = this.getText.bind(this);
  this.hash = {};
  button.onclick = this.onLoadHandler.bind(this);
}

MyDialog.prototype.setText = function(text) {
  this.textElement.innerHTML = text;
};

MyDialog.prototype.onCloseHandler = function()  {
  this.dialogModal.style.display = Display.HIDE;
  this.show = false;
  document.body.classList.remove("noScroll")
}

MyDialog.prototype.onLoadHandler = function() {
  if (!this.show) {
    this.dialogModal.style.display = Display.SHOW;
    document.body.classList.add("noScroll")
    this.show = true;
    this.textType = TextTypes.BIG;
    this.getText(true);
  } else {
    this.onCloseHandler();
  }
}

MyDialog.prototype.getText = function(small = false)  {
  //  First click on the button inside the pop-up shall trigger long pop-up content load (displayed when it gets loaded)
  const type =
    this.textType === TextTypes.BIG || (typeof small === 'boolean' && small)
    ? TextTypes.SMALL
    : TextTypes.BIG;
  if (this.hash[type]) {
    this.setText(this.hash[type]);
    this.textType = type;
    return;
  }
  this.setLoading(true)
  fetch(`/getText?type=${type}`)
  .then((response) => {
    return response.text().then((text) => {
      this.setText(text);
      this.textType = type;
      this.hash[type] = text;
    })
  })
  .finally(() => this.setLoading(false))
}

MyDialog.prototype.setLoading = function(value) {
  this.loaderElement.style.display = value ? Display.SHOW : Display.HIDE;
}
