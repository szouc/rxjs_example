> 一生二，二生三，三生万物。

## null

起初，只有 null 孤零零的生活在 javaScript 的世界中，他无色无味，无量无体，人类穷尽所有的方法也无法感知他的存在，他是真正的超越了康德的哲学作为 **空** 存在于世。

## 两个基础对象

而后也不知经历了多少岁月，在 javaScript 的世界中多了两个对象，一个我们称他为 `ObjectPrototype` ，它来自于 null ，不要怀疑正如空可以分解成正反物质那样， null 也繁衍出了 `ObjectPrototype` 。证据就是在 `ObjectPrototype` 对象中 `__proto__` 属性指向他的祖先 null 。

![ObjectPrototype.png](http://upload-images.jianshu.io/upload_images/5518635-98dc3f69577a677c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`ObjectPrototype` 继续繁殖出了下一代的对象 `FunctionPrototype` 。而这个子对象的 `__proto__` 也忠实的指向了他的父对象。

![FunctionPrototype.png](http://upload-images.jianshu.io/upload_images/5518635-f0c4ec4a873ac4e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 第一个内置函数对象 Function

通过不懈的努力，我们天才般的归纳出对象就是键值对的集合。而当一个事物的本质被挖掘出后，意味着我们不仅看穿了它而且还可以轻易地制造它。很快我们就发明了 `Function` 对象，它可以制造出很多新对象，并且这些新对象可以通过自身的 `__proto__` 属性访问到 `FunctionPrototype` 对象。

![Function.png](http://upload-images.jianshu.io/upload_images/5518635-13fbf6ede7ca6c35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

哪里好像不对，总是不舒服。 为什么 `Function` 制作的对象访问八竿子打不着的 `FunctionPrototype` ？ 原因就是复用，`FunctionPrototype` 中存放着所有 `Function` 对象都需要调用的方法和属性。这么看来需要在 `FunctionPrototype` 和 `Function` 之间建立联系。还好实现起来比较简单，在 `Function` 对象中设置一个新的属性 `prototype` ， 让这个新属性指向 `FunctionPrototype` 对象。

![Function_prototype.png](http://upload-images.jianshu.io/upload_images/5518635-9bf44e47ad39f5f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

至此我们的想法是否正确，根据上图来验证一下吧：

```js
Function.prototype.__proto__.__proto__ == null // true
```

## 第二个内置函数对象 Object

与 `Function` 类似。我们创建一个新的函数对象 `Object` ，通过 `Object` 制造出的所有新对象都可以访问 `ObjectPrototype` ，具体内容和上节相同，就不再复述，直接给图：

![Object_prototype.png](http://upload-images.jianshu.io/upload_images/5518635-966464b2f7ca1145.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可能现在你还没有察觉，上段内容的重点是第一句话：_与 `Function` 类似_ 。`Object` 和 `Function` 具有类似的功能，而这些类似的功能我们将他们放在 `Function.prototype` 对象内共享。剩下的就是如何在 `Object` 与 `Function.prototype` 之间建立联系了？答案上节已经告诉我们了，`Function` 构建的新对象，可以通过自身 `__proto__` 属性访问到 `Function.prototype` 对象。是的，`Object` 就是 `Function` 构建的一个新函数：

![ObjectFunction.png](http://upload-images.jianshu.io/upload_images/5518635-8b8d673e1dc06c33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

继续验证：

```js
Object.__proto__ === Function.prototype // true
```

## 验证：自己定义一个函数对象

```js
const MyFn = new Function('a', 'b', 'return a + b')

console.log(MyFn.__proto__ === Function.prototype) // true

MyFn.prototype.sub = function(x, y) {
  return x - y
}
const myFunction = new MyFn()
myFunction.sub(5, 2)

console.log(MyFn.prototype.__proto__ === Object.prototype) // true
console.log(myFunction.__proto__ === MyFn.prototype) // true
```

![myFn.png](http://upload-images.jianshu.io/upload_images/5518635-6f8b7ccfd227c594.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

为了更加清楚地展示，把 `Function` 和 `Object` 的关系连线去掉：

![MyFn2.png](http://upload-images.jianshu.io/upload_images/5518635-f7171e7fcb7b41ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

分析其他的内置函数对象（如 `Array`） 与 `Function` 和 `Object` 的关系，只需将这节的 `MyFn` 函数标识符替换为 `Array` 即可。
