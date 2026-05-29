import { useEffect, useRef, useState } from 'react'

export default function RealtimeCamera() {
  const videoRef = useRef(null)
  const [translation, setTranslation] = useState('等待识别...')
  const [confidence, setConfidence] = useState('0%')

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream
      })

    const timer = setInterval(async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/predict')
        const data = await res.json()

        setTranslation(data.translation)
        setConfidence(data.confidence)
      } catch (e) {
        console.log(e)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      marginTop:'30px',
      border:'1px solid #22d3ee',
      borderRadius:'20px',
      overflow:'hidden'
    }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width:'100%',
          maxWidth:'900px'
        }}
      />

      <div style={{ padding:'20px', background:'#111' }}>
        <h2 style={{ color:'#22d3ee' }}>实时翻译结果</h2>

        <div style={{
          fontSize:'32px',
          fontWeight:'bold',
          marginTop:'10px'
        }}>
          {translation}
        </div>

        <div style={{ marginTop:'10px', color:'#999' }}>
          识别置信度：{confidence}
        </div>
      </div>
    </div>
  )
}
