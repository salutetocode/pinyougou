window.addEventListener('load', function () {
  //轮播图的js文件
  //鼠标掠过，按钮显示与隐藏
  var focus = document.querySelector('.focus');
  var arrowl = document.querySelector('.arrow-l');
  var arrowr = document.querySelector('.arrow-r');
  focus.addEventListener('mouseenter', function () {
    arrowl.style.display = 'block';
    arrowr.style.display = 'block';
    //鼠标经过，停止自动播放轮播图的定时器
    clearInterval(timer);
    timer = null; //清除
  });
  focus.addEventListener('mouseleave', function () {
    arrowl.style.display = 'none';
    arrowr.style.display = 'none';
    //鼠标划走，开启自动播放轮播图的定时器
    timer = setInterval(function () {
      arrowr.click();
    }, 2000);
  });
  //动态生成小圆圈，有几张图片就生成多少个
  var ul = focus.querySelector('ul');
  var ol = focus.querySelector('.circle');
  //得到图片的宽度
  var focusWidth = focus.offsetWidth;
  for (var i = 0; i < ul.children.length; i++) {
    //创建li
    var li = document.createElement('li');
    //创建li的时候为其添加index属性
    li.setAttribute('index', i);
    //插入li
    ol.appendChild(li);
    //小圆圈的排他思想，绑定事件
    li.addEventListener('click', function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
      }
      //留下我自己的样式
      this.className = 'current';
      //点击小圆圈时图片发生移动，移动的是ul
      //ul的移动距离为小圆圈的索引号 * 图片的宽度 是负值！！
      var index = this.getAttribute('index');
      //当点击某个li，就把li的索引号给num
      num = index;
      //当点击某个li，就把li的索引号给circle
      circle = index;
      animate(ul, -index * focusWidth);
    });
  }
  //把ol里的第一个li的类名设置为current
  ol.children[0].className = 'current';
  //利用js克隆第一张图片放到ul的最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  //点击右侧按钮，图片滚动一张
  var num = 0;
  //控制小圆圈变化的变量
  var circle = 0;
  //节流阀
  var flag = true;
  //轮播图右侧按钮
  arrowr.addEventListener('click', function () {
    //如果走到了最后复制的那一张图片的位置，就把ul快速复原，把其left值改为0
    if (flag) {
      //先关闭节流阀
      flag = false;
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        //动画函数执行完再开启节流阀
        flag = true;
      });
      //点击右侧按钮，小圆圈一起变化，声明circle变量控制小圆圈的播放
      circle++;
      //如果circle==ol.children.length，说明我们到了最后一张复制的图片，我们要把circle复原为0
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });
  //轮播图左侧按钮
  arrowl.addEventListener('click', function () {
    if (flag) {
      flag = false;
      //如果走到了最后复制的那一张图片的位置，就把ul快速复原，把其left值改为0
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + 'px';
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      //点击右侧按钮，小圆圈一起变化，声明circle变量控制小圆圈的播放
      circle--;
      //如果circle==0，说明我们到了第一张图片，我们要把circle复原为ol.children.length-1
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  });
  function circleChange() {
    //清除其他小圆圈的样式
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = '';
    }
    //保留当前小圆圈的样式
    ol.children[circle].className = 'current';
  }
  //自动播放轮播图
  var timer = setInterval(function () {
    //手动调用右侧按钮
    arrowr.click();
  }, 2000);

  //电梯导航
  //节流阀 互斥锁
  var flag = true;
  //1.页面滚动到今日推荐模块，电梯导航显示
  //$(document).scrollTop()是被卷去的头部
  //toolTop是今日推荐距离文档顶部的距离
  var toolTop = $('.recommend').offset().top;
  //刷新页面的时候就执行函数，让电梯导航出现，防止刷新页面导航消失
  toggleTool();
  function toggleTool() {
    if ($(document).scrollTop() >= toolTop) {
      $('.fixedtool').fadeIn();
    } else {
      $('.fixedtool').fadeOut();
    }
  }
  $(window).scroll(function () {
    toggleTool();
    //3.页面滚动到内容区域某个模块时，电梯导航对应的li添加current类，兄弟移除current类
    //触发的事件是页面滚动，所以要写到页面滚动事件中
    //被卷去的头部>=内容区域里的每个模块的offset().top
    if (flag) {
      $('.floor .dh').each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
        }
      });
    }
  });
  //2.点击电梯导航可以滚动到相应内容区域
  $('.fixedtool li').click(function () {
    //开启节流阀
    flag = false;
    //每次点击小li，就需要计算出页面要去往的位置
    //选出对应索引号的内容区域的盒子，计算他的offset().top
    var current = $('.floor .dh').eq($(this).index()).offset().top;
    //页面滚动动画效果
    $('body,html')
      .stop()
      .animate(
        {
          scrollTop: current,
        },
        function () {
          //关闭节流阀
          flag = true;
        }
      );
    //点击li之后，让当前小li添加current类，其他兄弟移除current类名
    $(this).addClass('current').siblings().removeClass();
  });
});
