import { Languages } from 'lucide-react'

import { useLanguage } from '@/app/language-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function LanguageSwitcher() {
  const { language, languages, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Language"
          className="h-10 gap-2 rounded-xl border border-border bg-background px-3 shadow-xs hover:bg-accent"
          variant="ghost"
        >
          <Languages className="h-4 w-4" />
          <span className="hidden text-sm sm:inline">
            {languages[language]?.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {Object.entries(languages).map(([value, item]) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={language === value}
            onCheckedChange={() => setLanguage(value)}
          >
            {item.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { LanguageSwitcher }
