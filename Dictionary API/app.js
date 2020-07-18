
       let input=document.querySelector('#input');
       let searchBtn=document.querySelector('#search');
       let apikey='<YOUR API KEY>';
       let notFound=document.querySelector('.not__found');
       let defBox=document.querySelector('.def');
       let audioBox=document.querySelector('.audio');
       let loading=document.querySelector('.loading');

       searchBtn.addEventListener('click',function(e)
       {
           e.preventDefault();

           //clearing old data
           audioBox.innerHTML='';
           notFound.innerText='';
           defBox.innerText='';
           //alert(1);
            //Getting input data
            
           let word=input.value;
            //calling API data
           if(word==='')
           {
            alert('Word is required');   
            return;
           }
           getData(word);
       })

       async function getData(word)
       {
        loading.style.display='block';
        //Ajax call   
        const response= await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`);
        const data = await response.json();
        
        if(!data.length)
        {
            loading.style.display='none';
            notFound.innerText=' No result found';
            return;
        }
        
        //if result is a suggestion
        if (typeof data[0] === 'string')
        {
            loading.style.display='none';
            let heading=document.createElement('h3');
            heading.innerText= "Did You Mean?"
            notFound.appendChild(heading);
            data.forEach(element => {
                let suggestion=document.createElement('span');
                suggestion.classList.add('suggested');
                suggestion.innerText=element;
                notFound.appendChild(suggestion);
            })
            return;
        }

        //Result found
        loading.style.display='none';
        let definition=data[0].shortdef[0];
        defBox.innerText=definition;

        //sound
        const soundName=data[0].hwi.prs[0].sound.audio;

        if(soundName)
        {
            renderSound(soundName);
        }

        console.log(data);
       }
       
       function renderSound(soundName)
       {
           let subFolder=soundName.charAt(0);
           let soundsrc=`https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apikey}`;
           
           let aud=document.createElement('audio');
           aud.src=soundsrc;
           aud.controls=true;
           audioBox.appendChild(aud);
       }