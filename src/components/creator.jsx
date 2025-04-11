import { Link } from "react-router-dom"

export const Creator = () => {
  return (
    <>
      <section className="flex flex-col items-center mt-20">
        <div className="my-4">My Account</div>
        <div className="flex flex-col items-center justify-center w-auto md:w-2/4 h-auto md:h-3/4 rounded-lg border border-black p-8">
          <div className="flex flex-col justify-center items-center">
            <span className="font-medium my-3 md:my-5">Created by:</span>
            <img src="https://avatars.githubusercontent.com/u/92773954?v=4" alt="Aryan Mane" className="h-40 w-40 md:h-60 md:w-60 border rounded-full" />
            <span className="font-bold my-1 md:my-2">Aryan Mane</span>
            <Link to={"https://github.com/aryanxvz"} className="font-light underline text-sm md:text-base">
              @aryanxvz
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}