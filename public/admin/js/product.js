// chang-status
const buttonChangeStatus=document.querySelectorAll("[button-change-status]")
// console.log(buttonChangeStatus);
if(buttonChangeStatus)
{
    const formChangeStatus=document.querySelector("#form-change-status");
    const path=formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(item=>{
        item.addEventListener("click",()=>{
            const statusCurrent= item.getAttribute("data-status");
            const id= item.getAttribute("data-id");
            const statusChange=(statusCurrent=="active")?"inactive":"active";
            const action=path+`/${statusChange}/${id}?_method=PATCH`
        formChangeStatus.action=action;
        formChangeStatus.submit();
        })
        
    })
}

// chang-multi-status
const checkboxMulti=document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const checkAll=checkboxMulti.querySelector("input[name='checkall']");
    const inputsId=checkboxMulti.querySelectorAll("input[name='id']");
    checkAll.addEventListener("click",()=>{
       if(checkAll.checked)
       {
        inputsId.forEach(item=>{
            item.checked=true;
        })
       }
       else{
        inputsId.forEach(item=>{
            item.checked=false;
        })
       }
    })
    inputsId.forEach(item=>{
        item.addEventListener("click",()=>{
            const countChecked=checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            checkAll.checked=(countChecked==inputsId.length)? true:false;
        })
    })
}

const formChangeMulti=document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
    e.preventDefault();
    const checkboxMulti=document.querySelector("[checkbox-multi]");
    const inputsChecked=checkboxMulti.querySelectorAll("input[name='id']:checked");
    
    if(inputsChecked.length>0){
        let ids=[];
    inputsChecked.forEach(item=>{
        const id=item.value;
        if(e.target.elements.type.value=="change-multi-position")
            {
                const position=item.closest("tr").querySelector("[name='position']").value
                ids.push(`${id}-${position}`);
            }
            else{
                ids.push(id);
            }
    })
    const inputIds=formChangeMulti.querySelector("input[name='ids']");
    inputIds.value=ids.join(", ");
    formChangeMulti.submit();
    }
    }) 
}

//delete Item
const listButtonDelete=document.querySelectorAll("[delete-button]");
const formDelete=document.querySelector("#form-delete")
if(formDelete){
    listButtonDelete.forEach(item=>{
        item.addEventListener("click",()=>{
            const id =item.getAttribute("data-id");
            const path=formDelete.getAttribute("data-path");
            const action=path+`/${id}?_method=DELETE`
            formDelete.action=action;
            formDelete.submit();
        })
    })
}
// preview image
const uploadInputImage= document.querySelector("[upload-image-input]");
const uploadImagePreview= document.querySelector("[upload-image-preview]")
uploadInputImage.addEventListener("change",(e)=>{
    const file=e.target.files[0];
    if(file){
        uploadImagePreview.src = URL.createObjectURL(file)
    }
})




