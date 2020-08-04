# typescript

> 参考链接：
>
> https://www.tslang.cn/index.html

typescript是javascrip类型的超集，它可以编译成javascript。

可以理解为它是js的一个库，有了这个库，你就可以对js进行类型检查，但是你要按照这个库提供的API完成代码。

也可以理解为一个框架，就像react，react是可以书写jsx来完成页面，而不是html，但是你就要改变原先写代码的方式，改为由数据控制页面；而ts是可以使我们完成具有强类型校验的代码，同样，他也需要我们改变原先写代码的方式，改为先声明数据格式，再去使用数据。

### 类型

#### 强类型 VS 弱类型

强类型语言对类型有较强的约束，比如，不允许类型进行隐式转换，语言层面限制函数的实参类型必须与形参类型相同。

弱类型语言对类型的约束几乎没有，比如，可以通过变量赋值随意修改变量类型，比如函数的参数可以随意传递。

两者相比，强类型语言避免了变量隐式转换所带来的隐藏bug，是编码过程更规范；弱类型语言使语言学习成本下降，简单紧凑。

#### 静态语言 VS 动态语言

静态语言，如java等，都需要进行编写-编译-链接-运行这四个过程，在完成代码之后，必须通过编译才能执行，这个编译的过程中就包含了对变量类型的检查。所以在静态语言中，声明一个类型的变量，后期是不允许对这个变量的类型进行隐式修改的。

动态语言，如javascript等，是一种解释型语言，需要与语言配套的解释器，在程序的运行过程中逐行进行解释。所以没有编译过程，就缺少对类型的检查，只有等执行的时候才明确变量类型，且这个类型是可以随意换换的。

因为没有了编译规程和编译相关的环境，只需要一个解释器就可以运行，动态语言的代码能够被实时生成和执行，在多平台都能运行。

#### 解决方案

因为javascript的语言特性，使得javascript代码一般都很“飘逸”，这对于项目维护来说是非常不利的，于是，很多人提出了各式各样的方案来规避

* eslint，对语言格式进行约束，只是限制了一些不好的语言编写特性，无法限制类型转换
* flow，对类型进行约束
* typescript，与flow相同，但是相关生态更加健全

### typescript使用

简要说明一下typescript在项目中

#### 安装

typescript可以通过多种方式继承到项目中

* 全局安装：` npm install -g typescript`，然后`tsc`命令编译
* 项目安装：` npm install typescript --dev`，然后项目目录下`tsc`命令编译
* webpack编译typescript：`npm install --save-dev typescript ts-loader`，配置`ts-loader`
* 另外，一些脚手架中也会自带对typescript的支持，比如vue3.0，umi3.0等

安装以后，可以通过配置文件对编译时的操作进行配置

#### 类型声明

通过`变量: 类型`来对变量进行类型声明

### typescript类型

不同的类型声明方式不同

#### 基础类型

```typescript
const str: string = 'str'

const num: number = 100 // NaN Infinity

const bool: boolean = true // false

const und1: void = undefined

const nul: null = null

const und2: undefined = undefined
```

#### 特殊类型

```typescript
// 对象，一般不这样声明，而是使用接口
const obj: {key1: string, key2: number} = {key1: '111', key2: 111}
// 数组，两种声明方式都可以，但是一般使用第一种，<T>,T为任意类型，泛型的写法
const arr: Array<number> = [1,2,3]
const arr: number[] = [1,2,3]
// 元组，规定了长度和每项的类型，与数组类似
const tuple: [number, string] = [18, '12']
// 枚举
// 从头自动匹配
enum enumData {
  a, // 0
  b, // 1 
  c, // 2
}
// 从某个元素自动匹配，只支持数字
enum enumData {
  a = 2, // 2
  b, // 3
  c, // 4
}
// 可声明
enum enumData {
  a = '1', // '1'
  b = '3', // '3' 
  c = '4', // '4'
}
// 声明枚举之后就可以通过键去访问值，也可以通过值去访问键 enumData[1] = 'a' enumData.a = 1
// 但是通过值去访问键这个功能会带来额外的编译
// 如果不需要通过值去访问键，那么就在enum前加上const
const enum enumData {
  a = '1', // '1'
  b = '3', // '3' 
  c = '4', // '4'
}
// 函数
function sum(a: number, b: number = 10, ...rest: Array<number>): number{
  return a + b
};
const sum: (a: number, b: number) => number = (a: number, b: number = 10) => {
  return a + b
}
// 任意
let foo: any = 'foo'
foo = 123
foo = true
```

