'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import FormContainer from './FormContainer'
import { ImageInput } from './ImageInput'
import { SubmitButton } from './Buttons'
import { type actionFunction } from '@/utils/types'

type ImageInputProps = {
  name: string
  image: string
  action: actionFunction
  children: React.ReactNode
  text: string
}

function ImageInputContainer(props: ImageInputProps) {
  const { name, text, image, action } = props
  const [imageForm, setImageForm] = useState(false)

  return (
    <div className="mt-5">
      <Image
        src={image}
        alt={name}
        priority
        width={210}
        height={210}
        className="rounded-sm object-cover mb-3"
      />
      <Button
        variant="outline"
        onClick={() => setImageForm((set) => !set)}
        size="sm"
        className="mb-3"
      >
        {text}
      </Button>
      {imageForm && (
        <div className="mt-4">
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitButton size="sm" text={text} />
          </FormContainer>
        </div>
      )}
    </div>
  )
}
export default ImageInputContainer
