import { FC, memo } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'

const MemoizedReactMarkdown: FC<Options> = memo(ReactMarkdown, (prevProps, nextProps) => {
  const childrenChanged = prevProps.children !== nextProps.children
  const classNameChanged = prevProps.className !== nextProps.className
  return childrenChanged || classNameChanged
})

export default MemoizedReactMarkdown
