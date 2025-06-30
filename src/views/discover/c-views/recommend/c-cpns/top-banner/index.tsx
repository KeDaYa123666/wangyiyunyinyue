import { shallowEqualApp, useAppSelector } from '@/store'
import React, { memo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { Carousel } from 'antd'
import { CarouselRef } from 'antd/lib/carousel'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanner: React.FC<IProps> = () => {
  //定义内部的数据
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<CarouselRef>(null)

  //从store中获取数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  //事件处理函数
  function handlePrevClick() {
    bannerRef.current?.prev()
  }

  function handleNextClick() {
    bannerRef.current?.next()
  }

  function handleAfterChange(current: number) {
    setCurrentIndex(current)
  }

  function handleBeforeChange() {
    currentIndex && setCurrentIndex(-1)
  }

  //获取背景图片
  let bgImageUrl
  if (currentIndex >= 0 && banners.length > 0) {
    bgImageUrl = banners[currentIndex]?.imageUrl
  }

  return (
    <BannerWrapper
      style={{
        // background: `url('${bgImageUrl}') center center / 6000px`
        position: 'relative', // 确保伪元素相对于 BannerWrapper 定位
        overflow: 'hidden' // 隐藏超出部分
      }}
    >
      {/* 伪元素用于背景模糊 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url('${bgImageUrl}') center center / 6000px`,
          filter: 'blur(10px)',
          WebkitFilter: 'blur(10px)', // 兼容 WebKit 浏览器
          zIndex: -1 // 确保背景在内容下方
        }}
      />
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            dots={false}
            effect="fade"
            ref={bannerRef}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
