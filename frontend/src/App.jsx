import RealtimeCamera from './components/RealtimeCamera'

export default function App() {
  return (
    <div style={{
      minHeight:'100vh',
      background:'#000',
      color:'#fff',
      padding:'40px',
      fontFamily:'Arial'
    }}>
      <h1 style={{
        fontSize:'56px',
        color:'#22d3ee',
        fontWeight:'bold'
      }}>
        SignBridge AI
      </h1>

      <p>AI 手语实时翻译系统</p>

      <RealtimeCamera />
    </div>
  )
}
