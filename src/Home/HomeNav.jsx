import "./HomeNav.css";
function HomeNav() {
  return (
    <div className='tracker-section'>
      <div className='tracker-text'>
        <p>Den här veckan</p>
      </div>

      <div className='tracker-container'>
        <div>
          <h2>300</h2>
          <p>Intjänade poäng</p>
        </div>
        <div>
          <h2>10</h2>
          <p>klara uppgifter denna vecka</p>
        </div>
        <div>
          <h2>3</h2>
          <p>pågående mål</p>
        </div>
        <div>
          <h2>2</h2>
          <p>pågående uppgifter</p>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
