window.addEventListener('load', function () {
  var preview_img = document.querySelector('.preview_img');
  var mask = document.querySelector('.mask');
  var big = document.querySelector('.big');
  //当鼠标经过preview_img，就显示和隐藏mask遮挡层和big大盒子
  preview_img.addEventListener('mouseover', function () {
    mask.style.display = 'block';
    big.style.display = 'block';
  })
  preview_img.addEventListener('mouseout', function () {
    mask.style.display = 'none';
    big.style.display = 'none';
  })
  //鼠标移动时，把鼠标的坐标赋给黄色遮盖盒子,并且让鼠标位于黄色盒子的中央
  preview_img.addEventListener('mousemove', function (e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var maskX = x - mask.offsetWidth / 2;
    var maskY = y - mask.offsetHeight / 2;
    var maskMax = preview_img.offsetWidth - mask.offsetWidth;
    if (maskX <= 0) {
      maskX = 0;
    } else if (maskX >= maskMax) {
      maskX = maskMax;
    }
    if (maskY <= 0) {
      maskY = 0;
    } else if (maskY >= preview_img.offsetHeight - mask.offsetHeight) {
      maskY = preview_img.offsetHeight - mask.offsetHeight;
    }
      mask.style.left = maskX + 'px';
    mask.style.top = maskY + 'px';
    //大图片的移动距离=遮挡层移动距离*大图片最大移动距离/遮挡层的最大移动距离
    var bigImg = document.querySelector('.bigImg');
    //大图片最大移动距离
    var bigMax = bigImg.offsetWidth - big.offsetWidth;
    //大图片的移动距离
    var bigX = maskX * bigMax / maskMax;
    var bigY = maskY * bigMax / maskMax;
    bigImg.style.left = -bigX + 'px';
    bigImg.style.top = -bigY + 'px';
  })
})