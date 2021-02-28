import { green, grey, blue, cyan, enable, disable } from 'colors/safe'

export type LogOptions = {
  color: boolean,
  depth: number,
  prefix: string
}

export default function log(el: any, options: Partial<LogOptions> = {}) {
  const color = options.color ?? true
  const depth = options.depth ?? Infinity
  const prefix = options.prefix ?? ''

  color ? enable() : disable()

  // if is root
  if (el.type === 'root') {
    for (const node of el.childNodes) {
      log(node, { ...options, prefix: prefix + '  ', depth: depth - 1 })
    }

  // print text
  } else if (el.type === 'text') {
    console.log(el.data.trim().split('\n').map((line: string) => green(prefix + line)).join('\n'))

  // autoclode tags
  } else if (isAutocloseTag(el)) {
    console.log(prefix + blue(`<${el.tagName}`) + props(el) + blue('/>'))

  // empty content
  } else if (el.childNodes.length === 0) {
    console.log(prefix + blue(`<${el.tagName}`) + props(el) + blue(`></${el.tagName}>`))

  // limited content
  } else if (depth <= 0) {
    console.log(prefix + blue(`<${el.tagName}`) + props(el) + blue(`>`) + grey('...') + blue(`</${el.tagName}>`))

  } else {
    // print open tag
    console.log(prefix + blue(`<${el.tagName}`) + props(el) + blue(`>`))

    // print each children node
    for (const node of el.childNodes) {
      log(node, { ...options, prefix: prefix + '  ', depth: depth - 1 })
    }

    // print close tag
    console.log(prefix + blue(`</${el.tagName}>`))
  }
}

// print resolve props
function props(el: any) {
  const attrs = Object.keys(el.attribs).sort()
  if (attrs.length === 0) {
    return ''
  }

  return ' ' + attrs.map((attr: string) => {
    const value = el.attribs[attr]
    if (value === '') {
      return cyan(attr)
    } else {
      return cyan(`${attr}=`) + green('"' + value + '"')
    }
  }).join(' ')
}

function isAutocloseTag(el: any) {
  switch (el.tagName) {
    case 'area':
    case 'base':
    case 'br':
    case 'col':
    case 'embed':
    case 'hr':
    case 'img':
    case 'input':
    case 'link':
    case 'meta':
    case 'param':
    case 'source':
    case 'track':
    case 'wbr':
    case 'command':
    case 'keygen':
    case 'menuitem':
      return true

    default:
      return false
  }
}
