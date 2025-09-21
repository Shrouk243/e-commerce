"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import {checkoutSchemaType,checkoutSchema } from "@/Schema/checkout.schema"
import onlinePayment from '@/checkoutactions/onlinecheckout.action'


export default function CheckOut() {
const {id} : {id: string} = useParams()



  const form = useForm <checkoutSchemaType>({
    defaultValues :{
 
        details: "",
        phone: "",
        city: ""


    },
    resolver:zodResolver (checkoutSchema)
  });




async function handleCheckOut(values: checkoutSchemaType) {
  try {
    const res = await onlinePayment(id, "", values);

 if (res.status === "success") {
      window.location.href = res.session.url; 
    } else {
    }


  } catch {
  }
}






  return (
    <>
    <div className='w-1/2 mx-auto my-12'>
    <h1 className='text-center text-3xl font-bold my-4 '> CheckOut Now </h1>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(handleCheckOut)}>
   
  <FormField
    control={form.control}
    name="details"
    render={({field}) => (
      <FormItem>
        <FormLabel > Details : </FormLabel>
        <FormControl>
          <Input type='text' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}  />
    <FormField
    control={form.control}
    name="phone"
    render={({field}) => (
      <FormItem>
        <FormLabel > Phone : </FormLabel>
        <FormControl>
          <Input type='tel' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}  />
    <FormField
    control={form.control}
    name="city"
    render={({field}) => (
      <FormItem>
        <FormLabel > City : </FormLabel>
        <FormControl>
          <Input type='text' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}  />
   
    <Button className='my-4 cursor-pointer w-full'>Pay Now</Button>
  </form>
</Form>
    </div>
    </>
  )
}
