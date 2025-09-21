"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import Image from 'next/image';
import { CategoryType } from './../../../types/Category.type';

export default function CategorySwiper({data} : {data:CategoryType[]}) {
  return (
    <>
    <h1 className='text-slate-500 font-semibold mx-[200px] my-2'>Shop Popular Categories</h1>
    <div className="w-[80%] mx-auto">
       <Swiper
      spaceBetween={0}
      slidesPerView={7}
      modules={[Autoplay]}
      autoplay = {{delay:2000}}
    >
     {data.map((category :CategoryType)=>  (<SwiperSlide key={category._id}>
      <Image alt='photo'
      width={100}
      height={100}
       src={category.image} className='w-full object-cover h-[150px] '
     />
          <p className='text-center font-bold'>{category.name}</p>

     </SwiperSlide>

    ))}

    </Swiper>
    </div>
    
    </>
    )
}
