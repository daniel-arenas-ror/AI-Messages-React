import { IoClose } from "react-icons/io5";
import RoundedBtn from "../Common/RoundedBtn"

function Header() {
  return (
   <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
    <div className="flex items-center">
      <img
        src="https://media.licdn.com/dms/image/v2/C4E03AQEpI5x9Wu5RsQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565011573767?e=1737590400&v=beta&t=ioXJyMRhAZ43hHdbofHZORradvBxJHHpoTjAzwTpMZc"
        alt="profile_picture"
        className="rounded-full w-[45px] h-[45px] mr-5"
      />

      <div
        className="flex flex-col"
      >
        <h1
          className="text-white font-medium"
        >AI Name</h1>

        <p
          className="text-[#8796a1] text-xs"
        >
          Online
        </p>
      </div>
    </div>
    <div
        className="w-[85px]"
      >
        <RoundedBtn icon={<IoClose />} />
      </div>
   </div> 
  )
}

export default Header;
