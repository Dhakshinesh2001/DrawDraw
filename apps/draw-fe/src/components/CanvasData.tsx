import Canvas from './Canvas'
import{ useEffect } from 'react'
import ws from 'ws'

const CanvasData = (canvas: HTMLCanvasElement, roomId: string) => {

    useEffect(() => {
        console.log("use effect");

    },[]);

  return (
    <Canvas />
  )
}

export default CanvasData