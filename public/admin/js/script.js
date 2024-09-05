// filter
const listButton= document.querySelectorAll("[button-status]")
if(listButton.length>0)
{
    let url=new URL(window.location.href)
    listButton.forEach((item)=>{
        item.addEventListener("click",()=>{
            const status= item.getAttribute("button-status");
            console.log(status);
            if(status.length>0)
            {
                url.searchParams.set("status",status);
            }
            else
            {
                url.searchParams.delete("status");
            }
            window.location.href=url.href;
        })

    })

}

// search
const searchInput= document.querySelector("#form-search")
if(searchInput)
{
    let url=new URL(window.location.href)
    searchInput.addEventListener("submit",(event)=>{
        event.preventDefault();
        const keyword=event.target.elements.keyword.value;
        console.log(keyword);
        if(keyword)
        {
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href=url.href;
})
}


