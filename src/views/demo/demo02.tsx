import React, { PureComponent } from 'react'
//state   props

interface IProps {
  //类组件的props的约束类型
  name: string
  age?: number
}

interface IState {
  //类组件的state的约束类型
  message: string
  counter: number
}

interface ISnapshot {
  //getSnapshotBeforeUpdate函数的返回值的类型约束
  address: string
}

//在PureComponent的后面传入两个泛型，即为对类组件的props和state的约束
//实际上PureComponent后面还能有第三个泛型，是对getSnapshotBeforeUpdate函数的返回值的类型约束
class Demo02 extends PureComponent<IProps, IState, ISnapshot> {
  name = 'aaaa'
  state: IState = {
    message: 'hello world',
    counter: 99
  }

  constructor(props: IProps) {
    super(props)

    // this.state = {
    //   message: 'hello world',
    //   counter: 100
    // }
  }

  getSnapshotBeforeUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>
  ) {
    return {
      address: '洛杉矶'
    }
  }

  render(): React.ReactNode {
    return (
      <div>
        name:{this.props.name}
        age:{this.props.name}
        message:{this.state.message}
        counter:{this.state.counter}
      </div>
    )
  }
}

export default Demo02
