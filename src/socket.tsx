import { createContext, useContext, useMemo, ReactNode } from "react"
import { Socket } from "socket.io-client"
import io from "socket.io-client"
import { Socket_Url } from "./constants/config"

// Define the context type
const SocketContext = createContext<Socket | undefined>(undefined)

// Type for the hook return
const getSocket = (): Socket => {
    const socket = useContext(SocketContext)
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider")
    }
    return socket
}

// Type for the provider props
interface SocketProviderProps {
    children: ReactNode
}

const SocketProvider = ({ children }: SocketProviderProps) => {
    const socket = useMemo(() => {
        return io(Socket_Url, {
            withCredentials: true,
            transports: ["websocket", "polling"],
        },)
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketProvider, getSocket }