import './Home.css';
import gif from "/src/gif1.gif"
function Home() {

    
  return (

    <>
       <div className='black-background'></div>
    <div>

    <div className='wrapper'>
      <div className='paragraph-img'>
        <p>Bonjour utilisateur</p>
      </div>

      <div className='video-container'>
       <img src={gif} />
      </div>

    </div>
    </div>

  </>

  )
  
}

export default Home
