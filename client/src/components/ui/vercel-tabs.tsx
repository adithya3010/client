"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "../../lib/utils";

interface Tab {
  id: string
  label: string
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, activeTab, onTabChange, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [hoverStyle, setHoverStyle] = useState({})
    const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
    const tabRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
      if (hoveredIndex !== null) {
        const hoveredElement = tabRefs.current[hoveredIndex]
        if (hoveredElement) {
          const { offsetLeft, offsetWidth } = hoveredElement
          setHoverStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          })
        }
      }
    }, [hoveredIndex])

    useEffect(() => {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }, [activeIndex])

    useEffect(() => {
      requestAnimationFrame(() => {
        const firstElement = tabRefs.current[0]
        if (firstElement) {
          const { offsetLeft, offsetWidth } = firstElement
          setActiveStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          })
        }
      })
    }, [])

    return (
      <div 
        ref={ref} 
        className={cn("relative", className)} 
        {...props}
      >
        <div className="relative flex space-x-[12px] items-center">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              className={cn(
                "px-6 py-4 cursor-pointer h-[48px]",
                index === activeIndex 
                  ? "text-[#0e0e10] dark:text-white border-b-2 border-[#0e0f11] dark:border-white" 
                  : "text-[#0e0f1199] dark:text-[#ffffff99]"
              )}
              onClick={() => {
                setActiveIndex(index)
                onTabChange?.(tab.id)
              }}
            >
              <div className="text-2xl font-bold leading-7 whitespace-nowrap flex items-center justify-center h-full">
                {tab.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
Tabs.displayName = "Tabs"

export { Tabs }
