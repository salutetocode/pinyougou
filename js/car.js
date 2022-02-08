$(function () {
  //全选 全不选功能模块
  //把全选按钮（checkall）的状态值赋给三个小复选框按钮（j-checkbox）就可以了
  //事件使用change()
  $('.checkall').change(function () {
    //$(this).prop("checked") 是全选按钮的选中状态 把它赋给三个小复选框按钮
    //使用并集选择器，使上下两个全选按钮都选中或不选中
    $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
    //如果全选按钮选中，则添加check-cart-item类名
    if ($(this).prop('checked')) {
      $('.cart-item').addClass('check-cart-item');
    } else {
      //否则删除check-cart-item
      $('.cart-item').removeClass('check-cart-item');
    }
  });
  //如果小的复选框被选中的个数=$('.j-checkbox').length，就应该把全选按钮选上，否则不选
  //$('.j-checkbox:checked').length是选中的小复选框个数
  //$('.j-checkbox').length是所有小复选框的个数
  //事件对象是小复选框按钮
  $('.j-checkbox').change(function () {
    if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
      $('.checkall').prop('checked', true);
    } else {
      $('.checkall').prop('checked', false);
    }
    //如果当前的小复选框被选中，则当前的商品加上背景
    if ($(this).prop('checked')) {
      $(this).parents('.cart-item').addClass('check-cart-item');
    } else {
      //如果当前的小复选框没被选中，则当前的商品没有背景
      $(this).parents('.cart-item').removeClass('check-cart-item');
    }
  });
  //增减商品数量
  //点击加号按钮，增加商品数量
  $('.increment').click(function () {
    //先获取当前文本框内商品数量
    var num = $(this).siblings('.itxt').val();
    //执行增加商品数量行为
    num++;
    //把增加后的商品数量赋给文本框
    $(this).siblings('.itxt').val(num);
    //计算商品小计模块，根据文本框的值 * 当前商品的价格=商品的小计
    //当前商品的价格为p $(this).parent().parent()===$(this).parents('.p-num')
    var p = $(this).parent().parent().siblings('.p-price').html();
    //取到的p是￥12.60 要利用截取字符串方法substr()，截取后取到的就是12.60
    p = p.substr(1);
    //计算商品小计
    //保留两位小数
    var price = (p * num).toFixed(2);
    $(this)
      .parent()
      .parent()
      .siblings('.p-sum')
      .html('￥' + price);
    getSum();
  });
  //点击减号按钮，商品数量减少，减少到1时不可再减
  $('.decrement').click(function () {
    //先获取当前文本框内商品数量
    var num = $(this).siblings('.itxt').val();
    //执行减少商品数量行为,当num>1时允许减，=1时就不用再减了
    if (num == 1) {
      return false;
    }
    num--;
    //把减少后的商品数量赋给文本框
    $(this).siblings('.itxt').val(num);
    //计算商品小计模块，根据文本框的值 * 当前商品的价格=商品的小计
    //当前商品的价格为p  $(this).parent().parent()===$(this).parents('.p-num')
    var p = $(this).parent().parent().siblings('.p-price').html();
    //取到的p是￥12.60 要利用截取字符串方法substr()，截取后取到的就是12.60
    p = p.substr(1);
    //计算商品小计
    //保留两位小数
    var price = (p * num).toFixed(2);
    $(this)
      .parent()
      .parent()
      .siblings('.p-sum')
      .html('￥' + p * num);
    getSum();
  });
  //如果用户直接修改了文本框里的值，就利用change()事件来计算商品的小计
  $('.itxt').change(function () {
    //获取当前表单里的值 以及当前商品的单价
    var num = $(this).val();
    var p = $(this).parents('.p-num').siblings('.p-price').html();
    //取到的p是￥12.60 要利用截取字符串方法substr()，截取后取到的就是12.60
    p = p.substr(1);
    //计算商品小计
    $(this)
      .parents('.p-num')
      .siblings('.p-sum')
      .html('￥' + (p * num).toFixed(2));
    getSum();
  });
  //总计是文本框里的值相加用val(),总额是普通元素的内容用text()
  //页面刚打开时有默认的商品数量，所以也要更改，即先调用一次函数
  getSum();
  function getSum() {
    var count = 0; //总计
    var money = 0; //总额
    $('.itxt').each(function (i, ele) {
      count += parseInt($(ele).val());
    });
    $('.amount-sum em').text(count);
    $('.p-sum').each(function (i, ele) {
      money += parseFloat($(ele).text().substr(1));
    });
    $('.price-sum em').text('￥' + money.toFixed(2));
  }
  //商品删除模块 每次删除，总计和总额都要重新计算
  //删除1：商品后面的删除按钮
  $('.p-action a').click(function () {
    $(this).parents('.cart-item').remove();
    getSum();
  });
  //删除2：删除选中的商品
  //点击删除选中的商品 删除的是小复选框被选中的商品
  $('.remove-batch').click(function () {
    $('.j-checkbox:checked').parents('.cart-item').remove();
    getSum();
  });
  //删除3：清空购物车 删除所有的商品
  $('.clear-all').click(function () {
    $('.cart-item').remove();
    getSum();
  });
});
