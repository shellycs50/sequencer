

function TimeQuaver({shouldLight}: {shouldLight: boolean}) {
    return (
        <a className={`h-16 w-16 border-2 border-black rounded-2xl cursor-pointer ${shouldLight && "bg-yellow-100"}`}></a>
    )
}
export default TimeQuaver