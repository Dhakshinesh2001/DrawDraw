import { WS_URL } from "../app/config";
import { useEffect, useState } from "react";

export function useSocket() {
    const [socket, setSocket] = useState<WebSocket>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODE5NDEzM30.2g4HDnAkvyTcSOteFT3cCKl1ifFOme2BkDjKd-2zvtU`);
      
      ws.onopen = () => {
        setLoading(false);
        setSocket(ws);
      };
    
      
    }, []);
    
    return {
        socket,
        loading
    }
}