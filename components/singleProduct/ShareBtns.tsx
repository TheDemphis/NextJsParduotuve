'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../ui/button'
import { LuShare2 } from 'react-icons/lu'

import {
  EmailShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailIcon,
  LinkedinIcon,
  FacebookIcon,
} from 'react-share'

const ShareBtns = ({
  productId,
  name,
}: {
  productId: string
  name: string
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL
  const shareLink = `${url}/products/${productId}`
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} size="icon">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="flex gap-x-2 items-center justify-center w-full "
        sideOffset={15}
      >
        <FacebookShareButton url={shareLink} title={name}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <LinkedinShareButton url={shareLink} name={name}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  )
}
export default ShareBtns
