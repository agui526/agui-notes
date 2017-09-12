### 0、什么是cookie

HTTP Cookie（也叫Web cookie或者浏览器Cookie）是服务器发送到用户浏览器并保存在浏览器上的一块数据（实际上是一小段的文本信息），它会在浏览器下一次发起请求时被携带并发送到服务器上。

比较经典的，可以它用来确定两次请求是否来自于同一个浏览器，从而能够确认和保持用户的登录状态。

Cookie的使用使得基于无状态的HTTP协议上记录稳定的状态信息成为了可能。

### 1、cookie的作用：

我们在浏览器中，经常涉及到数据的交换，比如你登录邮箱，登录一个页面。我们经常会在此时设置30天内记住我，或者自动登录选项。那么它们是怎么记录信息的呢，答案就是今天的主角cookie了，

Cookie是由HTTP服务器设置的，保存在浏览器中，但HTTP协议是一种无状态协议，在数据交换完毕后，服务器端和客户端的链接就会关闭，每次交换数据都需要建立新的链接。

就像我们去超市买东西，没有积分卡的情况下，我们买完东西之后，超市没有我们的任何消费信息，但我们办了积分卡之后，超市就有了我们的消费信息。

cookie就像是积分卡，可以保存积分，商品就是我们的信息，超市的系统就像服务器后台，http协议就是交易的过程。

> 无状态：从请求响应本身看，每一次的请求是独立不相干的。就好像你登录某网站，由于http是一个无状态的协议，你点击超链接跳转到该网站中其它的页面时，你的登录状态就不存在了，此时需要cookie机制保存你的登录信息。
态指

> [http协议中的无状态指什么](http://www.cnblogs.com/bellkosmos/p/5237146.html)

### 2、机制的区别：

session机制采用的是在服务器端保持状态的方案，而cookie机制则是在客户端保持状态的方案，cookie又叫会话跟踪机制。打开一次浏览器到关闭浏览器算是一次会话。

说到这里，讲下HTTP协议，前面提到，HTTP协议是一种无状态协议，在数据交换完毕后，服务器端和客户端的链接就会关闭，每次交换数据都需要建立新的链接。

此时，服务器无法从链接上跟踪会话。cookie可以跟踪会话，弥补HTTP无状态协议的不足。

### 3、cookie的分类：

cookie分为`会话cookie`和`持久cookie`

会话cookie是指在不设定它的生命周期expires时的状态，前面说了，浏览器的开启到关闭就是一次会话，当关闭浏览器时，会话cookie就会跟随浏览器而销毁。当关闭一个页面时，不影响会话cookie的销毁。
会话cookie就像我们没有办理积分卡时，单一的买卖过程，离开之后，信息则销毁。

持久cookie则是设定了它的生命周期expires，此时，cookie像商品一样，有个保质期，关闭浏览器之后，它不会销毁，直到设定的过期时间。
对于持久cookie，可以在**同一个浏览器**中传递数据，比如，你在打开一个淘宝页面登陆后，你在点开一个商品页面，依然是登录状态，即便你关闭了浏览器，再次开启浏览器，依然会是登录状态。这就是因为cookie自动将数据传送到服务器端，在反馈回来的结果。
持久cookie就像是我们办理了一张积分卡，即便离开，信息一直保留，直到时间到期，信息销毁。
注意：Cookie功能需要浏览器的支持。如果浏览器不支持Cookie（如大部分手机中的浏览器）或者把Cookie禁用了，Cookie功能就会失效。不同的浏览器采用不同的方式保存Cookie。

### 4、简单的使用cookie的代码

cookie的几种常见属性： document.cookie="key=value;expires=失效时间;path=路径;domain=域名;secure;(secure表安全级别）",cookie以字符串的形式保存在浏览器中。

下面贴段代码出来，是一个类似购物网站的将商品添加到购物车，再从购物车还原商品信息的过程，是自己用原生JS封装的函数。封装的cookie的存入，读取以及删除的函数：（这里是将信息以对象的形式存放到cookie中的，会用到JSON的知识)

> 原文 ： http://blog.csdn.net/u014753892/article/details/52821268

