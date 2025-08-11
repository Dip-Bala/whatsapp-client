export default function ChatPreview(){
    return(
        <div className="flex gap-2 items-center">
            <div className="p-2">
                <img src="/assets/profile.jpeg" className="rounded-full w-12 h-12" />
            </div>
            <div className="flex flex-col">
                <p>
                    Diya Bala
                </p>
                <span className="text-black/60 text-sm">
                    hi there, long time no see
                </span>
            </div>
        </div>
    )
}