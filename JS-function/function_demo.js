//javascript深入理解函数
//一、函数声明方法
//1.function 函数声明语句
/*
function add(a,b){
    return a+b;
}
console.log(add(1,2));

//2.函数表达式
var add = function (a,b) {
    return a+b;
}
console.log(add(3,2));

//3.构造函数
//Function 关键字 前面参数为函数形参，最后一个参数为返回值

var add = new Function("a","b","return a+b");
console.log(add(5,6));
*/
/*---------------------------------------------------------------------------------------------------------*/
//二、函数传参
//函数调用时可以传入任意多个实参，函数定义时也可以定义任意多个形参
/*
// 示例一
function func1() {
    // 通过arguments获取函数实参列表
    console.log(arguments);
}  
func1(1,"a",{"name":"apple"});

// 示例二
function func2(a,b,c) {
    // 当传入实参个数小于形参个数时，其余值为undefined
    console.log(a,b,c);
}
func2(1,2);
*/
/*---------------------------------------------------------------------------------------------------------*/

/*三、函数传参的类型
数据类型分为基本数据类型和引用数据类型
基本数据类型：变量中直接存储数据的值，例如Number、String、Boolean、undefined、null
引用数据类型：变量中存储的是数据的地址，获取变量内容时，通过数据的地址查找到相应位置的数据，例如Object等
函数传入实参为基本数据类型时，通过传值的形式，将数据的值复制一份给形参
函数传入实参为引用数据类型时，通过传址的形式，将数据的地址复制一份给形参*/
/*
// 传值：函数内修改形参不影响函数外变量
var num = 0;
function setNum(n) {
    n = 100;
    console.log(n); // 100
}
setNum(num);
console.log(num); // 0

// 传址：函数内修改形参可能会影响函数外变量  
// 案例一  
var person = {
    name:"alex",
    age:18
}
function setAge(obj) {
    obj.age = 20;
    console.log(obj.age);  // 20
}
setAge(person); 
console.log(person.age); // 20

// 案例二
var person = {
    name:"alex",
    age:18
}
function setAge(obj) {
    obj = {
    name:"apple",
    age:33
}
    console.log(obj.age);  // 33
}
setAge(person); 
console.log(person.age); // 18
//传址：函数实参person-》复制person地址给函数形参obj
//下一步中
//案例一：函数形参中存储的是person对象的地址，通过地址找到person对象，修改age
//案例二：函数形参中存储的地址被修改为新对象的地址，故现在obj变量与person变量无关，obj变量存储的地址为新对象地址。
*/
/*---------------------------------------------------------------------------------------------------------*/

//四、函数重名
/*js中没有函数重载一说法，因为形参和实参没有个数和类型限制
如果函数重名时，在非严格模式下最后定义的同名函数会覆盖前面定义；严格模式下回报错*/
/*
function add(a,b) {
    console.log("add1");
    return a+b;
}
function add() {
    console.log("add2");
    return arguments[0]+arguments[1];
}
add();

//函数重载案例
//add函数可以求和，可以不传入参数，可以传入列表求和，可以传入参数求和
function add() {
    //1. 如果没有参数，不用计算
    if(!arguments.length){
        return 0;
    }else{
        var arr = null;
        //2. 如果第一个参数为一个数组，计算数组元素和
        if(Array.isArray(arguments[0])){
            arr = arguments[0];
        }else{
            arr = Array.apply(null,arguments);
            console.log(arr)
        }
        // 求和：下面这一步等价于for循环求和
        // reduce作用 遍历arr数组，将所有值累加起来
        // total代表上一步总值，num当前元素值
        var result = arr.reduce(function(total,num){
            return total + num;
        })
        return result;
    }
}
console.log(add());
console.log(add([1,2,6,7]));
console.log(add(1,2,134));
*/
/*--------------------------------------------------------------------------------------------------------------------*/

//函数返回值
//函数中没有return语句时，默认返回undefined
//return 可以返回任意值

// 没有return语句，默认返回undefined
function func1(a,b) {
    var c = a / b;
}
// console.log(func1(1,2));

// return可以返回一个任意类型的值
function func2(a,b) {
    return a+b;
}
// console.log(func2(1,3));
/*new语句的函数返回值
如果使用new一个函数对象，其return不为对象或者没有返回值时，默认为一个constructor构造函数对象。*/
/*
// new一个函数时，返回值为一个对象
function func3(a,b) {  
    var c = a + b;
}
var func = new func3();  //这个括号可以省略
console.log(func); // 返回值为一个

function func4(a,b) {  
    var c = a + b;
    return {
        "a":111
    }
}
var func = new func4();  //这个括号可以省略
console.log(func); // 返回值为一个
*/
/*特例
一般return语句指向完毕后，就不会执行后面语句
但是如果有try{}catch(){}语句时，会有特殊情况发生*/
/*
// 案例1：当语句中有错误时，不会向后执行return语句
function func(){
    try{
        var a = 1;
        console.log(b);  // 报错，跳转到catch部分
        return 0;
    }catch(err){
        console.log(err);  // ReferenceError: b is not defined
        return 1;
    }
}
console.log(func()); // 1

// 案例二：有finally时，try语句中return不会生效
function func1() { 
    try{
        var a = 1;
        return 0;
    }catch(e){
        console.log(e);
        return 1;
    }finally{
        return 2;
    }
}
console.log(func1());  // 2  
*/
/*--------------------------------------------------------------------------------------------------------------------*/

