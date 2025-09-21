"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, loginSchemaForm } from '@/Schema/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import {signIn} from "next-auth/react"
import Link from 'next/link'

export default function Login() {

  const form = useForm <loginSchemaForm>({
    defaultValues :{
email : "" ,
password : "" ,
    },
    resolver:zodResolver (loginSchema)
  });

async function handleLogin (values :loginSchemaForm ) {

const response = await signIn ("credentials" ,{
  email : values.email ,
  password : values.password ,
  redirect :false ,
  callbackUrl : "/" ,
})

if (response?.ok) {
  toast.success("You LogedIn Successfully" ,{ position :"top-center" , duration : 3000 })
window.location.href ="/"
}
else {
  toast.error(response?.error ,{ position :"top-center" , duration : 3000 })
}


  
}


  return (
    <>
    <div className='w-1/2 mx-auto my-12'>
    <h1 className='text-center text-3xl font-bold my-4 '> Login Now </h1>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(handleLogin)}>
   
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
       <div className='flex justify-center'>

<Link href={`/forgotpassword`}><Button className=' hover:underline shadow-white cursor-pointer bg-white hover:bg-white text-red-700'>Forgot-Password?
        </Button></Link>


       </div>
    <Button className='my-4 cursor-pointer w-full'>Login Now</Button>
  </form>
</Form>
    </div>
    </>
  )
}
