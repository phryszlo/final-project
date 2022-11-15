import emma from '../images/emma.jpg';

function NASA() {
  return (
    <div className="flex flex-col items-center">
      {`This was going to be a random NASA image.
      Instead, here's a puppy.`}
      <br/><br/>
      <img src={emma} alt="emma" width="330" />
    </div>
  )
}

export default NASA