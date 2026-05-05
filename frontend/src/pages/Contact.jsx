import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { toast } from 'react-toastify'

export default function Contact() {
  const handleVacanciesClick = () => {
    toast.info("Актуальные вакансии можно узнать по телефону или email")
  }

  return (
    <div>
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={'СВЯЗАТЬСЯ'} text2={'С НАМИ'} />
      </div>

      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px] rounded-lg' alt="Наша мастерская" />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='text-xl font-semibold text-gray-600'> Наша мастерская</p>
          <p className='text-gray-500'>
             г. Москва, ул. Тверская, д. 15<br />
             Пн-Вс: 10:00 – 20:00
          </p>
          <p className='text-gray-500'>
             +7 (495) 123-45-67<br />
            hello@chocolate.ru
          </p>
          
          <p className='mt-4 text-xl font-semibold text-gray-600'> Доставка и самовывоз</p>
          <p className='text-gray-500'>
            • Доставка по Москве — 300 ₽<br />
            • Самовывоз — бесплатно
          </p>
          
          <p className='mt-4 text-xl font-semibold text-gray-600'> Работа у нас</p>
          <p className='text-gray-500'>
            Хотите стать частью нашей команды?<br />
            Мы всегда рады кондитерам, курьерам и менеджерам.
          </p>
          <button 
            onClick={handleVacanciesClick}
            className='px-8 py-3 text-sm transition-all duration-300 border border-black hover:bg-black hover:text-white'
          >
            Узнать о вакансиях
          </button>
          
          <p className='mt-2 text-sm text-gray-400'>
            Или напишите нам: <span className='font-medium'>hr@chocolate.ru</span>
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}