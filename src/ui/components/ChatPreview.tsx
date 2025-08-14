interface IChatPreview{
    name: String,
    lastMessage: String
}

export default function ChatPreview({name, lastMessage}: IChatPreview){
    return(
        <div className="flex gap-2 items-center">
            <div className="p-2">
                {/* include images as well */}
                <img src="/assets/profile.jpeg" className="rounded-full w-12 h-12" />
            </div>
            <div className="flex flex-col">
                <p>
                    {name}
                </p>
                <span className="text-black/60 text-sm">
                    {lastMessage}
                </span>
            </div>
        </div>
    )
}