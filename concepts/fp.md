# 函数式编程中基础概念与应用分析

## 数据结构与容器

数据结构 = 数据集 + 数据关系集 + 在数据集上的基本操作。数据只是信息的映射，它本身不包含基本操作，所以在计算机语言中通常会将数据封装成相对应的对象。具体的例子如下：

```js
let str = 'some text' // 声明一个 string 类型数据
let sub_str = str.substring(2) // 这里使用了substring 方法，
```

在声明 `str` 变量时，仅仅给出了数据，但是为什么可以调用 `substring` 方法？答案是 JavaScript 解释器会自动将 **基本类型数据** 封装成同名的 **基本包装类型对象** ，借此使得 `str` 变量拥有 `substring` 方法，当然解释器也会在调用结束后释放该对象。这种黑箱效应让程序员无须留意转化过程，但同时也忽视了背后的抽象意义，而这正是函数式编程的基础 —— **容器** 。

接下来创建函数式编程中的容器，为了更好的理解容器概念，我没有立即给出结果，反而会不厌其烦的用几步来完成，（真正的原因是本人愚钝需要一步一步推导）。首先将数据 `'A'` 封装成对象，封装的结构可以随意定义：

```js
const objectA = {
  __value: 'A'
}
```

既然 `'A'` 可以封装成对象，那么 `7` 也可以，其他的数据都可以，毕竟在 JavaScript 中万物都是对象。我们就依据 `objectA` 对象结构向上抽象，写出对象的构造函数：

```js
const Container = function(x) {
  this.__value = x // x 可以是任何数据
}
```

现在所有基础类型数据通过 `Container` 都可以映射成对象了。是的，正如你心中所想 `Container` 就是容器，是我们学习到的第一种容器。此外我们通常会在容器中添加一个被称为 **构造器** 的静态方法：

```js
const Container = function(x) {
  this.__value = x
}

Container.of = function(x) {
  return new Container(x)
}
```

构造器暂时可以认为是将数据放入进容器的一种方式（这个过程的本质是将数据封装在一个上下文中），现在把 `'A'` 放入进容器：

```js
Container.of('A')
// 在 Chrome 中输出： Container {__value: "A"}
```

数据 `'A'` 通过构造器转化成了 `Container` 类型的对象，而这个过程对我们来说似曾相识。重新回到最初的 `string` 类型转化，是否发现两者非常相似：

```js
let str = 'some text'
// 隐含了一次数据转化成对象的过程
// let str = new String('some text')
let sub_str = str.substring(2)
// 对比
let cstr = Container.of('some text')
```

其实不仅仅这两者非常相似，放飞思维大胆想象，数据和她的容器 Promise，流和她的容器 Observable，Redux 中 state 和她的容器 Store ，这些我们熟悉的概念都是来自于此。

让我们收回想象力继续按部就班的分析，当 `string` 基础类型转化为对象后，拥有了 `substring` 方法，那么基础类型数据放入进容器后是否也具有了一些方法？这就需要介绍另外一种容器 —— **functor** 。

## 函数和 functor

这里提及的函数与编程中所定义的函数不同，它是数学意义上的函数，是一个从定义域到值域的映射，在编程中我们通常把它称为 **纯函数** 。

> 纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

所谓的映射是一种特殊关系，即一个输入值只能返回一个对应输出值。平时对数据的映射操作我们已经驾轻就熟：

```js
function greet(name) {
  return `hello ${name}`
}

console.log(greet('A'))
```

通过 `greet` 这个纯函数，把输入值 `'A'` 映射为输出值 `'hello A'` 。现在我们将数据提升（lift）至容器，也就是一个输入容器得到一个对应输出容器，`greet` 函数是否依然成立：

```js
console.log(greet(Container.of('A')))
// => hello [object object]
```

看来对数据的操作与对容器的操作是不一样的，当然你也许认为可以将容器退化至数据然后再提升：

```js
console.log(Container.of(greet(Container.of('A').__value))))
```

好想法，我们把 `greet` 函数一般化并将她作为参数交给容器的某个方法，就叫 `map` 吧:

```js
Container.prototype.map = function(f) {
  return Container.of(f(this.__value))
}
```

容器有新方法，还等什么赶紧拿来用用看：

```js
Container.of('A').map(greet)
// => Container {__value: "hello A"}
```

完美，我们不离开 `Container` 的情况下操作了容器里的值。也许你还会问难道处理容器里面的值只能使用 `map` 方法吗？ `map` 的英文含义就是映射，具体的方法由参数 `f` 给出，`map` 是函数概念的具体实施，这也是为什么我们把这种容器成为 functor 的原因，它是拥有函数（function）能力的容器。

> functor 是实现了 map 方法的容器。

是否又到了头脑风暴的时间了，没错，Redux 的 dispatch 方法和 RxJS 的操作符都是 `map` 方法的别称。现在感觉到 functor 的神奇嘛，接下来让神奇继续，增强 functor 的鲁棒性。

## Maybe

不难看出映射方法 `f` 在某些数据上会出错：

```js
function greet(name) {
  return `hello ${name.split(' ')[0]}`
}

Container.of('Donald Trump').map(greet) // ok
Container.of().map(greet) // error
```

对此无法针对每一种出错进行预防，只能做最基础的检查，本节我们只对空值进行处理。让我们在容器中添加一个新的方法，用来判断容器里的数据是否为空：

```js
Container.prototype.isNothing = function() {
  return this.__value === null || this.__value === undefined
}
```

现在容器里又多了一个方法 `isNothing` ，它可以通知我们容器里的数据是否为空，我们利用这个方法增强 `map` 函数的适用性，摆脱空值对程序的扰动：

```js
Container.prototype.map = function(f) {
  return this.isNothing() ? Container.of(null) : Container.of(f(this.__value))
}
```

再来试试本节的第一程序，这次没有报错顺利的执行了。为了区分容器种类增加辨识度，我们把这种容器的标识符改为更有含义的 `Maybe`：

```js
const Maybe = function(x) {
  this.__value = x
}

Maybe.of = function(x) {
  return new Maybe(x)
}

Maybe.prototype.isNothing = function() {
  return this.__value === null || this.__value === undefined
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}
```

在数据库查询和网络访问时，除了异常之外，还有可能返回空值， `Maybe` 让我们避免了 `if(x !== null) { return f(x)}` 这样命令式语句的使用。既然已经提到数据库查询和网络访问数据，那么应该介绍处理类似副作用的 functor 了 —— `IO` 。

## IO


