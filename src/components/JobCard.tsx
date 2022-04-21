import clsx from "clsx"
import { useState } from "preact/hooks"

export type JobCardProps = {
  company: string
  logo: string
  new?: boolean
  featured?: boolean
  position: string
  role: string
  level: string
  postedAt: string
  contract: string
  location: string
  languages: string[]
  tools: string[]
}

const Tag = ({ content }: { content: string }) => (
  <span class="bg-light-grayish-cyan py-1 px-2 mr-2 my-1 rounded-md">
    {content}
  </span>
)

const JobCard = ({
  company,
  logo,
  new: newJob = false,
  featured = false,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools,
}: JobCardProps) => {
  const [selected, setSelected] = useState(false)
  const handleClick = () => {
    setSelected((status) => !status)
  }
  return (
    <div
      onClick={handleClick}
      className={clsx([
        "flex relative flex-col mb-8 border-l-4 border-white px-3 py-4 pb-1",
        "sm:flex-row",
        "bg-white text-[15px] shadow-md rounded-md w-10/12",
        "sm:w-11/12",
        selected && "border-l-primary",
      ])}
    >
      <img
        class={clsx([
          "absolute w-12 top-0 -translate-y-1/2",
          "md:relative md:translate-y-0 md:my-auto md:mr-4",
        ])}
        src={logo}
        alt={`${company} logo`}
      />
      <div className="flex flex-col flex-1">
        <div className="flex mt-2 text-white">
          <span class="p-1 pl-0 text-primary">{company}</span>
          {newJob ? (
            <span class="ml-2 py-1 px-2 bg-primary rounded-full">NEW!</span>
          ) : (
            <></>
          )}
          {featured ? (
            <span class="ml-2 py-1 px-2 bg-very-dark-grayish-cyan rounded-full">
              FEATURED
            </span>
          ) : (
            <></>
          )}
        </div>
        <h1 class="text-very-dark-grayish-cyan font-bold mt-3">{position}</h1>
        <div class="text-very-dark-grayish-cyan/60 my-2">
          <span>{postedAt}</span>
          {" · "}
          <span>{contract}</span>
          {" · "}
          <span>{location}</span>
        </div>
      </div>

      <div
        className={clsx([
          "w-full h-[1px] bg-very-dark-grayish-cyan/60 my-2",
          "sm:w-[1px] sm:h-24 sm:my-auto sm:mx-1",
          "md:invisible",
        ])}
      />
      <div
        className={clsx(
          "flex flex-1 flex-wrap py-1 text-primary items-center font-bold",
          "sm:justify-center"
        )}
      >
        <Tag content={role} />
        <Tag content={level} />

        {languages.map((lang) => (
          <Tag content={lang} />
        ))}
        {tools.map((tool) => (
          <Tag content={tool} />
        ))}
      </div>
    </div>
  )
}

export default JobCard
