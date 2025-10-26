"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    endpoint: z.url({message: "Please enter valid url"}),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    body: z.string().optional()
    // Refine
})

export type FormType = z.infer<typeof formSchema>

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    defaultEndpoint?: string;
    defaultMethod?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    defaultBody?: string;
}

const HTTPRequestDialog = ({onOpenChange, open, onSubmit, defaultBody, defaultEndpoint, defaultMethod = "GET"}: Props) => {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            endpoint: defaultEndpoint ?? '',
            method: defaultMethod,
            body: defaultBody ?? ''
        }
    });

    const watchMethod = form.watch("method");
    const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod);

    useEffect(() => {
        if(open) {
            form.reset({
                endpoint: defaultEndpoint,
                method: defaultMethod,
                body: defaultBody
            })
        }
    }, [open, defaultBody, defaultEndpoint, defaultMethod, form])

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false)
    };

    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    HTTP Request
                </DialogTitle>
                <DialogDescription>
                    Configure settings for the HTTP Request
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 mt-4'>
                    <FormField
                        control={form.control}
                        name='method'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Method</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className='w-full'>
                                            <SelectValue placeholder="Select a method"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='GET'>GET</SelectItem>
                                        <SelectItem value='POST'>POST</SelectItem>
                                        <SelectItem value='PUT'>PUT</SelectItem>
                                        <SelectItem value='PATCH'>PATCH</SelectItem>
                                        <SelectItem value='DELETE'>DELETE</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    The HTTP method to use for this request
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='endpoint'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Endpoint URL</FormLabel>
                                <FormControl>
                                    <Input placeholder='https://api.example.com/users/{{httpResponse.data.id}}' {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Specify the API endpoint to call. You can use dynamic variables like {'{{httpResponse.data.id}}'}.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {showBodyField && (
                        <FormField
                            control={form.control}
                            name='body'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Request Body</FormLabel>
                                    <FormControl>
                                        <Textarea className='min-h-[120px] font-mono text-sm' placeholder={`{\n\t"userId": "{{httpResponse.data.id}}",\n\t"name": "John Doe",\n\t"email": "john@example.com"\n}`} {...field}/>
                                        </FormControl>
                                    <FormDescription>
                                        Define the request payload in JSON format. You can include dynamic variables like {'{{httpResponse.data.id}}'} to pass data between steps.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )}
                    <DialogFooter className='mt-4'>
                        <Button type='submit'>Save</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default HTTPRequestDialog
