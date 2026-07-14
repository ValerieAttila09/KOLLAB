import type { LucideIcon } from 'lucide-react'

interface ValuesGridProps {
  items: Array<{
    title: string
    description: string
    icon: LucideIcon
  }>
}

const ValuesGrid = ({ items }: ValuesGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-grey text-brand-green">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-brand-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ValuesGrid
