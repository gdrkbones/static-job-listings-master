import { useState } from "preact/hooks"
import JobCard, { JobCardProps } from "./components/JobCard"
import Tag from "./components/Tag"
import data from "./data/data.json"
import useFocus from "./hooks/useFocus"

export function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tag, setTag] = useState("")
  const [sugestion, setSugestion] = useState<string[]>([])

  const [inputRef, setInputFocus] = useFocus()

  const tags = data.reduce((Tgs: string[], el) => {
    let add: string[] = []
    if (el.languages) {
      el.languages.forEach((lang) => {
        if (!Tgs.find((lg) => lg === lang)) {
          add.push(lang)
        }
      })
    }
    if (el.tools) {
      el.tools.forEach((tool) => {
        if (!Tgs.find((lg) => lg === tool)) {
          add.push(tool)
        }
      })
    }
    return [...Tgs, ...add]
  }, [])

  const [filteredJobs, setFilteredJobs] = useState<JobCardProps[]>(data)
  const filterJobs = (jobs: JobCardProps[], tags: string[]) => {
    console.log(jobs, tags)

    if (tags.length === 0) {
      return jobs
    }
    const jbs = jobs.filter(
      (job) =>
        job.tools.find((tool) => tags.find((tag) => tag === tool)) ||
        job.languages.find((lang) => tags.find((tag) => tag === lang))
    )
    console.log(jbs)
    return jbs
  }

  const handleFilterChange = (event: any) => {
    // event.preventDefault()
    // console.log(event.currentTarget.value)
    setSugestion(
      tags.filter(
        (tag) =>
          tag
            .toLocaleLowerCase()
            .match(event.currentTarget.value.toLocaleLowerCase()) &&
          !selectedTags.find((tg) => tg === tag)
      )
    )
    // console.log(sugestion)
    setTag(event.currentTarget.value)
  }

  const handleSelection = (el: string) => (event: any) => {
    setSelectedTags((tgs) => {
      setFilteredJobs(filterJobs(data, [...tgs, el]))
      return [...tgs, el]
    })

    setTag("")
    setSugestion([])
    /* @ts-ignore: Unreachable code error */
    setInputFocus()
  }

  const removeTag = (tag: string) => {
    // console.log(tag)
    setSelectedTags((tgs) => {
      const fil = selectedTags.filter((tg) => tg !== tag)
      setFilteredJobs(filterJobs(data, fil))
      return fil
    })
    //@ts-ignore: Unreachable code error
    setInputFocus()
  }

  return (
    <div class="w-full max-h-screen flex flex-col items-center bg-light-grayish-cyan">
      <div class="h-[100px] flex-shrink-0 w-full bg-header-mobile bg-primary bg-center bg-no-repeat xs:bg-header-desktop xs:bg-repeat-x"></div>
      <div
        class={`z-20 flex relative flex-wrap w-4/5 p-2 rounded-md ring-0 shadow-md -translate-y-5 bg-white ${
          tag === "" ? "" : "rounded-b-none"
        }`}
      >
        {selectedTags.map((tag) => (
          <Tag tag={tag} onClose={removeTag} className="mx-1 my-0.5" />
        ))}
        <div class="flex-1 grid px-2">
          <div class="whitespace-nowrap invisible w-auto resize-none col-start-1 col-end-2 row-start-1 row-end-2">
            {tag}{" "}
          </div>
          <input
            ref={inputRef}
            value={tag}
            onChange={handleFilterChange}
            onInput={handleFilterChange}
            class="col-start-1 col-end-2 row-start-1 row-end-2 w-auto resize-none min-w-[1rem] focus-within:outline-none "
          ></input>
        </div>
        <div className="absolute left-0 w-full bottom-0 translate-y-full">
          {tag.length === 0 ? (
            <></>
          ) : sugestion.length === 0 ? (
            <div class="block px-3 py-1 bg-primary">Match not found</div>
          ) : (
            sugestion.map((el) => (
              <a
                href="#"
                onClick={handleSelection(el)}
                class="block px-3 py-1 bg-primary border-t-2 last:rounded-b-md hover:text-white"
                key={el}
              >
                {el}
              </a>
            ))
          )}
        </div>
      </div>
      <div className="z-10 w-full overflow-scroll pt-8 flex flex-col items-center">
        {filteredJobs.map((el) => (
          <JobCard {...el} />
        ))}
      </div>
    </div>
  )
}
