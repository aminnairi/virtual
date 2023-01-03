export const style = (styles) => {
  return Object.entries(styles).filter(([styleName, style]) => {
    return style !== undefined && style !== null
  }).map(([styleName, style]) => {
    return `${styleName}: ${style}`
  }).join(";")
}

export const classes = (classNames) => {
  return Object.entries(classNames).filter(([className, isAccepted]) => {
    return isAccepted
  }).map(([className]) => {
    return className
  }).join(" ")
}
