import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Separator } from './separator'

describe('<Separator />', () => {
  const getSeparator = (container: HTMLElement) =>
    container.querySelector('[data-slot="separator"]') as HTMLElement

  it('renders with default props', () => {
    const { container } = render(<Separator />)
    const separator = getSeparator(container)

    expect(separator).toBeInTheDocument()
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    expect(separator).toHaveAttribute('data-slot', 'separator')
    expect(separator).toHaveAttribute('role', 'none')
  })

  it('renders with vertical orientation', () => {
    const { container } = render(<Separator orientation="vertical" />)
    const separator = getSeparator(container)

    expect(separator).toHaveAttribute('data-orientation', 'vertical')
  })

  it('is decorative by default', () => {
    const { container } = render(<Separator />)
    const separator = getSeparator(container)

    expect(separator).toHaveAttribute('role', 'none')
    expect(separator).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('applies custom class', () => {
    const { container } = render(<Separator className="my-custom-class" />)
    const separator = getSeparator(container)

    expect(separator).toHaveClass('my-custom-class')
  })

  it('sets decorative attribute to false', () => {
    const { container } = render(<Separator decorative={false} />)
    const separator = getSeparator(container)

    expect(separator).toHaveAttribute('role', 'separator')
  })
})
