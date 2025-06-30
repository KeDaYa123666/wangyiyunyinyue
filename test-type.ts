//定义 函数调用签名
interface IFnCall {
  <TWhy>(fn: () => TWhy, age: number): string
}

//定义函数对象
const foo: IFnCall = function (fn, age) {
  return 'aaaa'
}

//调用函数
foo<number>(() => {
  return 123
}, 18)

//不传入明确的调用时的泛型，类型推断
foo(() => {
  return 123
}, 18)
