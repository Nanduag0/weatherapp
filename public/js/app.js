
console.log('Loaded');
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const  messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent='From Javascript'
const messageThree=document.querySelector('#message-3')
const messagefour=document.querySelector('#message-4')

weatherform.addEventListener('submit',(e)=>
{
    //to avoid the refresh()
    e.preventDefault()
    const location =search.value;

    messageOne.textContent='Loading ...'
    messageTwo.textContent=''
    messageThree.textContent=''
    messagefour.textContent=''
    fetch('/weather?address='+location).then((response)=>
{
response.json().then((data)=>
{
    if(data.error)
    {
      messageOne.textContent=data.error;
    }
    else
    {
        messageOne.textContent=data.location;
        messageTwo.textContent=data.latitude;
        messageThree.textContent=data.longitude;
       // messagefour.textContent=data.forecast;
      
  /*forecast({latutude,longitude},(error,forecastdata)=>
  {
      if(error)
      {
          messagefour.textContent='Errorloading'
      }
    messagefour.textContent=forecastdata;
  }) */
        //console.log(data.location)
        //console.log(data.forecast)
    }
})
})
    console.log(location)
})
