"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type LazyRenderProps = {
  children: ReactNode
  rootMargin?: string
  once?: boolean
  placeholder?: ReactNode
  className?: string
  placeholderClassName?: string
  id?: string
}

/**
 * Lazily renders children once they are about to enter the viewport.
 * This keeps the initial DOM lighter and speeds up the first paint for large pages.
 */
export function LazyRender({
  children,
  rootMargin = "0px 0px 200px 0px",
  once = true,
  placeholder,
  className,
  placeholderClassName,
  id,
}: LazyRenderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    if (hasIntersected) return
    const node = containerRef.current
    if (!node) return

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setHasIntersected(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasIntersected(true)
            if (once) {
              observer.disconnect()
            }
          }
        })
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasIntersected, once, rootMargin])

  const defaultPlaceholder = placeholderClassName ? (
    <div className={`w-full rounded-3xl bg-gray-100/70 animate-pulse ${placeholderClassName}`} aria-hidden="true" />
  ) : null

  return <div id={id} ref={containerRef} className={className}>{hasIntersected ? children : placeholder ?? defaultPlaceholder}</div>
}

