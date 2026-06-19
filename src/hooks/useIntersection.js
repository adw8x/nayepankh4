import { useEffect, useRef, useState } from 'react'

export function useIntersection(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    if (hasTriggered.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        hasTriggered.current = true
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      ...options,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, options])

  return isVisible
}
