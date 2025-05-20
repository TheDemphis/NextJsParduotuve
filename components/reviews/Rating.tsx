import { FaStar, FaRegStar } from 'react-icons/fa'
function Rating({ rating }: { rating: number }) {
  const prodRating = Array.from({ length: 5 }, (_, i) => i + 1 <= rating)
  return (
    <div className="flex gap-x-2 items-center">
      {prodRating.map((rate, i) => {
        const classname = `h-3 w-3 ${rate ? 'text-primary' : 'text-gray-400'}`
        return rate ? (
          <FaStar key={i} className={classname} />
        ) : (
          <FaRegStar key={i} className={classname} />
        )
      })}
    </div>
  )
}
export default Rating
