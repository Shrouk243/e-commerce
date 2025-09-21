"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, registerSchemaType } from '@/Schema/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"



export default function Register() {
  const router = useRouter ()

  const form = useForm <registerSchemaType>({
    defaultValues :{
name : "" ,
email : "" ,
password : "" ,
rePassword : "" ,
phone : "" , 
    },
    resolver:zodResolver (registerSchema)
  });

async function handleRegister (values : registerSchemaType) {
try {
  const res =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
if (res.data.message === "success"){
    toast.success("Your Registerd Successfully"  , {position:'top-center' ,duration :3000 })
router.push('/login')

}}

catch (err) {
    const error = err as AxiosError<{ message: string }>;
  toast.error( error.response?.data?.message  , {position:'top-center' ,duration :3000 })
}
}

  return (
    <>
    <div className='w-1/2 mx-auto my-12'>
    <h1 className='text-center text-3xl font-bold my-4 '> Register Now </h1>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(handleRegister)}>
    <FormField
    control={form.control}
    name="name"
    render={({field}) => (
      <FormItem>
        <FormLabel > Name : </FormLabel>
        <FormControl>
          <Input {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}  />
  <FormField
    control={form.control}
    name="email"
    render={({field}) => (
      <FormItem>
        <FormLabel > Email : </FormLabel>
        <FormControl>
          <Input type='email' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}  />
    <FormField
    control={form.control}
    name="password"
    render={({field}) => (
      <FormItem>
        <FormLabel > Password : </FormLabel>
        <FormControl>
          <Input type='password' {...field}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}  />
    <FormField
    control={form.control}
    name="rePassword"
    render={({field}) => (
      <FormItem>
        <FormLabel > RePassword : </FormLabel>
        <FormControl>
          <Input type='password' {...field}/>
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
    <Button className='my-4 cursor-pointer w-full'>Register Now</Button>
  </form>
</Form>
    </div>
    </>
  )
}
