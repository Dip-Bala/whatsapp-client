interface IChatPreview {
    name: string;
    lastMessage: string;
    timestamp?: string;
    unreadCount?: number;
    profilePicUrl?: string;
  }
  
  export default function ChatPreview({
    name,
    lastMessage,
    timestamp,
    unreadCount,
    profilePicUrl,
  }: IChatPreview) {
    return (
      <div className="flex gap-2 items-center p-2">
        <img
          src={profilePicUrl || "/assets/profile.jpeg"}
          alt={name}
          className="rounded-full w-12 h-12 object-cover"
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="font-medium truncate">{name}</p>
            {timestamp && (
              <span className="text-xs text-gray-500">
                {new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black/60 text-sm truncate">{lastMessage}</span>
            {unreadCount && unreadCount > 0 && (
              <span className="bg-green-500 w-2 h-2 rounded-full"></span>
            )}
          </div>
        </div>
      </div>
    );
  }
  