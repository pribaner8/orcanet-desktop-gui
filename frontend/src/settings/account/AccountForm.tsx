"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ChevronDown, Check } from "lucide-react"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast"
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { PasswordForm } from "./PasswordForm"
import React, { useState } from 'react';
const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  // dob: z.date({
  //   required_error: "A date of birth is required.",
  // }),
  language: z.string({
    required_error: "Please select a language.",
  }),
})

const LanguageSetting = () => {
  return (
    <div className="flex items-center mb-5">
      <span className="whitespace-pre">Language </span>
      <Globe />
      <div className="ml-5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="English" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="zh-TW">中文</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function AccountForm() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "Account Notification",
      description: "Your account information has successfully been updated! A confirmation email has been sent to your email address.",
    })
  }

  const { toast } = useToast();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          defaultValue="Bubble Guppies"
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field}/>
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      
      
      <PasswordForm />

        {/* <FormField
          control={form.control}
          defaultValue={new Date("2023-01-23")}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        
        <FormField
          control={form.control}
          defaultValue="English"
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="flex items-center space-x-2">
                Language<Globe />
              </FormLabel>
              <FormControl>
              <select
                className="w-[250px] border-2 rounded-lg text-foreground text-sm p-2 leading-tight focus:outline-none focus:shadow-outline bg-background"
                value={field.value}
                onChange={(e) => form.setValue("language", e.target.value)}
              >
                  <option value="" disabled>
                    Select language
                  </option>
                  {languages.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update account</Button>
      </form>
    </Form>
  )
}
