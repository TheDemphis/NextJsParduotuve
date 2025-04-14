'use client'
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

const NavSearch = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  )
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams()
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`/products?${params.toString()}`)
  }, 300)
  useEffect(() => {
    if (!searchParams) {
      setSearch('')
    }
  }, [searchParams.get('search')])

  return (
    <Input
      placeholder="Ieškoti prekių.."
      className="max-w-xs dark:bg-muted"
      type="search"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
    />
  )
}
export default NavSearch
