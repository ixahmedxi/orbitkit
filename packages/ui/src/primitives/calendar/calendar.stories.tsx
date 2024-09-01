import { useState } from 'react'

import type { ComponentProps } from 'react'

import { CalendarIcon } from '@radix-ui/react-icons'
import { type Meta, type StoryObj } from '@storybook/react'
import { addDays, format } from 'date-fns'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/primitives/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/primitives/popover'
import { cn } from '@/utils/cn'

import { Calendar } from '.'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select'

const meta: Meta<typeof Calendar> = {
  component: Calendar,
}

export default meta

type Story = StoryObj<typeof Calendar>

const DefaultCalendarExample = (props: ComponentProps<typeof Calendar>) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      {...props}
      mode='single'
      selected={date}
      onSelect={setDate}
      className='rounded-md border shadow'
    />
  )
}

const DatePickerExample = (props: ComponentProps<typeof Calendar>) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 size-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar {...props} mode='single' selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}

const DateRangePickerExample = (props: ComponentProps<typeof Calendar>) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className='grid gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 size-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            {...props}
            mode='range'
            defaultMonth={date?.from ?? new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const WithPresetsExample = (props: ComponentProps<typeof Calendar>) => {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 size-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='flex w-auto flex-col space-y-2 p-2'
      >
        <Select
          onValueChange={(value) => {
            setDate(addDays(new Date(), parseInt(value)))
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            {...props}
            mode='single'
            selected={date}
            onSelect={setDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const Default: Story = {
  render: (args) => <DefaultCalendarExample {...args} />,
}

export const DatePicker: Story = {
  render: (args) => <DatePickerExample {...args} />,
}

export const DateRangePicker: Story = {
  render: (args) => <DateRangePickerExample {...args} />,
}

export const WithPresets: Story = {
  render: (args) => <WithPresetsExample {...args} />,
}
