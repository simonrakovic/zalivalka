
export const fetchAllSensors = async ()=>{
  try{
    let response = await fetch('/sensors')
    return response.json()
  }catch(err){
    console.log(err)
    return null

  }
}

export const fetchWeeklySensorData = async (sensorId)=>{
  try{
    let response = await fetch(`/sensors/${sensorId}/data/weekly`)
    return response.json()
  }catch(err){
    console.log(err)
    return null

  }
}