```javascript
// key : cookie 名
// value : cookie 值
// options : 可选配置参数
//		options = {
//			expires : 7|new Date(), // 失效时间
//			path : "/", // 路径
//			domain : "", // 域名
//			secure : true // 安全连接
//		}
function cookie(key, value, options) {
	/* read 读取 */
	// 如果没有传递 value ，则表示根据 key 读取 cookie 值
	if (typeof value === "undefined") { // 读取
		var cookies = document.cookie.split("; ");
		for (var i = 0, len = cookies.length; i < len; i++) {
			var cookie = cookies[i].split("=");
			if (decodeURIComponent(cookie[0]) === key) {
				return decodeURIComponent(cookie[1]);
			}
		}
		return null;
	}

	/* 存入 设置 */
	options = options || {};
	var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	if ((typeof options.expires) !== "undefined") { 
		if (typeof options.expires === "number") { 
			var days = options.expires, 
				t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		} 
		cookie += ";expires=" + options.expires.toUTCString();
	}
	if (typeof options.path !== "undefined")
		cookie += ";path=" + options.path;
	if (typeof options.domain !== "undefined")
		cookie += ";domain=" + options.domain;
	if (options.secure)
		cookie += ";secure";

	document.cookie = cookie;
}

// 删除指定的 cookie
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1; // 将失效时间设置为 1 天前
	cookie(key, "", options);
}

下面是商品详情页的JS代码 


// 找到所有的 “添加到购物车” 超级链接
var links = $("a", $("#tab"));
// 循环，为每个 “添加到购物车” 的超级链接添加点击事件
for (var i = 0, len = links.length; i < len; i++) {
	links[i].onclick = function(){
		// 获取当前超级链接所在行的所有单元格
		var _cells = this.parentNode.parentNode.cells;
		// 获取到即将添加到购物车中的商品信息
		var _id = _cells[0].innerHTML,
			_name = _cells[1].innerHTML,
			_price = _cells[2].innerHTML;
		// 将商品信息包装到一个对象中
		var product = {
			id : _id,
			name : _name,
			price : _price,
			amount : 1
		};

		/* 将当前选购的商品对象保存到 cookie 中去 */
		// 从 cookie 中读取已有的保存购物车的数组结构
		var _products = cookie("products");
		if (_products === null) // cookie 中不存在 products 名的 cookie
			_products = [];
		else // 存在，则解析 cookie 读取到的字符串为 数组 结构
			_products = JSON.parse(_products);

		// 将当前选购的商品追加到数组中保存
		_products.push(product);
		// 继续将 _products 数组内容存回 cookie
		cookie("products", JSON.stringify(_products), {expires:7});
	}
}
```

html代码，css代码大家可以自己写 

```html
<table id="tab">
	<tr>
		<td>序号</td>
		<td>名称</td>
		<td>价格</td>
		<td>操作</td>
	</tr>
	<tr>
		<td>1</td>
		<td>空调</td>
		<td>3999</td>
		<td><a href="javascript:void(0);">添加到购物车</a></td>
	</tr>
	<tr>
		<td>2</td>
		<td>风扇</td>
		<td>288</td>
		<td><a href="javascript:void(0);">添加到购物车</a></td>
	</tr>
</table>
<a href="cart_购物车.html" target="_blank">查看购物车</a>
```

购物车还原商品信息： 

```javascript
// 从 cookie 中读取购物车已有的商品信息
var _products = cookie("products");
// 判断购物车是否有商品
if (_products === null || (_products = JSON.parse(_products)).length === 0)
	return;

// 如果有商品，则显示到页面中
$(".result")[0].innerHTML = "";
for (var i = 0, len = _products.length; i < len; i++) {
	// 当前遍历到的商品对象
	var prod = _products[i];
	// 克隆 .row 的节点
	var _row = $(".row")[0].cloneNode(true);
	// 将当前商品对象的信息替换节点中对应的部分，用class名获取到的节点返回类型是一个数组所以要在后面加上[0]
	$(".index", _row)[0].innerHTML = prod.id; // 编号
	$(".name", _row)[0].innerHTML = prod.name; // 名称
	$(".price", _row)[0].innerHTML = prod.price; // 价格
	$(".amount", _row)[0].innerHTML = prod.amount; // 数量
	$(".oper", _row)[0].innerHTML = "<a href='javascript:void(0);'>删除</a>"

	// 将克隆的节点副本追加到 .result 的 div 中
	$(".result")[0].appendChild(_row);
};

// 为每个 “删除” 的超级链接绑定点击事件
var links = $("a", $("#container"));
for (var i = 0, len = links.length; i < len; i++) {
	// links[i].index = i; // 为当前遍历到的超级链接附加数据
	links[i].product = _products[i]; // 
	links[i].onclick = function(){
		// alert("你点击的是第" + (this.index + 1) + "个连接");
		var index = inArray(this.product, _products);
		
		if (index !== -1) {
			_products.splice(index, 1);
		}
		// 更新 cookie
		cookie("products", JSON.stringify(_products), {expires:7});

		// 找出页面中待删除的行
		var _row = this.parentNode.parentNode;
		_row.parentNode.removeChild(_row);
	};
}
```

> 这里的$(' ')函数是自己封装的函数，用于获取到DOM节点，可以看下我关于getElementsByClassName的兼容那篇文章。 

购物车的html代码

```html
<div id="container">
	<div class="row">
		<div class="index">商品编号</div>
		<div class="name">商品名称</div>
		<div class="price">价格</div>
		<div class="amount">数量</div>
		<div class="oper">操作</div>
	</div>
	<div class="result" style="clear:both;">
		购物车为空
	</div>
</div>
```
