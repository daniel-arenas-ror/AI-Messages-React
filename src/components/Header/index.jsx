function Header() {
  return (
   <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
    <div className="flex items-center">
      <img
        src="https://media.licdn.com/dms/image/v2/C4E03AQEpI5x9Wu5RsQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1565011573767?e=1737590400&v=beta&t=ioXJyMRhAZ43hHdbofHZORradvBxJHHpoTjAzwTpMZc"
        alt="profile_picture"
        className="rounded-full w-[45px] h-[45px] mr-5"
      />

      <p
        className="text-3xl font-bold underline"
      >HI!!!</p>
    </div>
   </div> 
  )
}

export default Header;
