const url=
     'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDom=document.querySelector('.form')
const inputDom=document.querySelector('.form-input')
const resultsDom=document.querySelector('.results')

formDom.addEventListener('submit',(e)=>{
  e.preventDefault()
  const value=inputDom.value
  if(!value){
    resultsDom.innerHTML=
    '<div class="error">please enter valid search term</div>'
    return
  }
  fetchPages(value)
})

const fetchPages=async(searchValue)=>{
  resultsDom.innerHTML='<div class="loading"></div>'
  try{
    const response=await fetch(`${url}${searchValue}`)
    const data=await response.json()
    const results=data.query.search
    if(results.length < 1){
      resultsDom.innerHTML=
      '<div class="error">no matching results.please try again</div>'
      return
    }
    renderResults(results)
  }catch(error){

  }
}

const renderResults=(list)=>{
  const cardsList=list
  .map((item)=>{
    const{title,snippet,pageid}=item
    return`<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
           <h4>${title}</h4>
           </p>
           ${snippet}
           </p>
           </a>`
  })
  .join('')
  resultsDom.innerHTML=`<div class="articles">
          ${cardsList}
          </div>`
}