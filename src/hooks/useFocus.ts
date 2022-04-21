import { useRef } from "preact/hooks"

const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {
    /* @ts-ignore: Unreachable code error */
    htmlElRef.current && htmlElRef.current.focus()
  }

  return [htmlElRef, setFocus]
}

export default useFocus