//函数调用方法
//直接调用
//直接使用函数名+小括号就可以调用函数
/*
// ()括号调用
function add(a,b) {
    return a+b;
}
// console.log(add(1,2));

// 对象方法调用
obj = {
    name:"alex",
    say:function(){
        console.log(this.name);
    }
}
// obj.say();

// new调用时，返回一个函数对象
var myFunc = new add;
console.log(myFunc);
*/
//间接调用
//主要有call()方法和apply()方法

/*
// 间接调用
// call(this指向的对象,参数1,参数2...)        
function add(a,b) {
    return a+b;
}
// 如果第一个参数为null，则this指向默认
console.log(add.call(null,1,3));


// apply(this指向的对象,[参数列表])
function sum(a,b,c) {
    return a+b+c;
}
const obj = {1:1}
console.log(sum.apply(undefined,[1,3,5]));
/*每个函数都有非继承的方法apply()和call()两个方法
当其第一个参数传入的为null,undefined时，函数this指向全局对象
严格模式下，必须指定值*/

/*--------------------------------------------------------------------------------------------------------------------*/
/*
//函数属性
//fn.length 返回函数形参的个数
//fn.name 返回函数名
//fn.prototype 返回函数原型，即函数的父对象

function add(a,b){
    return a+b;
}
console.log(add.length); // 2
console.log(add.name); // add
console.log(add.prototype);  // {constructor: ƒ} 

// 函数表达式，name返回变量名
var sum = function (a,b) {
    return a+b;
}
console.log(sum.name); // sum

// 具名函数时，name返回函数名
var hi = function hello() {
    // hello 函数名只能在函数内部使用，不能在外部使用
    console.log(hello.name);
    return 0;
}
// hello();  // 报错：07函数的属性.html:22 Uncaught ReferenceError: hello is not defined
hi();  // hello
console.log(hi.name); // hello
*/
/*--------------------------------------------------------------------------------------------------------------------*/

// 函数方法
// bind方法使用
// 用来给函数绑定this指向的对象

// bind是用来绑定this对象
// var name = "alex";
// var obj = {
//     name:"apple"
// }
// function fn() {
//     console.log(this.name);  // 默认this指向window
// }
// fn();  // alex
// var gn = fn.bind(obj);  // 将this指向obj对象
// gn(); // apple

// 案例二
// bind的第一个参数为this对象的指向，后面参数为函数的参数

function func1(name,age,fav) {
    var str = "my name is "+name+",I am "+age+",I like "+fav;
    console.log(str);
}
// 传入一个函数参数
var part1 = func1.bind(null,"alex");
part1(18,"comic");   // my name is alex,I am 18,I like comic
part1(22,"animation"); // my name is alex,I am 22,I like animation

// 传入两个函数参数
var part2 = func1.bind(null,"egon",22);
part2("html");   // my name is egon,I am 22,I like html
part2("javascript");   // my name is egon,I am 22,I like javascript

//这是函数式编程的一种–函数柯里化
//类似于python的偏函数

//call和apply的应用
//案例1：找出数组中的最大元素
// 1.找出数组的最大元素
function max(arr) {  
    // Math.max()  在传入参数中找到最大元素
    // 默认调用方法 Math.max(6,9,5)  返回9
    var res = Math.max.apply(null,arr);
    return res;
}
console.log(max([1,9,8,7,6,5])); // 9
//2.将类数组转换成真正的数组
// 例如：arguments类似于数组，但是很多数组方法不能使用，转换成为真正的数组
function toArr() {  // 功能：传入任意数量参数，返回一个数组
    var arr = Array.prototype.slice.call(arguments);
    return arr;
}
console.log(toArr('1',2,{name:'22'}))
/*数组原型上都有slice方法，slice切片可以获取数组一部分
例如：[1,2,3,4,5].slice(2,4) 返回[3,4]
不传入参数时，返回与原来一样元素的新数组（浅拷贝）
传入一个参数时，返回一个从该索引开始向后所有元素的数组
传入两个参数时，返回从起点到终点（不包括）之间的元素*/

//3.数组追加
//push方法，将参数一个一个插入到数组尾部
//使用方法arr1.push(6,8) 等价于下面操作

// 3.数组追加：将一个数组中所有元素插入到另一个数组尾部
function extend(arr1,arr2) {
    // 等价于arr1.push.apply(arr2);  arr1就地改变
    return Array.prototype.push.apply(arr1,arr2);
}
// arr1 = [1,2,3];
// arr2 = [6,8];
// console.log(extend(arr1,arr2)); // [1,2,3,6,8]
//类似于实现python列表的extend方法

//4.利用call和apply做继承
person = {
    name:"apple",
    age:18
}
function Info(name,age) {
    this.name = name;
    this.age = age;
    this.sayAge = function () {
        console.log(this.age);
    }
}
// 默认创建一个新对象
var egg = new Info("egg",15);
egg.sayAge()  // 15

// // 使用call修改this指向，使其修改person对象
console.log(person);  // {name: "banana", age: 20, sayAge: ƒ}
Info.call(person,"banana",20);
console.log(person);
person.sayAge(); // 20  

//5.apply方法修改函数调用方式
// apply方法修改函数调用方式
function Log() {
    console.log.apply(null,arguments); // 将该函数所有参数传递给console.log()去执行
}
Log("hello console.log"); //hello console.log