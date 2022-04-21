import { IoMdClose } from "react-icons/io"
type Props = {
  tag: string
  onClose: (tag: string) => any
  className?: string
}

const Tag = ({ tag, onClose, className = "" }: Props) => {
  return (
    <div
      class={`flex text-[15px] rounded-sm items-center bg-light-grayish-cyan ${className}`}
    >
      <span class="px-2 rounded-l-sm">{tag}</span>
      <button
        onClick={() => {
          onClose(tag)
        }}
        class="bg-primary h-full rounded-r-sm aspect-square flex items-center justify-center"
      >
        {/* @ts-ignore: Unreachable code error */}
        <IoMdClose className=" text-xl  text-white" />
      </button>
    </div>
  )
}

export default Tag
