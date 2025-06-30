import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import { useAppSelector, useAppDispatch, shallowEqualApp } from './store'
import { changeMessageAction } from './store/modules/counter'
import Demo02 from './views/demo/demo02'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

function App() {
  const { count, message, direction, names } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message,
      direction: state.counter.direction,
      names: state.counter.names
    }),
    shallowEqualApp
  )

  //事件
  const dispatch = useAppDispatch()
  function handleChangeMessage() {
    dispatch(changeMessageAction('hhhhh'))
  }

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading...">
        <div className="App">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />

      <Demo02 name="why" age={18} />
      <h2>当前计数：{count}</h2>
      <h2>当前信息：{message}</h2>
      <button onClick={handleChangeMessage}>修改msg</button>
    </div>
  )
}
export default App
