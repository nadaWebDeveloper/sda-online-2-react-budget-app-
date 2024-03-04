
function SavingTarget() {
  return (
    <>
    <div>
        <form action="">
            <div>
                <label htmlFor="target">Target</label>
                <input type="number" name="target" id="target" />
                <button type="reset">Reset</button>
            </div>
            <div>
                <p>Current Saving: {5000}</p>
                <p>Target {2000}</p>
                <label htmlFor="progress">Progress: {60}% : </label>
                <progress value={60}  max={100} id="progress" />        
             </div>
        </form>
    </div>
        
    </>
  )
}

export default SavingTarget