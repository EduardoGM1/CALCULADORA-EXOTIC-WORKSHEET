import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react"
import { formatUsd } from "@/lib/calculator/format"

const fieldClassName =
  "h-12 w-full rounded-lg border border-[#D7E7E2] bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-[#143F46] focus:ring-4 focus:ring-[#EAF4F1]"

type FieldProps = {
  label: ReactNode
  children: ReactNode
  hint?: string
}

export function Field({ label, children, hint }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[#143F46]">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-[#5B7776]">{hint}</span> : null}
    </label>
  )
}

export function ReadonlyValue({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold text-[#143F46]">{label}</span>
      <div className="flex h-12 items-center rounded-lg border border-[#D7E7E2] bg-[#F7FBF9] px-3 text-sm font-medium text-[#143F46]">
        {typeof value === "number" ? formatUsd(value) : value}
      </div>
    </div>
  )
}

export function SelectControl(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldClassName} ${props.className ?? ""}`} />
}

export function NumberControl({
  prefix,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { prefix?: string }) {
  return (
    <div className="relative">
      {prefix ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#5B7776]">
          {prefix}
        </span>
      ) : null}
      <input
        type="number"
        {...props}
        className={`${fieldClassName} ${prefix ? "pl-8" : ""} ${props.className ?? ""}`}
      />
    </div>
  )
}
