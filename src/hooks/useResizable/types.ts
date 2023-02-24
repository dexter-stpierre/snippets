export type SplitterProps = React.HTMLProps<HTMLDivElement>

export type Resizable = {
  /**
   * border position
   */
  size: number
  /**
   * whether the border is dragging
   */
  isDragging: boolean
  /**
   * props for drag bar
   */
  splitterProps: SplitterProps
}

export type UseResizableProps = {
  /**
   * direction of resizing
   */
  axis: 'x' | 'y'
  /**
   * initial border position
   */
  initial?: number
  /**
   * initial border position
   */
  cacheKey: string
  /**
   * minimum border position
   */
  min?: number
  /**
   * maximum border position
   */
  max?: number
  /**
   * calculate border position from other side
   */
  reverse?: boolean
  /**
   * callback when border position changes start
   */
  onResizeStart?: () => void
  /**
   * callback when border position changes end
   */
  onResizeEnd?: () => void
}
