import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

export default function CartTotal({ deliveryType = "delivery" }) {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
    
    const subtotal = getCartAmount() || 0
    // Доставка только если выбран тип "delivery"
    const shipping = (deliveryType === "delivery" && subtotal > 0) ? delivery_fee : 0
    const total = subtotal + shipping

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'ИТОГО'} text2={'В КОРЗИНЕ'}/>
            </div>
            
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Сумма</p>
                    <p>{currency} {subtotal.toFixed(2)}</p>
                </div>
                
                {deliveryType === "delivery" && (
                    <>
                        <hr />
                        <div className='flex justify-between'>
                            <p>Доставка</p>
                            <p>{currency} {shipping.toFixed(2)}</p>
                        </div>
                    </>
                )}
                
                <hr />
                <div className='flex justify-between font-bold'>
                    <b>Итого</b>
                    <b>{currency} {total.toFixed(2)}</b>
                </div>
            </div>
        </div>
    )
}