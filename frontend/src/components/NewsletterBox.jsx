import React from 'react'

export default function NewsletterBox() {

    const onSubmitHandler = (event) => {
        event.preventDefault();        
    }
    
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Подпишитесь сейчас & получите скидку 20%</p>
        <p className='mt-3 text-gray-400'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, aut.</p>
        <form onSubmit={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2'>
            <input className='w-full outline-none sm:flex-1' type="email" placeholder='Введите ваш email' required/>
            <button type='submit' className='px-10 py-4 text-xs text-white bg-black'>ПОДПИСАТЬСЯ</button>
        </form>
    </div>
  )
}
