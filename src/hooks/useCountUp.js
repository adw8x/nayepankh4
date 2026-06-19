import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let animationId
    let startTime

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [target, duration])

  return count
}
