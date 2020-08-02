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
* 另外，一些脚手架中也会自带对typescript的支持，比如vue3.0，umi等

安装以后，可以通过配置文件对编译时的操作进行配置

####类型声明

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
// 对象

// 数组

// 元组

// 枚举

// 函数

// 任意

```

#### 接口

```typescript

```

#### 类

```typescript

```

#### 泛型

```typescript

```



###typescript应用

 

