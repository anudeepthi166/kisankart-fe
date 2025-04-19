
export default function Loading(){
    return(
        <div className="flex justify-center items-center h-screen gap-4">
            <span className="w-3 h-3 rounded-full bg-green-700 animate-[ping_1s_infinite] [animation-delay:0ms]"></span>
            <span className="w-3 h-3 rounded-full bg-green-700 animate-[ping_1s_infinite] [animation-delay:300ms]"></span>
            <span className="w-3 h-3 rounded-full bg-green-700 animate-[ping_1s_infinite] [animation-delay:600ms]"></span>
        </div>)
}