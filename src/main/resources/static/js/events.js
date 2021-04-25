window.onload = function(){
    const button = document.getElementById("button");
    const button1 = document.getElementById("button1");
    new MyDialog(button);
    new MyDialog(button1);
    document.body.classList.remove('hidden');
};
