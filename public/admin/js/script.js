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

// pagination
const buttonPagination= document.querySelectorAll("[button-pagination]");
if(buttonPagination)
{
    buttonPagination.forEach(item=>{
        let url=new URL(window.location.href)
        item.addEventListener("click",()=>{
            const page= item.getAttribute("button-pagination");
            if(page)
            {
                url.searchParams.set("page",page);
            }
        window.location.href=url.href;
        })
    })
}

//show-alert
const showAlert=document.querySelector("[show-alert]");
if(showAlert){
    closeAlert=showAlert.querySelector("[close-alert]");
    const time=parseInt(showAlert.getAttribute("data-time"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden")
    })
}


// sắp xếp
const sort=document.querySelector("[sort]");
if(sort){
    let url= new URL(window.location.href);
    const sortSelect=document.querySelector("[sort-select]");
    sortSelect.addEventListener("change",(e)=>{
        const [sortKey,sortValue]= e.target.value.split("-");

        if(sortKey && sortValue){
            url.searchParams.set("sortKey",sortKey);
            url.searchParams.set("sortValue",sortValue);
        }
        else{
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
        }
        window.location.href=url.href;
    })
    let stringSort;
    const sortKey=url.searchParams.get("sortKey");
    const sortValue=url.searchParams.get("sortValue");
    stringSort=`${sortKey}-${sortValue}`;
    const selectOption=sortSelect.querySelector(`option[value='${stringSort}']`);
    selectOption.selected=true;
}




