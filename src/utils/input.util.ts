export const resizeInput = (element: HTMLInputElement, className: string): void => {
  if (!element) return

  if (!element.value && element.getAttribute('placeholder')) {
    const span = document.createElement('span')
    span.textContent = element.getAttribute('placeholder')
    span.classList.add(className)
    element.parentElement?.appendChild(span)
    element.style.width = `${span.offsetWidth + 19}px` // offset plus padding
    span.remove()
  } else {
    let offset = 0
    const cs = getComputedStyle(element)

    element.style.width = '0'

    if (cs.boxSizing === 'border-box') {
      offset = element.offsetWidth
    } else if (cs.boxSizing === 'padding-box') {
      offset = element.clientWidth
    } else if (cs.boxSizing === 'content-box') {
      offset = parseFloat(cs.minWidth)
    }

    let width = Math.max(offset, element.scrollWidth - element.clientWidth)

    element.style.width = `${width}px`

    // To bulletproof, we will set scrollLeft to a
    // huge number, and read that back to see what it was clipped to
    // and increment width by that much, iteratively

    for (let i = 0; i < 10; i++) { // max iterations
      element.scrollLeft = 1e+10

      if (element.scrollLeft === 0) {
        break
      }

      width += element.scrollLeft

      element.style.width = `${width}px`
    }
  }
}