#### 接口

```typescript
interface book {
	title: string; // 数名
	author: string; // 作者
	readonly pageSize: number; // 总页数  readonly 表示只读，即不能被外界修改
  money?: number; // 单价  ?表示可有可无，即string|undefined
  // 动态设置
  // [key: string] 表示，接收任意字符串为key，此处'key'可以为任意值
  // : string 表示，接收任意字符串位value
  [key: string]: string;
}
```

#### 类

```typescript
// 类的声明
class Person {
  // 声明属性
  public name: string // 公有属性，可省去不写
  private age: number // 私有属性，外界无法访问
  // protected 保护属性，允许在子类中访问  
  // readonly 表示只读属性，不可被修改
  protected readonly gender: boolean 
  
  constructor(name: string, age: number){
    // 上面不声明此处无法赋值
    this.name = name;
    this.age = age;
    this.gender = true
  }
  
  say(msg: string): void {
    console.log(msg)
  }
}

// 类实现接口
interface Eat {
	eat: (food: string): void;
}
interface Run {
	run: (distance: number): void;
}
//implements表示这个类要实现那些接口，','分隔
class Person implements Eat,Run {
  // 因为实现接口的原因，此处必须有这两个方法
  eat(food: string): void {
    console.log(food)
  }
  run(distance: number): void {
    console.log(distance)
  }
}

// 抽象类
// abstract 标识抽象类
abstract class Animal {
  // 因为实现接口的原因，此处必须有这两个方法
  eat(food: string): void {
    console.log(food)
  }
  // abstract 标识抽象类中的抽象方法
  abstract run(distance: number): void 
}

// 子类中具有eat方法
class Dog extends Animal {
  // 因为抽象类标识了抽象方法，所以必须实现
  run(distance: number): void {
    console.log(distance)
  }
}
```

#### 泛型

```typescript
// 泛型就是在编译期间不确定方法的类型(广泛之意思)，
// 在方法调用时，由程序员指定泛型具体指向什么类型。
// 泛型函数
// 使用<T>来表示这里使用泛型，调用的时候需要声明这个泛型，而且接下来的地方中都可以使用这个T来标明某个类型
function getMin<T>(arr: Array<T>): T{
  var min: T = arr[0];
  arr.forEach((value) => {
    if(value < min){
      min = value;
    }
  });
  return min;
}
 
console.log(getMin<number>([1, 3, 5, 7, 8]));
console.log(getMin<number>(["tom","jerry","jack","sunny"]));
```

### typescript应用

在编写代码之前先进行结构设计，明确自己所使用到的数据到底是什么

* 如果是普通类型，在函数中使用的一次性类型，就直接声明就可以
* 如果是具有某些逻辑的类型，一般是某个接口或者某个类，就需要在全局定义这个类型。

比如：你是用到的是一本书，那么这本书就有其对应的类型

```typescript
interface book {
	title: string; // 数名
	author: string; // 作者
	pageSize: number; // 总页数 
	...
}
```

如果这个类型影响到一个模块，那么就定义在模块内部，如果这个类型影响在全局，那么就定义在全局，使整个项目或者整个模块在某一种数据上，达到统一规范，也避免了重复声明

所以在编写ts之前，需要考虑项目中需要从全局考虑到项目中需要使用到的类型

