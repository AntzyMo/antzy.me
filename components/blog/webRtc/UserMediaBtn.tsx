'use client'
import { useState } from 'react'

import Button from '@/components/ui/Button'

export function UserMediaBtn() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)

  const setupUserMedia = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    })
    setMediaStream(mediaStream)
  }

  if (mediaStream) {
    return (
      <video
        autoPlay
        className="w-full"
        ref={video => {
          console.log('video', video)
          if (video) {
            video.srcObject = mediaStream
          }
        }}
      />
    )
  }

  return (
    <Button className='py-2.4' onClick={setupUserMedia}>
      点击获取摄像头
    </Button>

  )
}
